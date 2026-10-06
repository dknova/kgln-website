(function () {
  "use strict";

  console.log("KGLN Kay chatbot loading...");

  // =====================================================
  // KAY SYSTEM PROMPT
  // =====================================================

  const SYS = `
You are Kay, the friendly AI assistant for KGLN.

KGLN is a web design and digital transformation agency.

Personality:
- Friendly
- Professional
- Warm
- Concise
- Helpful
- Slightly witty
- Never pushy

Keep responses SHORT.
For simple questions, answer in 1-3 sentences.
Maximum about 80 words.
Do not repeat the user's question.
Do not use markdown.

KGLN facts:

Experience:
15+ years of experience.

Reviews:
190+ five-star reviews.

KGLN pillars:
1. Strategy + Customer Experience
2. Data + Intelligence
3. Digital Marketing + Transformation
4. E-commerce + Accelerators
5. Innovation + Product Engineering
6. Platforms + Technology

Services:
- Custom web design
- Mobile-friendly development
- SEO-minded website builds
- Easy-to-update websites
- Search marketing
- Web hosting
- Domain registration
- Generative AI solutions

Case results:
- 800% more enquiries for a home-improvement supplier
- 150% faster load speed and 30 first-page Google rankings for a marketing agency

Never invent:
- Prices
- Timelines
- Staff names
- Phone numbers
- Email addresses
- Guarantees

If someone wants a quote or wants to start a project:
Ask for:
1. Name
2. Email
3. Short project description

Then explain that they can submit the enquiry form below.

If a question is unrelated to KGLN, web design, digital transformation or AI, politely guide the conversation back to KGLN.
`;

  // =====================================================
  // ELEMENTS
  // =====================================================

  const cb = document.getElementById("cb");
  const cw = document.getElementById("cw");
  const cm = document.getElementById("cm");
  const ci = document.getElementById("ci");
  const cs = document.getElementById("cs");
  const cq = document.getElementById("cq");
  const nd = document.getElementById("nudge");

  const cbtn = document.getElementById("cbtn");
  const cx = document.getElementById("cx");
  const crs = document.getElementById("crs");

  console.log("Kay elements:", {
    cb: !!cb,
    cw: !!cw,
    cm: !!cm,
    ci: !!ci,
    cs: !!cs,
    cq: !!cq,
    cbtn: !!cbtn,
    cx: !!cx,
    crs: !!crs
  });

  if (
    !cw ||
    !cm ||
    !ci ||
    !cs ||
    !cbtn
  ) {
    console.error(
      "KAY ERROR: Required chatbot elements are missing."
    );
    return;
  }

  // =====================================================
  // STATE
  // =====================================================

  let history = [];
  let busy = false;

  // =====================================================
  // ADD MESSAGE
  // =====================================================

  function addMessage(text, type) {

    const div =
      document.createElement("div");

    div.className =
      "m " + type;

    div.textContent =
      text;

    cm.appendChild(div);

    cm.scrollTop =
      cm.scrollHeight;

    return div;
  }

  // =====================================================
  // RESET
  // =====================================================

  function resetChat() {

    history = [];

    cm.innerHTML = "";

    addMessage(
      "Hi, I'm Kay, KGLN's AI assistant! I can explain our services, share results, or help you start a project. What would you like to know?",
      "b"
    );

    if (cq) {
      cq.style.display = "flex";
    }
  }

  // =====================================================
  // OPEN / CLOSE
  // =====================================================

  function openChat() {

    cw.classList.add("open");

    if (nd) {
      nd.style.display = "none";
    }

    setTimeout(() => {
      ci.focus();
    }, 100);

    console.log("KAY: chat opened");
  }

  function closeChat() {

    cw.classList.remove("open");

    console.log("KAY: chat closed");
  }

  // =====================================================
  // INITIALIZE
  // =====================================================

  if (cb) {
    cb.classList.add("on");
  }

  resetChat();

  // =====================================================
  // FLOATING BUTTON
  // =====================================================

  cbtn.addEventListener(
    "click",
    function (event) {

      event.preventDefault();
      event.stopPropagation();

      if (
        cw.classList.contains("open")
      ) {
        closeChat();
      } else {
        openChat();
      }
    }
  );

  // =====================================================
  // CLOSE
  // =====================================================

  if (cx) {

    cx.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        closeChat();
      }
    );
  }

  // =====================================================
  // RESET BUTTON
  // =====================================================

  if (crs) {

    crs.addEventListener(
      "click",
      function () {

        resetChat();
      }
    );
  }

  // =====================================================
  // NUDGE
  // =====================================================

  if (nd) {

    nd.addEventListener(
      "click",
      function () {

        openChat();
      }
    );

    setTimeout(
      function () {

        if (
          !cw.classList.contains("open")
        ) {
          nd.style.display =
            "block";
        }

      },
      5000
    );
  }

  // =====================================================
  // QUICK QUESTIONS
  // =====================================================

  const quickQuestions = [
    "What services do you offer?",
    "Show me your results",
    "Tell me about Gen AI",
    "I'd like a quote"
  ];

  if (cq) {

    quickQuestions.forEach(
      function (question) {

        const button =
          document.createElement(
            "button"
          );

        button.textContent =
          question;

        button.addEventListener(
          "click",
          function () {

            sendMessage(
              question
            );
          }
        );

        cq.appendChild(button);
      }
    );
  }

  // =====================================================
  // GEMINI API
  // =====================================================

  async function callAI(messages) {

    console.log(
      "Kay → /api/chat"
    );

    const response =
      await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({
              system: SYS,
              messages: messages
            })
        }
      );

    console.log(
      "Kay ← HTTP",
      response.status
    );

    let data;

    try {

      data =
        await response.json();

    } catch (error) {

      throw new Error(
        "Server returned an invalid response."
      );
    }

    console.log(
      "Kay ← server:",
      data
    );

    if (!response.ok) {

      throw new Error(
        data?.error ||
        "AI server error"
      );
    }

    // -------------------------------------------------
    // Our Gemini server returns:
    //
    // {
    //   content: [
    //     {
    //       type: "text",
    //       text: "..."
    //     }
    //   ]
    // }
    // -------------------------------------------------

    if (
      Array.isArray(
        data.content
      )
    ) {

      const text =
        data.content
          .filter(
            item =>
              item.type === "text"
          )
          .map(
            item =>
              item.text || ""
          )
          .join("")
          .trim();

      if (text) {
        return text;
      }
    }

    // -------------------------------------------------
    // Gemini direct response fallback
    // -------------------------------------------------

    const directText =
      data
        ?.candidates?.[0]
        ?.content
        ?.parts
        ?.map(
          part =>
            part.text || ""
        )
        .join("")
        .trim();

    if (directText) {
      return directText;
    }

    throw new Error(
      "AI returned an empty response."
    );
  }

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  async function sendMessage(text) {

    text =
      (
        text ||
        ci.value ||
        ""
      ).trim();

    if (
      !text ||
      busy
    ) {
      return;
    }

    // Clear input

    ci.value = "";

    // Hide quick questions

    if (cq) {
      cq.style.display =
        "none";
    }

    busy = true;

    cs.disabled = true;

    // User message

    addMessage(
      text,
      "u"
    );

    history.push({
      role: "user",
      content: text
    });

    // Keep last 6 messages
    // for faster requests

    const messages =
      history.slice(-6);

    // Thinking bubble

    const bubble =
      addMessage(
        "",
        "b"
      );

    bubble.innerHTML =
      '<span class="dots"><i></i><i></i><i></i></span>';

    try {

      const answer =
        await callAI(
          messages
        );

      bubble.textContent =
        answer;

      history.push({
        role: "assistant",
        content: answer
      });

    } catch (error) {

      console.error(
        "KAY ERROR:",
        error
      );

      bubble.textContent =
        "I'm having trouble connecting right now. Please try again in a moment.";

    } finally {

      busy = false;

      cs.disabled = false;

      ci.focus();

      cm.scrollTop =
        cm.scrollHeight;
    }
  }

  // =====================================================
  // SEND BUTTON
  // =====================================================

  cs.addEventListener(
    "click",
    function () {

      sendMessage();
    }
  );

  // =====================================================
  // ENTER KEY
  // =====================================================

  ci.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendMessage();
      }
    }
  );

  console.log(
    "KGLN Kay chatbot initialized successfully."
  );

})();