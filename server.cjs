// KGLN Website - Local server + Gemini AI chatbot
// Requires Node 18+
// Run: node server.cjs

const http = require('http');
const fs = require('fs');
const path = require('path');

// --------------------------------------------------
// Load .env
// --------------------------------------------------

try {
  fs.readFileSync(path.join(__dirname, '.env'), 'utf8')
    .split(/\r?\n/)
    .forEach(line => {
      const match = line.match(
        /^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/
      );

      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2]
          .replace(/^["']|["']$/g, '');
      }
    });
} catch (error) {
  // .env is optional
}

// --------------------------------------------------
// Configuration
// --------------------------------------------------

const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY;

const PRIMARY_MODEL =
  process.env.GEMINI_MODEL ||
  'gemini-3.8-flash';

const FALLBACK_MODELS = [
  'gemini-3.7-flash',
  'gemini-3.5-flash-lite'
];

const ALL_MODELS = [
  PRIMARY_MODEL,
  ...FALLBACK_MODELS.filter(
    model => model !== PRIMARY_MODEL
  )
];

// --------------------------------------------------
// Static file types
// --------------------------------------------------

const TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// --------------------------------------------------
// JSON helper
// --------------------------------------------------

function json(res, status, data) {
  res.writeHead(status, {
    'Content-Type':
      'application/json; charset=utf-8'
  });

  res.end(JSON.stringify(data));
}

// --------------------------------------------------
// Convert chatbot messages to Gemini format
// --------------------------------------------------

function convertMessages(messages = []) {

  return messages
    .filter(
      message =>
        message &&
        message.role
    )
    .map(message => {

      const role =
        message.role === 'assistant'
          ? 'model'
          : 'user';

      let text = '';

      if (
        typeof message.content === 'string'
      ) {

        text = message.content;

      } else if (
        Array.isArray(message.content)
      ) {

        text = message.content
          .map(part => {

            if (
              typeof part === 'string'
            ) {
              return part;
            }

            if (
              part.type === 'text'
            ) {
              return part.text || '';
            }

            return '';

          })
          .join('\n');
      }

      return {
        role,
        parts: [
          {
            text: text || ''
          }
        ]
      };
    });
}

// --------------------------------------------------
// Call one Gemini model
// --------------------------------------------------

