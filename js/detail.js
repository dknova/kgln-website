/* kgln-detail: in-depth detail panels with 3D scenes */
(function () {
  var D = {},
    T = [
      "w1|str|What We Do|Strategy + Customer Experience|We start with your customers, then build a clear plan so every page and message nudges them toward buying.|Customer research:Interviews and analytics show what people really want~Journey mapping:Every step from first visit to repeat purchase~Experience design:Simple flows that cut drop-offs~Roadmap and KPIs:Clear goals agreed upfront|Discover:Goals, audience and competitors|Map:Customer journeys and pain points|Design:Prototypes tested with real users|Measure:Track KPIs and keep improving|2x:easier journeys~40%:fewer drop-offs~4 wks:to a clear plan",
      "w2|data|What We Do|Data + Intelligence|We turn scattered numbers into live dashboards and simple insights you can act on today.|Tracking setup:Reliable analytics across site and campaigns~Live dashboards:One screen for sales, leads and traffic~Predictive insights:Spot trends before competitors~Smart reports:Plain language, not spreadsheets|Audit:Check what you track today|Connect:Bring all sources together|Visualise:Build dashboards that make sense|Act:Turn insights into decisions|1 view:of all your numbers~24/7:live reporting~3x:faster decisions",
      "w3|mkt|What We Do|Digital Marketing + Transformation|We attract the right visitors and guide them through a funnel that ends in enquiries and sales.|Search and social:Reach people already looking for you~Content that converts:Pages built to persuade~Funnel optimisation:Fix leaks between click and customer~Automation:Follow-ups that run themselves|Attract:Bring in qualified traffic|Engage:Hold attention with useful content|Convert:Make the next step obvious|Retain:Keep customers coming back|800%:more enquiries in a top case~30:page-one rankings~24/7:automated follow-up",
      "w4|eco|What We Do|E-commerce + Accelerators|We build fast, trusted online stores and add tools that lift every sale.|Store design:Clean product pages, easy checkout~Payments and shipping:Secure, flexible options~Conversion boosters:Upsells, reviews, smart search~Growth tools:Cart recovery and loyalty rewards|Plan:Catalogue, pricing and flow|Build:Store, payments, shipping|Launch:Test, then go live|Grow:Optimise with real sales data|1 click:checkout flows~150%:faster page loads~24/7:store open",
      "w5|inn|What We Do|Innovation + Product Engineering|We design and engineer digital products, from first sketch to a scalable launch.|Rapid prototypes:See and click your idea in days~Agile engineering:Working features every sprint~Quality built in:Automated tests and security~Scale ready:Architecture that grows|Ideate:Shape the idea and scope|Prototype:A clickable model for feedback|Build:Sprints with regular demos|Scale:Monitor, improve, expand|Days:to a clickable prototype~2 wks:sprint cycles~100%:code ownership",
      "w6|plt|What We Do|Platforms + Technology|We choose and connect the right systems so your website, CRM and tools work as one.|Platform selection:The right CMS for your goals~Integrations:Link CRM, payments and email~Cloud hosting:Fast, secure, always on~Maintenance:Updates, backups, monitoring|Assess:Review your current stack|Select:Pick fit-for-purpose tools|Integrate:Connect everything cleanly|Support:Monitor and keep it healthy|99.9%:target uptime~1 stack:instead of silos~24/7:monitoring",
      "s1|web|Service|Custom Web Design|Every site is designed from scratch around your brand and your visitors, never a recycled template.|Unique design:Built around your brand~User first layout:Clear navigation, strong calls to action~Fast loading:Optimised images and clean code~Brand storytelling:Visuals and words that build trust|Brief:Goals, brand, audience|Design:Layouts and visual style|Build:Responsive development|Launch:Test, then go live|100%:custom~5.0:star client rating~190+:reviews",
      "s2|web|Service|Mobile-Friendly Development|Most visits happen on phones, so every page is built to feel natural on a small screen.|Responsive layouts:Adapt to any screen~Touch friendly:Big buttons, easy menus~Fast on mobile:Light pages for weak signals~Device tested:Real phones and tablets|Plan:Mobile first design|Build:Flexible grids|Test:Real devices|Refine:Polish small details|3 sec:load target~100%:responsive~1 site:every device",
      "s3|orb|Service|Built with SEO in Mind|A search friendly structure from day one, so the right customers find you on Google.|Keyword research:Phrases customers really search~Clean structure:Titles, headings and speed done right~Local and technical SEO:Maps, schema, crawlability~Reporting:Watch rankings and traffic grow|Research:Find the right keywords|Optimise:Fix structure and speed|Publish:Useful content pages|Track:Measure and refine|30:page-one phrases in a case~21:ranked in the top 3~2 wks:to first rankings",
      "s4|plt|Service|Easy to Update|Change text, images and offers yourself, or let our team handle it for you.|Simple editor:Edit like a document, no code~Reusable blocks:Add pages in minutes~Roles and approvals:Control who publishes~Scalable:Add features as you grow|Train:A short walkthrough|Edit:Change content any time|Publish:Review and go live|Extend:Add new sections later|5 min:to publish a change~0:code needed~3 roles:editor, approver, admin",
      "s5|mkt|Service|Search Marketing|Targeted campaigns that put your business in front of people who are ready to act.|Search ads:Pay only for relevant clicks~Social campaigns:Reach niche audiences precisely~Landing pages:Matched to each ad~Clear reporting:Cost per lead, not vanity numbers|Plan:Audience and keywords|Launch:Ads and landing pages|Optimise:Cut waste, boost winners|Report:Monthly clarity|800%:enquiry uplift in a top case~2 wks:to first results~1 report:every month",
      "s6|plt|Service|Hosting and Domains|One team to register your name, host your site and keep it fast and safe.|Domain registration:Find and secure your name~Fast hosting:Quick servers with caching~Security:SSL, backups, malware scans~Real support:People, not bots|Pick:Choose the right name|Register:Secure it|Host:Launch on fast servers|Maintain:Backups and monitoring|99.9%:uptime target~Daily:backups~SSL:included",
      "genai|ai|Gen AI|Gen AI Solutions|We add practical AI to your business: chat assistants, smart search, content help and workflow automation.|AI assistants:Answer customers 24/7 in your voice~Smart search:Find products and answers instantly~Content engine:Draft, translate, personalise faster~Workflow automation:Cut repetitive work|Identify:Pick high value use cases|Pilot:A small test with real data|Integrate:Connect to your systems|Govern:Monitor accuracy and safety|24/7:assistance~10x:faster drafting~Safe:human in the loop",
      "pw|web|Portfolio|{n}|A conversion focused website that turns visitors into enquiries.|Clear offer:Your message above the fold~Trust signals:Reviews and proof~Short forms:Easy quote requests~Local SEO:Found in your area|Brief:Goals and audience|Design:Layout and look|Build:Fast and responsive|Launch:Track every lead|800%:uplift in a similar project~2 wks:to rankings~100%:mobile ready",
      "pe|eco|Portfolio|{n}|A fast, trusted online store built to sell, from product page to checkout.|Product pages:Photos, details, reviews~Easy checkout:Fewer steps, more sales~Secure payments:Trusted gateways~Cart recovery:Win back lost sales|Plan:Catalogue and flow|Build:Store and payments|Launch:Test and go live|Grow:Optimise with data|1 click:checkout~150%:faster loading~24/7:open for business",
      "pb|str|Portfolio|{n}|A fresh brand identity and a website that tells your story with confidence.|Brand identity:Logo, colour, typography~Messaging:Words that sound like you~Website:Built around the brand~Guidelines:Keep everything consistent|Discover:Values and audience|Define:Identity and tone|Design:Brand and site|Deliver:Launch kit|1 look:across every channel~Clear:consistent message~Fast:launch ready",
      "c1|mkt|Case Study|Digital Marketing Agency|A smarter, faster website that moved 30 competitive search phrases onto page one of Google.|Search growth:30 phrases on page one, 21 in the top 3~Speed:Load time improved over 150 percent~Engagement:Smarter design kept visitors reading~Structure:Clean pages search engines understand|Audit:Find speed and SEO gaps|Rebuild:Faster, cleaner design|Optimise:Target key phrases|Monitor:Track rankings monthly|30:page-one phrases~21:top three spots~150%:faster loading",
      "c2|eco|Case Study|Home Improvement Supplier|A new website that ranked for competitive keywords within two weeks and multiplied enquiries.|Fast rankings:Competitive keywords in two weeks~800 percent more enquiries:Through the website alone~Business growth:Rapid expansion followed~Clear journeys:Easy path to a quote|Analyse:Study the market|Design:Build for enquiries|Optimise:Target keywords|Scale:Grow with the demand|800%:more enquiries~2 wks:to rankings~1 team:to grow with",
      "st1|eco|Featured Story|Nova Retail|A one click path for a high volume, search heavy online store.|Smart search:Customers find products faster~Quick checkout:Fewer steps to pay~Fast pages:Stays quick at peak traffic~Clear categories:Easy browsing|Audit:Find the friction|Redesign:Simplify the journey|Test:Compare versions|Scale:Handle peak traffic|1 click:to products~150%:faster~24/7:open",
      "st2|data|Featured Story|Atlas Bank|A secure, modern digital face for customer banking.|Security first:Trusted, protected journeys~Clear dashboards:Balances at a glance~Accessible design:Easy for everyone~Mobile ready:Bank anywhere|Research:Understand customers|Design:Clean, simple screens|Secure:Test and protect|Launch:Roll out gradually|100%:mobile ready~Secure:by design~Simple:for all ages",
      "st3|orb|Featured Story|Lumen Foods|A delectably designed store that launched a brand new sales channel.|Appetising visuals:Food looks as good as it tastes~Easy ordering:A simple path to buy~Brand story:Shows the care behind the food~New channel:Sales beyond the shelf|Taste:Understand the brand|Style:Design the experience|Sell:Build the store|Share:Promote the launch|New:sales channel~Fast:to launch~Loved:by customers",
      "in1|inn|Insight|Best Programming Languages for Future Ready Development|A plain guide to choosing technology that stays useful for years.|Match the goal:Pick a language by the problem~Talent pool:Choose skills you can hire~Ecosystem:Libraries and community~Longevity:Think about maintenance|Define:Know the product need|Compare:Shortlist options|Prototype:Test the finalists|Decide:Choose and commit|9 min:read~4 criteria:to compare~1 choice:made with confidence",
      "in2|ai|Insight|AI for Ecommerce: Driving the Next Digital Revolution|How AI recommendations, search and support are reshaping online shopping.|Personalisation:Products matched to each shopper~Smart search:Understands what people mean~Support bots:Answer questions instantly~Forecasting:Stock and demand insights|Collect:Gather clean data|Train:Teach models your catalogue|Test:Pilot on one journey|Expand:Roll out step by step|8 min:read~4 uses:in one store~Big:impact on sales",
      "in3|orb|News|KGLN Named Best Reviewed Web Design Agency|Recognition built on 190 plus five star reviews from clients.|Client reviews:190 plus five star ratings~Reliable delivery:On time, every time~Clear communication:Real people, quick replies~Results:Measured in enquiries and rankings|Listen:Learn what clients need|Deliver:Ship with care|Support:Stay in touch|Improve:Keep raising the bar|190+:reviews~5.0:rating~15+:years",
      "careers|orb|Careers|You Will Like It Here|We create a habitat where you can grow stronger roots and larger branches.|Learning:Time and budget to grow skills~Real projects:Work that reaches customers~Friendly team:Share ideas freely~Flexibility:Balance work and life|Apply:Send your story|Chat:Meet the team|Try:A practical task|Join:Start growing|15+:years of growth~Open:to every role~Grow:with us",
      "future|str|Vision|Experiences Powered by Intelligence|Where design, data and AI meet to create websites and journeys that feel effortless.|Intelligent design:Interfaces that adapt to people~Data driven:Decisions backed by evidence~AI assisted:Faster, smarter service~Human led:Craft you can trust|Imagine:Dream the experience|Prototype:See it working|Power it:Add data and AI|Refine:Improve forever|15+:years of craft~190+:five star reviews~1 team:one vision",
      "beyond|orb|Event|KGLN Beyond Preview Event|A stage where tech, marketing and industry leaders share what is next.|Keynotes:Ideas from industry leaders~Live demos:See new tools in action~Workshops:Hands on sessions~Networking:Meet peers and partners|Register:Reserve your seat|Attend:Join the preview|Learn:Take part in demos|Connect:Keep the conversation|1 stage:many voices~Live:demos~Free:to preview (confirm details)",
    ];
  T.forEach(function (l) {
    var p = l.split("|"),
      sp = function (x) {
        return x.split("~").map(function (y) {
          var i = y.indexOf(":");
          return [y.slice(0, i), y.slice(i + 1)];
        });
      };
    D[p[0]] = {
      k: p[1],
      c: p[2],
      t: p[3],
      l: p[4],
      g: sp(p[5]),
      s: sp(p[6] + "~" + p[7] + "~" + p[8] + "~" + p[9]),
      n: sp(p[10]),
    };
  });

  var K = {
    str: {
      why: "Great digital experiences begin with understanding people. {t} gives everyone a shared plan, so design, content and technology pull in the same direction instead of guessing.",
      del: [
        "Audience and competitor report",
        "Customer journey maps",
        "Prioritised roadmap",
        "Clickable wireframes",
        "KPI and measurement plan",
      ],
      use: [
        "Launching a new brand:Clear positioning before a single page is designed",
        "Low conversions:Find exactly where visitors give up, and why",
        "Scaling up:A roadmap that keeps every team aligned",
      ],
      tech: [
        "User interviews",
        "Heatmaps",
        "Analytics",
        "Figma",
        "Journey maps",
        "A/B testing",
      ],
      ba: [
        "Pages built on opinions. Visitors leave and nobody knows why.",
        "A clear plan backed by evidence, measurable goals and steady growth.",
      ],
      faq: [
        [
          "How long does it take?",
          "Most projects run three to six weeks, depending on how many audiences and products are involved.",
        ],
        [
          "Do we need existing data?",
          "No. We can start with interviews and a fresh analytics setup, then build on real numbers as they arrive.",
        ],
        [
          "What happens after the plan?",
          "We can build it with you, hand it to your team, or stay on to measure and improve.",
        ],
      ],
      wk: ["Weeks 1 to 2", "Weeks 2 to 3", "Weeks 3 to 5", "Ongoing"],
    },
    data: {
      why: "Numbers only help when people can read them. {t} brings your scattered reports together into clear, live views, so every decision is based on facts rather than hunches.",
      del: [
        "Tracking plan and setup",
        "Connected data sources",
        "Live dashboards",
        "Automated weekly reports",
        "Team training session",
      ],
      use: [
        "Too many spreadsheets:One trusted view of sales and leads",
        "Unclear marketing return:See which channels really pay back",
        "Planning ahead:Trends and forecasts you can act on",
      ],
      tech: [
        "Google Analytics",
        "Looker Studio",
        "SQL",
        "Tag Manager",
        "Python",
        "Power BI",
      ],
      ba: [
        "Reports arrive late, numbers disagree and meetings stall.",
        "One live dashboard everyone trusts, updated automatically.",
      ],
      faq: [
        [
          "Can you use our existing tools?",
          "Yes. We connect to what you already use, such as your CRM, store and ad accounts.",
        ],
        [
          "Is our data safe?",
          "We use access controls and only collect what is needed. Privacy rules are built into the setup.",
        ],
        [
          "Do we need a data team?",
          "No. Dashboards are made for non-technical people, and we train your team to use them.",
        ],
      ],
      wk: ["Week 1", "Weeks 2 to 3", "Weeks 3 to 4", "Ongoing"],
    },
    mkt: {
      why: "Traffic alone does not pay the bills. {t} focuses on the whole journey, from the first search to the final enquiry, so the visitors you attract are the ones likely to become customers.",
      del: [
        "Audience and keyword plan",
        "Campaign setup and creative",
        "Landing pages",
        "Conversion tracking",
        "Monthly performance report",
      ],
      use: [
        "Few enquiries:Reach people who are ready to buy",
        "High ad spend:Cut wasted clicks and lower cost per lead",
        "New launch:Build awareness fast, then keep it going",
      ],
      tech: [
        "Google Ads",
        "Meta Ads",
        "SEO tools",
        "Email automation",
        "CRM",
        "Heatmaps",
      ],
      ba: [
        "Money goes into ads, visitors browse and leave.",
        "Targeted traffic, clear landing pages and enquiries you can measure.",
      ],
      faq: [
        [
          "How soon will we see results?",
          "Paid campaigns can show results within weeks. Search rankings usually build over a few months.",
        ],
        [
          "What budget do we need?",
          "It depends on your market. We help you start small, learn what works, then scale.",
        ],
        [
          "Will we see where leads come from?",
          "Yes. Every enquiry is tracked back to its source in a simple monthly report.",
        ],
      ],
      wk: ["Week 1", "Weeks 2 to 3", "Weeks 4 to 8", "Monthly"],
    },
    eco: {
      why: "Shoppers decide in seconds. {t} removes friction from browsing, paying and returning, so more visitors finish their purchase and come back again.",
      del: [
        "Store design and build",
        "Payment and shipping setup",
        "Product page templates",
        "Cart recovery emails",
        "Sales dashboard",
      ],
      use: [
        "Abandoned carts:Win back sales that were almost lost",
        "Slow store:Faster pages mean fewer lost shoppers",
        "New channel:Sell online beyond your shelves",
      ],
      tech: [
        "Shopify",
        "WooCommerce",
        "Stripe",
        "Klaviyo",
        "Analytics",
        "Fast CDN",
      ],
      ba: [
        "Slow pages, long checkout and shoppers who never return.",
        "A fast, trusted store with simple checkout and repeat buyers.",
      ],
      faq: [
        [
          "Which platform do you use?",
          "We recommend what fits your catalogue and budget, then build and migrate for you.",
        ],
        [
          "Can you move our existing products?",
          "Yes. We import products, customers and orders safely.",
        ],
        [
          "Do you handle payments and shipping?",
          "We connect secure payment providers and the shipping options your customers expect.",
        ],
      ],
      wk: ["Weeks 1 to 2", "Weeks 3 to 5", "Week 6", "Ongoing"],
    },
    inn: {
      why: "Good ideas need working software to prove them. {t} turns concepts into tested products in short cycles, so you learn early, spend wisely and launch with confidence.",
      del: [
        "Clickable prototype",
        "Working build every sprint",
        "Automated test suite",
        "Security review",
        "Documentation and handover",
      ],
      use: [
        "New product idea:Test it with real users before big spend",
        "Outdated software:Modernise without losing what works",
        "Fast growth:Systems that scale with demand",
      ],
      tech: [
        "React",
        "Node",
        "Cloud services",
        "APIs",
        "CI/CD",
        "Automated testing",
      ],
      ba: [
        "Long projects, surprises at the end and code nobody understands.",
        "Short sprints, visible progress and software you fully own.",
      ],
      faq: [
        [
          "Who owns the code?",
          "You do. Everything we build is yours, with full documentation.",
        ],
        [
          "How do we stay involved?",
          "Regular demos every sprint, so you see and steer progress.",
        ],
        [
          "Can you work with our developers?",
          "Yes. We join your team or lead the build, whichever you prefer.",
        ],
      ],
      wk: ["Week 1", "Weeks 2 to 3", "Sprints of 2 weeks", "Ongoing"],
    },
    plt: {
      why: "The right tools should work together quietly. {t} connects your website, systems and hosting into one reliable setup that is easy to manage and ready to grow.",
      del: [
        "Technology assessment",
        "Platform recommendation",
        "Integrations set up",
        "Secure hosting",
        "Monitoring and backups",
      ],
      use: [
        "Disconnected tools:Share data between your systems automatically",
        "Slow site:Faster hosting and cleaner code",
        "Growing team:Simple roles, safe publishing",
      ],
      tech: ["CMS", "CRM", "Cloud hosting", "APIs", "SSL", "Daily backups"],
      ba: [
        "Tools that do not talk, manual copying and downtime worries.",
        "Connected systems, fast pages and someone watching them for you.",
      ],
      faq: [
        [
          "Will we be locked in?",
          "No. We choose open, widely supported tools so you can always move on.",
        ],
        [
          "What if something breaks?",
          "Monitoring spots problems early, and our team fixes them quickly.",
        ],
        [
          "Can you migrate our current site?",
          "Yes. We plan the move so your rankings and content stay safe.",
        ],
      ],
      wk: ["Week 1", "Week 2", "Weeks 3 to 4", "Ongoing"],
    },
    ai: {
      why: "AI is most useful when it solves a clear problem. {t} starts with one valuable task, proves it works with your data, then expands carefully with people always in control.",
      del: [
        "Use case shortlist",
        "Working pilot",
        "Integration with your tools",
        "Accuracy and safety checks",
        "Team training",
      ],
      use: [
        "Customer questions:An assistant that answers day and night",
        "Content workload:Drafts and translations in minutes",
        "Repeated tasks:Automate routine steps",
      ],
      tech: [
        "Language models",
        "Chat assistants",
        "Search and retrieval",
        "Automation",
        "Analytics",
        "Safety checks",
      ],
      ba: [
        "Repeated questions, slow replies and staff stuck on routine work.",
        "Instant helpful answers, faster work and people free for what matters.",
      ],
      faq: [
        [
          "Is AI safe for our business?",
          "We add checks, limits and human review, and we never use your private data without permission.",
        ],
        [
          "Will it replace our team?",
          "No. It takes over repetitive work so your team can focus on people and decisions.",
        ],
        [
          "How do we start?",
          "Pick one task, run a small pilot, measure the result, then grow.",
        ],
      ],
      wk: ["Week 1", "Weeks 2 to 4", "Weeks 4 to 6", "Ongoing"],
    },
    web: {
      why: "Your website is often the first impression. {t} makes that first impression clear, fast and trustworthy, on every screen your customers use.",
      del: [
        "Custom page designs",
        "Responsive build",
        "Contact forms and tracking",
        "Speed and SEO basics",
        "Training on how to edit",
      ],
      use: [
        "Outdated look:A fresh design that builds trust",
        "Low enquiries:Clear paths to contact you",
        "Mobile visitors:Smooth experience on phones",
      ],
      tech: [
        "HTML and CSS",
        "JavaScript",
        "Responsive design",
        "CMS",
        "SEO basics",
        "Analytics",
      ],
      ba: [
        "A dated, slow site that confuses visitors.",
        "A modern, fast site that guides people to act.",
      ],
      faq: [
        [
          "Can we see designs first?",
          "Yes. You review and approve designs before development starts.",
        ],
        [
          "Can we update it ourselves?",
          "Yes. We build it so you can edit text and images, and we train you.",
        ],
        [
          "Will it work on phones?",
          "Every page is designed and tested on phones, tablets and desktops.",
        ],
      ],
      wk: ["Week 1", "Weeks 2 to 3", "Weeks 3 to 5", "Week 6"],
    },
    seo: {
      why: "Most customers start with a search. {t} makes sure your pages are easy for search engines to understand and genuinely useful to the people who click.",
      del: [
        "Keyword research",
        "Technical SEO fixes",
        "Optimised page content",
        "Local listings setup",
        "Monthly ranking report",
      ],
      use: [
        "Not on page one:Target phrases customers really use",
        "Local business:Show up on maps and nearby searches",
        "New site:Launch with SEO built in",
      ],
      tech: [
        "Keyword tools",
        "Search Console",
        "Schema markup",
        "Speed testing",
        "Content planning",
        "Link building",
      ],
      ba: [
        "Great pages that nobody can find.",
        "Pages that rank for the right phrases and bring steady visitors.",
      ],
      faq: [
        [
          "How long does SEO take?",
          "Early gains can appear in weeks. Strong rankings usually build over several months.",
        ],
        [
          "Do you guarantee rankings?",
          "No one honestly can. We guarantee clear work and transparent reporting.",
        ],
        [
          "Is it a one-time job?",
          "The foundation is one-time. Ongoing content and monitoring keep results growing.",
        ],
      ],
      wk: ["Week 1", "Weeks 2 to 3", "Weeks 4 to 8", "Monthly"],
    },
    story: {
      why: "Behind every result is a real team and a clear process. {t} shows how careful listening, thoughtful design and steady follow-up lead to outcomes people notice.",
      del: [
        "A clear brief",
        "Design and build",
        "Testing and launch",
        "Training and handover",
        "Ongoing support",
      ],
      use: [
        "Learn the approach:See how projects run from start to finish",
        "Compare results:Understand what is possible",
        "Plan yours:Use the same steps for your project",
      ],
      tech: [
        "Research",
        "Design",
        "Development",
        "Testing",
        "Analytics",
        "Support",
      ],
      ba: [
        "Unsure where to begin and what to expect.",
        "A clear plan, steady updates and a result you are proud of.",
      ],
      faq: [
        [
          "Can we speak to this client?",
          "We can arrange references where clients agree.",
        ],
        [
          "Will our project be similar?",
          "Every project is tailored, but the proven process stays the same.",
        ],
        [
          "How do we begin?",
          "Send us a short brief and we will reply with next steps.",
        ],
      ],
      wk: ["Week 1", "Weeks 2 to 3", "Weeks 3 to 5", "Ongoing"],
    },
    job: {
      why: "People do their best work when they can learn and be heard. {t} describes a workplace that backs your growth with real projects, support and flexibility.",
      del: [
        "A friendly interview",
        "A practical task",
        "Clear role and goals",
        "Onboarding buddy",
        "Learning budget",
      ],
      use: [
        "Early career:Learn fast with mentors",
        "Experienced pros:Shape projects and lead",
        "Career changers:Grow new skills with support",
      ],
      tech: [
        "Design",
        "Development",
        "Marketing",
        "Data",
        "Project management",
        "Support",
      ],
      ba: [
        "Work that feels repetitive with little room to grow.",
        "Meaningful projects, a supportive team and a path forward.",
      ],
      faq: [
        [
          "Do you hire remotely?",
          "Roles vary. Each listing says where and how you will work.",
        ],
        [
          "I do not match every requirement. Should I apply?",
          "Yes. Attitude and learning matter as much as a checklist.",
        ],
        [
          "What is the process?",
          "Apply, meet the team, try a practical task, then hear from us quickly.",
        ],
      ],
      wk: ["Day 1", "Week 1", "Week 2", "Week 3"],
    },
    event: {
      why: "Ideas travel faster when people meet. {t} brings thinkers and doers together to share what works now and what is coming next, in plain language.",
      del: [
        "Keynote talks",
        "Live demonstrations",
        "Hands-on workshops",
        "Networking time",
        "Slides and recordings after",
      ],
      use: [
        "Business owners:Spot opportunities early",
        "Marketers:See new tools in action",
        "Tech teams:Learn from industry leaders",
      ],
      tech: ["AI", "Marketing", "Web", "Data", "E-commerce", "Design"],
      ba: [
        "Trends feel confusing and hard to act on.",
        "Clear takeaways and new contacts you can use right away.",
      ],
      faq: [
        [
          "How do I register?",
          "Use the enquiry form and we will confirm your seat.",
        ],
        [
          "Is there a cost?",
          "Please confirm the details with the team when you register.",
        ],
        [
          "Will sessions be recorded?",
          "We plan to share highlights afterwards. Confirm with the team.",
        ],
      ],
      wk: ["Register", "Attend", "Learn", "Connect"],
    },
  };
  var EX = {
    s3: "seo",
    st3: "story",
    in3: "story",
    careers: "job",
    beyond: "event",
  };
  var $ = function (q, r) {
      return (r || document).querySelector(q);
    },
    dm = document.createElement("div"),
    renderer,
    scene,
    camera,
    grp,
    act = null,
    raf = 0,
    mx = 0,
    my = 0,
    cur = null;
  dm.id = "dm";
  dm.innerHTML =
    '<div class="dp" role="dialog" aria-modal="true"><button class="dx" aria-label="Close">✕</button><div class="dh"><canvas></canvas><div class="dt"><small></small><h2></h2></div></div><div class="db"></div></div>';
  document.body.appendChild(dm);
  function cssv(v, d) {
    return (
      (
        getComputedStyle(document.documentElement).getPropertyValue(v) || d
      ).trim() || d
    );
  }
  function M(c, o) {
    return new THREE.MeshStandardMaterial({
      color: c,
      metalness: 0.25,
      roughness: 0.35,
      transparent: o != null,
      opacity: o == null ? 1 : o,
    });
  }
  var B = {
    str: function (A, Bc) {
      var g = new THREE.Group(),
        k = new THREE.Mesh(
          new THREE.TorusKnotGeometry(1.1, 0.32, 150, 20),
          M(A),
        ),
        s = new THREE.Mesh(new THREE.SphereGeometry(0.4, 24, 24), M(Bc));
      g.add(k, s);
      return {
        g: g,
        t: function (t) {
          k.rotation.x = t * 0.5;
          k.rotation.y = t * 0.7;
          s.position.set(Math.cos(t * 2) * 1.9, Math.sin(t * 2) * 1.9 * 0.6, 0);
        },
      };
    },
    data: function (A, Bc) {
      var g = new THREE.Group(),
        b = [];
      for (var i = 0; i < 6; i++)
        for (var j = 0; j < 6; j++) {
          var m = new THREE.Mesh(
            new THREE.BoxGeometry(0.34, 1, 0.34),
            M((i + j) % 2 ? A : Bc),
          );
          m.position.set((i - 2.5) * 0.5, 0, (j - 2.5) * 0.5);
          g.add(m);
          b.push(m);
        }
      g.rotation.x = 0.5;
      return {
        g: g,
        t: function (t) {
          g.rotation.y = t * 0.4;
          b.forEach(function (m, i) {
            var h = 1.3 + Math.sin(t * 2 + i * 0.6) * 1.1;
            m.scale.y = h;
            m.position.y = h / 2 - 1;
          });
        },
      };
    },
    mkt: function (A, Bc) {
      var g = new THREE.Group(),
        p = [];
      [1.6, 1.25, 0.9, 0.55].forEach(function (r, i) {
        var c = new THREE.Mesh(
          new THREE.CylinderGeometry(r, r * 0.8, 0.38, 40, 1, true),
          M(i % 2 ? Bc : A, 0.55),
        );
        c.position.y = 1.1 - i * 0.55;
        g.add(c);
      });
      for (var i = 0; i < 16; i++) {
        var s = new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 12, 12),
          M(0xffffff),
        );
        s.userData = { a: Math.random() * 6.28, o: Math.random() };
        g.add(s);
        p.push(s);
      }
      return {
        g: g,
        t: function (t) {
          g.rotation.y = t * 0.4;
          p.forEach(function (s) {
            var f = (s.userData.o + t * 0.25) % 1,
              r = 1.5 * (1 - f) + 0.2;
            s.position.set(
              Math.cos(s.userData.a + t) * r,
              1.5 - f * 2.6,
              Math.sin(s.userData.a + t) * r,
            );
          });
        },
      };
    },
    eco: function (A, Bc) {
      var g = new THREE.Group(),
        c = [];
      [
        [0, -0.8, 1.5],
        [0.2, -0.1, 1.1],
        [-0.1, 0.5, 0.75],
      ].forEach(function (d, i) {
        var m = new THREE.Mesh(
          new THREE.BoxGeometry(d[2], 0.6, d[2]),
          M(i % 2 ? Bc : A),
        );
        m.position.set(d[0], d[1], 0);
        g.add(m);
      });
      for (var i = 0; i < 6; i++) {
        var k = new THREE.Mesh(
          new THREE.CylinderGeometry(0.22, 0.22, 0.05, 24),
          M(0xffd166),
        );
        g.add(k);
        c.push(k);
      }
      return {
        g: g,
        t: function (t) {
          g.rotation.y = t * 0.5;
          c.forEach(function (k, i) {
            var a = t * 1.2 + i * 1.047;
            k.position.set(
              Math.cos(a) * 1.9,
              Math.sin(t * 2 + i) * 0.5 + 0.3,
              Math.sin(a) * 1.9,
            );
            k.rotation.x = t * 3;
          });
        },
      };
    },
    inn: function (A, Bc) {
      var g = new THREE.Group(),
        s = [];
      for (var i = 0; i < 28; i++)
        for (var h = 0; h < 2; h++) {
          var m = new THREE.Mesh(
            new THREE.SphereGeometry(0.11, 14, 14),
            M(h ? A : Bc),
          );
          m.userData = { i: i, h: h };
          g.add(m);
          s.push(m);
        }
      return {
        g: g,
        t: function (t) {
          g.rotation.y = t * 0.3;
          s.forEach(function (m) {
            var a = m.userData.i * 0.45 + t * 1.2 + m.userData.h * 3.14;
            m.position.set(
              Math.cos(a) * 0.9,
              (m.userData.i - 14) * 0.18,
              Math.sin(a) * 0.9,
            );
          });
        },
      };
    },
    plt: function (A, Bc) {
      var g = new THREE.Group(),
        l = [];
      for (var i = 0; i < 3; i++) {
        var p = new THREE.Mesh(
          new THREE.BoxGeometry(2.6, 0.1, 2.6),
          M(i % 2 ? Bc : A, 0.75),
        );
        p.position.y = (i - 1) * 0.95;
        g.add(p);
        l.push(p);
        var c = new THREE.Mesh(
          new THREE.BoxGeometry(0.45, 0.45, 0.45),
          M(0xffffff),
        );
        c.position.set((i - 1) * 0.6, (i - 1) * 0.95 + 0.3, 0);
        g.add(c);
        l.push(c);
      }
      g.rotation.x = 0.45;
      return {
        g: g,
        t: function (t) {
          g.rotation.y = t * 0.45;
          l.forEach(function (m, i) {
            m.position.y += Math.sin(t * 2 + i) * 0.002;
          });
        },
      };
    },
    ai: function (A, Bc) {
      var g = new THREE.Group(),
        L = [3, 5, 5, 3],
        N = [],
        pos = [],
        ls = [];
      L.forEach(function (n, li) {
        var row = [];
        for (var i = 0; i < n; i++) {
          var m = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 16, 16),
            M(li % 2 ? Bc : A),
          );
          m.position.set((li - 1.5) * 1.3, (i - (n - 1) / 2) * 0.55, 0);
          g.add(m);
          row.push(m);
        }
        N.push(row);
      });
      for (var l = 0; l < 3; l++)
        N[l].forEach(function (a) {
          N[l + 1].forEach(function (b) {
            ls.push(
              a.position.x,
              a.position.y,
              a.position.z,
              b.position.x,
              b.position.y,
              b.position.z,
            );
          });
        });
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(ls, 3));
      g.add(
        new THREE.LineSegments(
          geo,
          new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.35,
          }),
        ),
      );
      return {
        g: g,
        t: function (t) {
          g.rotation.y = Math.sin(t * 0.5) * 0.6;
          N.forEach(function (r, li) {
            r.forEach(function (m, i) {
              m.scale.setScalar(
                1 + 0.6 * Math.max(0, Math.sin(t * 3 - li * 1.1 + i)),
              );
            });
          });
        },
      };
    },
    web: function (A, Bc) {
      var g = new THREE.Group(),
        w = [];
      for (var i = 0; i < 3; i++) {
        var p = new THREE.Mesh(
          new THREE.BoxGeometry(2.2, 1.4, 0.08),
          M(0xffffff, 0.92),
        );
        p.position.set((i - 1) * 0.9, (1 - i) * 0.2, -i * 0.5);
        g.add(p);
        w.push(p);
        var h = new THREE.Mesh(
          new THREE.BoxGeometry(1.9, 0.35, 0.04),
          M(i % 2 ? Bc : A),
        );
        h.position.set(0, 0.45, 0.07);
        p.add(h);
        for (var k = 0; k < 2; k++) {
          var r = new THREE.Mesh(
            new THREE.BoxGeometry(1.2 - k * 0.4, 0.1, 0.04),
            M(0xc9cde0),
          );
          r.position.set(-0.3, 0.05 - k * 0.25, 0.07);
          p.add(r);
        }
      }
      return {
        g: g,
        t: function (t) {
          g.rotation.y = Math.sin(t * 0.6) * 0.5 - 0.3;
          w.forEach(function (p, i) {
            p.position.y = (1 - i) * 0.2 + Math.sin(t * 1.6 + i) * 0.1;
          });
        },
      };
    },
    orb: function (A, Bc) {
      var g = new THREE.Group(),
        o = [],
        r = [];
      g.add(new THREE.Mesh(new THREE.SphereGeometry(0.65, 32, 32), M(A)));
      for (var i = 0; i < 3; i++) {
        var t = new THREE.Mesh(
          new THREE.TorusGeometry(1.2 + i * 0.45, 0.03, 12, 100),
          M(0xffffff, 0.6),
        );
        t.rotation.set(i * 1.05, i * 0.6, 0);
        g.add(t);
        r.push(t);
      }
      for (var j = 0; j < 6; j++) {
        var s = new THREE.Mesh(
          new THREE.SphereGeometry(0.13, 16, 16),
          M(j % 2 ? Bc : 0xffffff),
        );
        g.add(s);
        o.push(s);
      }
      return {
        g: g,
        t: function (t) {
          r.forEach(function (x, i) {
            x.rotation.z = t * (0.4 + i * 0.2);
          });
          o.forEach(function (s, j) {
            var a = t * (0.8 + j * 0.15) + j,
              R = 1.3 + (j % 3) * 0.45;
            s.position.set(
              Math.cos(a) * R,
              Math.sin(a * 1.3) * R * 0.5,
              Math.sin(a) * R,
            );
          });
        },
      };
    },
  };
  function initR() {
    if (renderer || !window.THREE) return;
    var cv = $("canvas", dm);
    renderer = new THREE.WebGLRenderer({
      canvas: cv,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, 2, 0.1, 50);
    camera.position.z = 6.2;
    scene.add(new THREE.AmbientLight(0xffffff, 0.95));
    var l = new THREE.PointLight(0xffffff, 1.3);
    l.position.set(4, 4, 6);
    scene.add(l);
  }
  function size() {
    if (!renderer) return;
    var c = $(".dh", dm);
    renderer.setSize(c.clientWidth, c.clientHeight, false);
    camera.aspect = c.clientWidth / c.clientHeight;
    camera.updateProjectionMatrix();
  }
  var ring = null,
    ang = 0,
    tgt = 0,
    hov = false,
    R = 200,
    drag = false,
    dragY = 0,
    pulse = 0,
    t0 = 0,
    pts = null,
    flT = 0;
  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (!dm.classList.contains("open")) return;
    if (ring) {
      if (!hov) tgt += 0.22;
      ang += (tgt - ang) * 0.08;
      ring.style.transform =
        "translateZ(-" + R + "px) rotateY(" + -ang + "deg)";
    }
    if (!act || !renderer) return;
    var t = now / 1000;
    act.t(t);
    if (pts) pts.rotation.y = t * 0.06;
    grp.rotation.x += (my * 0.5 - grp.rotation.x) * 0.05;
    grp.rotation.y = dragY;
    grp.position.x += (mx * 0.6 - grp.position.x) * 0.05;
    grp.scale.setScalar(1 + pulse * 0.22);
    pulse *= 0.92;
    var e = Math.min(1, (now - t0) / 1400);
    camera.position.z = 6.2 + 3 * Math.pow(1 - e, 3);
    renderer.render(scene, camera);
  }
  function build(k) {
    initR();
    if (!renderer) return;
    if (grp) {
      scene.remove(grp);
      grp.traverse(function (o) {
        if (o.geometry) o.geometry.dispose();
      });
    }
    var W = new THREE.Color(0xffffff),
      A = new THREE.Color(cssv("--acc", "#ff4d2e")).lerp(W, 0.12),
      Bc = new THREE.Color(cssv("--acc2", "#6d5dfc")).lerp(W, 0.12);
    act = B[k](A, Bc);
    grp = new THREE.Group();
    grp.add(act.g);
    var N = 90,
      pa = new Float32Array(N * 3);
    for (var i = 0; i < N * 3; i++) pa[i] = (Math.random() - 0.5) * 14;
    var pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pa, 3));
    pts = new THREE.Points(
      pg,
      new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.7,
      }),
    );
    grp.add(pts);
    scene.add(grp);
    dragY = 0;
    pulse = 0;
    t0 = performance.now();
    size();
  }
  function count(el) {
    var m = /^(\d+(?:\.\d+)?)(.*)$/.exec(el.dataset.v);
    if (!m) {
      el.textContent = el.dataset.v;
      return;
    }
    var n = parseFloat(m[1]),
      f = m[1].indexOf(".") > 0 ? 1 : 0,
      st = performance.now();
    (function s(now) {
      var p = Math.min(1, (now - st) / 1300);
      el.textContent = (n * p).toFixed(f) + m[2];
      if (p < 1) requestAnimationFrame(s);
    })(st);
  }
  function sec(h) {
    return '<h3 class="rv3">' + h + "</h3>";
  }
  function open(key, name) {
    var d = D[key];
    if (!d) return;
    var x = K[EX[key] || d.k] || K.story,
      ti = d.t.replace("{n}", name || "");
    cur = { t: ti };
    $(".dt small", dm).textContent = d.c;
    $(".dt h2", dm).textContent = ti;
    var h =
      '<p class="dl rv3">' +
      d.l.replace("{n}", name || "") +
      '</p><p class="dl2 rv3">' +
      x.why.replace("{t}", ti) +
      "</p>";
    h +=
      '<div class="dn">' +
      d.n
        .map(function (y) {
          return (
            '<div class="rv3"><strong data-v="' +
            y[0] +
            '">0</strong><span>' +
            y[1] +
            "</span></div>"
          );
        })
        .join("") +
      "</div>";
    h +=
      sec("What you get") +
      '<div class="dg">' +
      d.g
        .map(function (y, i) {
          return (
            '<div class="gc rv3"><i>0' +
            (i + 1) +
            "</i><b>" +
            y[0] +
            "</b><span>" +
            y[1] +
            "</span></div>"
          );
        })
        .join("") +
      "</div>";
    h +=
      sec("Deliverables checklist") +
      '<ul class="ck">' +
      x.del
        .map(function (y) {
          return '<li class="rv3">' + y + "</li>";
        })
        .join("") +
      "</ul>";
    h +=
      sec("How it works") +
      '<div class="car rv3"><div class="ring">' +
      d.s
        .map(function (y, i) {
          return (
            '<div class="face"><u>' +
            (i + 1) +
            "</u><b>" +
            y[0] +
            "</b><span>" +
            y[1] +
            "</span></div>"
          );
        })
        .join("") +
      '</div></div><div class="cn"><button id="cp" aria-label="Previous step">←</button><small>Drag or use the arrows. Hover to pause.</small><button id="cx2" aria-label="Next step">→</button></div>';
    h +=
      '<div class="tl">' +
      d.s
        .map(function (y, i) {
          return (
            '<div class="rv3"><em>' + x.wk[i] + "</em><b>" + y[0] + "</b></div>"
          );
        })
        .join("") +
      "</div>";
    h +=
      sec("Before and after") +
      '<div class="flip rv3" title="Click to flip"><div class="fi"><div class="ff fb"><small>BEFORE</small>' +
      x.ba[0] +
      '</div><div class="ff fa"><small>AFTER</small>' +
      x.ba[1] +
      "</div></div></div>";
    h +=
      sec("Where it helps") +
      '<div class="dg">' +
      x.use
        .map(function (y) {
          var i = y.indexOf(":");
          return (
            '<div class="gc rv3"><b>' +
            y.slice(0, i) +
            "</b><span>" +
            y.slice(i + 1) +
            "</span></div>"
          );
        })
        .join("") +
      "</div>";
    h +=
      sec("Tools and technology") +
      '<div class="tc">' +
      x.tech
        .map(function (y, i) {
          return (
            '<span class="rv3" style="--f:' + i * 0.4 + 's">' + y + "</span>"
          );
        })
        .join("") +
      "</div>";
    h +=
      sec("Common questions") +
      x.faq
        .map(function (y) {
          return (
            '<details class="fq rv3"><summary>' +
            y[0] +
            "</summary><p>" +
            y[1] +
            "</p></details>"
          );
        })
        .join("");
    h +=
      '<div class="da rv3"><button class="btn" id="dq">Request a quote for this</button><button class="btn ghost" id="dk">Ask Kay about this</button></div>';
    var db = $(".db", dm);
    db.innerHTML = h;
    for (var i = 0; i < 6; i++) {
      var c = document.createElement("span");
      c.className = "fc";
      c.style.cssText =
        "left:" +
        Math.random() * 94 +
        "%;top:" +
        Math.random() * 96 +
        "%;animation-delay:-" +
        Math.random() * 9 +
        "s;width:" +
        (22 + Math.random() * 30) +
        "px;height:" +
        (22 + Math.random() * 30) +
        "px";
      db.insertBefore(c, db.firstChild);
    }
    [].forEach.call(db.querySelectorAll(".rv3"), function (e, i) {
      e.style.transitionDelay = (i % 4) * 0.07 + "s";
    });
    dm.classList.add("open");
    document.body.style.overflow = "hidden";
    var dp = $(".dp", dm);
    dp.scrollTop = 0;
    if (io) io.disconnect();
    io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { root: dp, threshold: 0.12 },
    );
    [].forEach.call(db.querySelectorAll(".rv3"), function (e) {
      io.observe(e);
    });
    ring = $(".ring", dm);
    ang = tgt = 0;
    hov = false;
    R = Math.max(120, Math.min(230, db.clientWidth / 3.1));
    [].forEach.call(ring.children, function (f, i) {
      f.style.transform = "rotateY(" + i * 90 + "deg) translateZ(" + R + "px)";
    });
    var car = $(".car", dm);
    car.onpointerenter = function () {
      hov = true;
    };
    car.onpointerleave = function () {
      hov = false;
    };
    car.onpointerdown = function (e) {
      var lx = e.clientX;
      hov = true;
      car.setPointerCapture(e.pointerId);
      car.onpointermove = function (ev) {
        tgt -= (ev.clientX - lx) * 0.4;
        lx = ev.clientX;
      };
    };
    car.onpointerup = function () {
      car.onpointermove = null;
    };
    $("#cp", dm).onclick = function () {
      tgt = Math.round(tgt / 90) * 90 - 90;
    };
    $("#cx2", dm).onclick = function () {
      tgt = Math.round(tgt / 90) * 90 + 90;
    };
    var fl = $(".flip", dm);
    clearInterval(flT);
    fl.onclick = function () {
      fl.classList.toggle("x");
    };
    flT = setInterval(function () {
      fl.classList.toggle("x");
    }, 4200);
    build(d.k);
    if (!raf) raf = requestAnimationFrame(loop);
    setTimeout(function () {
      [].forEach.call(dm.querySelectorAll(".dn strong"), count);
    }, 900);
  }
  var io = null;
  function close() {
    dm.classList.remove("open");
    if (!document.getElementById("wl")) document.body.style.overflow = "";
    act = null;
    ring = null;
    clearInterval(flT);
    cancelAnimationFrame(raf);
    raf = 0;
  }
  $(".dx", dm).onclick = close;
  dm.addEventListener("click", function (e) {
    if (e.target === dm) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && dm.classList.contains("open")) close();
  });
  var dh = $(".dh", dm),
    dlx = 0;
  dh.addEventListener("pointermove", function (e) {
    var r = this.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width - 0.5;
    my = (e.clientY - r.top) / r.height - 0.5;
    if (drag) {
      dragY += (e.clientX - dlx) * 0.012;
      dlx = e.clientX;
    }
  });
  dh.addEventListener("pointerdown", function (e) {
    drag = true;
    dlx = e.clientX;
    pulse = 1;
  });
  addEventListener("pointerup", function () {
    drag = false;
  });
  addEventListener("resize", size);
  function toForm() {
    var m = document.getElementById("m");
    if (m) m.value = "Hi KGLN, I would like to discuss: " + cur.t;
    close();
    setTimeout(function () {
      var c = document.getElementById("contact");
      if (c) c.scrollIntoView({ behavior: "smooth" });
    }, 250);
  }
  function askKay() {
    var t = cur.t;
    close();
    var ok = false;
    try {
      window.claude &&
        claude
          .use("sample")
          .then(function (x) {
            if (x && document.getElementById("cbtn")) {
              setTimeout(function () {
                var cw = document.getElementById("cw");
                if (!cw.classList.contains("open"))
                  document.getElementById("cbtn").click();
                setTimeout(function () {
                  document.getElementById("ci").value =
                    "Tell me more about: " + t;
                  document.getElementById("cs").click();
                }, 300);
              }, 300);
            } else toForm();
          })
          .catch(toForm);
      ok = !!window.claude;
    } catch (e) {}
    if (!ok) toForm();
  }
  dm.addEventListener("click", function (e) {
    if (e.target.id === "dq") toForm();
    else if (e.target.id === "dk") askKay();
  });
  dm.addEventListener("pointermove", function (e) {
    var g = e.target.closest && e.target.closest(".gc.in");
    if (g) {
      var r = g.getBoundingClientRect();
      g.style.transform =
        "perspective(700px) rotateY(" +
        ((e.clientX - r.left) / r.width - 0.5) * 14 +
        "deg) rotateX(" +
        -((e.clientY - r.top) / r.height - 0.5) * 14 +
        "deg) translateY(-4px)";
    }
  });
  dm.addEventListener("pointerout", function (e) {
    var g = e.target.closest && e.target.closest(".gc");
    if (g) g.style.transform = "";
  });
  function find(t) {
    var a, i, L;
    if ((a = t.closest(".wwd a")))
      return ["w" + ([].indexOf.call(a.parentNode.children, a) + 1)];
    if ((a = t.closest("#services .card"))) {
      L = document.querySelectorAll("#services .card");
      return ["s" + ([].indexOf.call(L, a) + 1)];
    }
    if (t.closest(".gen .btn")) return ["genai"];
    if ((a = t.closest(".pj"))) {
      var k = a.querySelector("small").textContent;
      return [
        /commerce/i.test(k) ? "pe" : /brand/i.test(k) ? "pb" : "pw",
        a.querySelector("h4").textContent,
      ];
    }
    if ((a = t.closest(".case"))) {
      L = document.querySelectorAll(".case");
      return ["c" + ([].indexOf.call(L, a) + 1)];
    }
    if ((a = t.closest("#stories .cc"))) {
      L = document.querySelectorAll("#stories .cc");
      return ["st" + ([].indexOf.call(L, a) + 1)];
    }
    if ((a = t.closest("#insights .cc"))) {
      L = document.querySelectorAll("#insights .cc");
      return ["in" + ([].indexOf.call(L, a) + 1)];
    }
    if (t.closest(".join .btn")) return ["careers"];
    if ((a = t.closest(".sl .btn"))) {
      L = document.querySelectorAll(".sl");
      i = [].indexOf.call(L, a.closest(".sl"));
      return [["future", "genai", "beyond"][i]];
    }
    return null;
  }
  document.addEventListener(
    "click",
    function (e) {
      if (dm.contains(e.target)) return;
      var f = find(e.target);
      if (f && f[0]) {
        e.preventDefault();
        open(f[0], f[1]);
      }
    },
    true,
  );
})();
