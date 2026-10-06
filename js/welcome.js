(function () {
  var wl = document.getElementById("wl");
  if (!wl) return;
  var $ = function (i) {
      return document.getElementById(i);
    },
    cb = $("cb"),
    wbot = wl.querySelector(".wbot"),
    ta = $("wta"),
    st = $("wst"),
    avail = false,
    done = false,
    listening = false;
  cb.classList.add("on");
  cb.style.opacity = 0;
  wl.style.display = "none";
  var shown = false;
  try {
    window.claude &&
      claude
        .use("sample")
        .then(function (x) {
          avail = !!x;
        })
        .catch(function () {});
  } catch (e) {}
  var msg =
      "Hi, I'm Kay 👋 Tell me what your business needs. You can type it or just speak it.",
    k = 0,
    wt = $("wt");
  function show() {
    if (shown) return;
    shown = true;
    wl.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      (function t() {
        wt.textContent = msg.slice(0, ++k);
        if (k < msg.length) setTimeout(t, 26);
      })();
    }, 900);
  }
  // let the page finish loading (and its fonts), pause a moment so the visitor sees it, then bring in the robot
  var go = function () {
    setTimeout(show, 900);
  };
  if (window.__preDone || !document.getElementById("pre")) go();
  else addEventListener("preloaded", go);
  setTimeout(show, 14000);
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition,
    rec = null,
    base = "";
  if (SR) {
    rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = navigator.language || "en-US";
    rec.onresult = function (e) {
      var t = "";
      for (var i = 0; i < e.results.length; i++)
        t += e.results[i][0].transcript;
      ta.value = (base + " " + t).trim();
    };
    rec.onend = function () {
      setL(false);
    };
    rec.onerror = function (e) {
      setL(false);
      st.textContent =
        e.error === "not-allowed" || e.error === "service-not-allowed"
          ? "Microphone is blocked. Click the lock icon in the address bar, allow Microphone, then try again. You can also just type."
          : "Could not hear you. Try again or type.";
    };
  }
  function setL(on) {
    listening = on;
    $("wm").classList.toggle("on", on);
    if (on) st.textContent = "Listening… speak now";
    else if (st.textContent.indexOf("Listening") == 0) st.textContent = "";
  }
  function mic() {
    if (!rec) {
      st.textContent =
        "Voice input isn't supported in this browser. Please type, or use Chrome, Edge or Safari.";
      return;
    }
    if (listening) {
      rec.stop();
      return;
    }
    base = ta.value;
    st.textContent = "Requesting microphone… please click Allow";
    var go = function () {
      try {
        rec.start();
        setL(true);
      } catch (e) {}
    };
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (m) {
          m.getTracks().forEach(function (t) {
            t.stop();
          });
          go();
        })
        .catch(function () {
          st.textContent =
            "Microphone is blocked. Click the lock icon in the address bar, allow Microphone, then try again. You can also just type.";
        });
    } else go();
  }
  function reveal() {
    $("wi").style.display = "block";
    $("wo").style.display = "none";
    ta.focus();
  }
  $("wtype").onclick = reveal;
  $("wmic").onclick = function () {
    reveal();
    mic();
  };
  $("wm").onclick = mic;
  function finish(text) {
    if (done || !shown) return;
    done = true;
    if (listening && rec)
      try {
        rec.stop();
      } catch (e) {}
    var cbtn = $("cbtn"),
      r1 = wbot.getBoundingClientRect(),
      r2 = cbtn.getBoundingClientRect(),
      dx = r2.left + r2.width / 2 - (r1.left + r1.width / 2),
      dy = r2.top + r2.height / 2 - (r1.top + r1.height / 2),
      sc = r2.width / r1.width;
    wl.classList.add("leaving");
    wbot.style.transform =
      "translate(" + dx + "px," + dy + "px) scale(" + sc + ")";
    setTimeout(function () {
      wl.remove();
      document.body.style.overflow = "";
      cb.style.transition = "opacity .3s";
      cb.style.opacity = 1;
      if (!avail)
        cbtn.onclick = function () {
          $("contact").scrollIntoView({ behavior: "smooth" });
        };
      if (text) {
        if (avail) {
          cbtn.click();
          setTimeout(function () {
            $("ci").value = text;
            $("cs").click();
          }, 350);
        } else {
          $("m").value = text;
          setTimeout(function () {
            $("contact").scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      }
    }, 980);
  }
  $("wsend").onclick = function () {
    var t = ta.value.trim();
    if (!t) {
      st.textContent = "Please tell me a little first, or press Skip.";
      return;
    }
    finish(t);
  };
  $("wskip").onclick = function () {
    finish("");
  };
  ta.onkeydown = function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      $("wsend").click();
    }
  };
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") finish("");
  });
})();