async function callGemini(
  model,
  system,
  messages
) {

  const contents =
    convertMessages(messages);

  const requestBody = {
    contents,

    generationConfig: {
      maxOutputTokens: 250,
      temperature: 0.3
    }
  };

  // System instruction

  if (system) {

    requestBody.systemInstruction = {
      parts: [
        {
          text: system
        }
      ]
    };
  }

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
      GEMINI_API_KEY
    )}`;

  console.log(
    `Kay → ${model}`
  );

  const response = await fetch(
    url,
    {
      method: 'POST',

      headers: {
        'Content-Type':
          'application/json'
      },

      body:
        JSON.stringify(requestBody)
    }
  );

  const data =
    await response.json();

  // ------------------------------------------------
  // Gemini error
  // ------------------------------------------------

  if (!response.ok) {

    console.error(
      `Gemini ${model} error:`,
      JSON.stringify(
        data,
        null,
        2
      )
    );

    const error =
      new Error(
        data?.error?.message ||
        `Gemini request failed with HTTP ${response.status}`
      );

    error.status =
      response.status;

    error.code =
      data?.error?.code;

    throw error;
  }

  // ------------------------------------------------
  // Extract generated text
  // ------------------------------------------------

  const text =
    data
      ?.candidates?.[0]
      ?.content
      ?.parts
      ?.map(part =>
        part.text || ''
      )
      .join('')
      || '';

  if (!text) {

    throw new Error(
      'Gemini returned an empty response.'
    );
  }

  console.log(
    `Kay ← ${model} responded`
  );

  // ------------------------------------------------
  // Return format expected by chatbot.js
  // ------------------------------------------------

  return {
    id:
      data.responseId ||
      'gemini-response',

    type:
      'message',

    role:
      'assistant',

    model,

    content: [
      {
        type:
          'text',

        text
      }
    ],

    stop_reason:
      'end_turn'
  };
}

// --------------------------------------------------
// Gemini with automatic fallback
// --------------------------------------------------

async function askGemini(
  system,
  messages
) {

  let lastError = null;

  for (
    let index = 0;
    index < ALL_MODELS.length;
    index++
  ) {

    const model =
      ALL_MODELS[index];

    try {

      console.log('');
      console.log(
        `Trying model ${index + 1}/${ALL_MODELS.length}: ${model}`
      );

      const result =
        await callGemini(
          model,
          system,
          messages
        );

      return result;

    } catch (error) {

      lastError =
        error;

      console.error(
        `${model} failed:`,
        error.message
      );

      // ------------------------------------------------
      // Only use fallback for temporary problems
      // ------------------------------------------------

      const temporaryError =
        error.status === 429 ||
        error.status === 500 ||
        error.status === 502 ||
        error.status === 503 ||
        error.status === 504;

      if (!temporaryError) {

        console.error(
          'Non-temporary error. Stopping fallback.'
        );

        break;
      }

      if (
        index <
        ALL_MODELS.length - 1
      ) {

        console.log(
          `Switching to fallback model: ${
            ALL_MODELS[index + 1]
          }`
        );
      }
    }
  }

  throw new Error(
    lastError?.message ||
    'All Gemini models are currently unavailable.'
  );
}

// --------------------------------------------------
// HTTP SERVER
// --------------------------------------------------

http.createServer(
  (req, res) => {

    // ------------------------------------------------
    // CHAT API
    // ------------------------------------------------

    if (
      req.method === 'POST' &&
      req.url === '/api/chat'
    ) {

      if (!GEMINI_API_KEY) {

        return json(
          res,
          500,
          {
            error:
              'GEMINI_API_KEY is not configured.'
          }
        );
      }

      let body = '';

      req.on(
        'data',
        chunk => {

          body += chunk;

          if (
            body.length > 1e6
          ) {

            req.destroy();
          }
        }
      );

      req.on(
        'end',
        async () => {

          try {

            const parsed =
              JSON.parse(body);

            const {
              system,
              messages
            } = parsed;

            const result =
              await askGemini(
                system,
                messages
              );

            json(
              res,
              200,
              result
            );

          } catch (error) {

            console.error(
              'Chat error:',
              error
            );

            json(
              res,
              503,
              {
                error:
                  error.message ||
                  'AI service temporarily unavailable.'
              }
            );
          }
        }
      );

      return;
    }

    // ------------------------------------------------
    // STATIC WEBSITE
    // ------------------------------------------------

    let requestedPath =
      decodeURIComponent(
        req.url.split('?')[0]
      );

    if (
      requestedPath === '/'
    ) {

      requestedPath =
        '/index.html';
    }

    const filePath =
      path.join(
        __dirname,
        path.normalize(
          requestedPath
        )
      );

    // Security check

    if (
      !filePath.startsWith(
        __dirname
      )
    ) {

      res.writeHead(403);

      return res.end(
        'Forbidden'
      );
    }

    fs.readFile(
      filePath,
      (error, buffer) => {

        if (error) {

          res.writeHead(404);

          return res.end(
            'Not found'
          );
        }

        const extension =
          path.extname(
            filePath
          );

        res.writeHead(
          200,
          {
            'Content-Type':
              TYPES[extension] ||
              'application/octet-stream'
          }
        );

        res.end(buffer);
      }
    );
  }
).listen(
  PORT,
  () => {

    console.log('');
    console.log(
      '======================================'
    );

    console.log(
      ' KGLN WEBSITE'
    );

    console.log(
      '======================================'
    );

    console.log(
      ` Website: http://localhost:${PORT}`
    );

    console.log(
      ` Primary AI: ${PRIMARY_MODEL}`
    );

    console.log(
      ` Fallback AI: ${FALLBACK_MODELS.join(', ')}`
    );

    if (GEMINI_API_KEY) {

      console.log(
        ' Gemini API: CONNECTED'
      );

    } else {

      console.log(
        ' Gemini API: NOT CONFIGURED'
      );

      console.log(
        ' Add GEMINI_API_KEY to .env'
      );
    }

    console.log(
      '======================================'
    );

    console.log('');
  }
);