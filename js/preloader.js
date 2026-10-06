/* kgln-pre */
(function () {
  var pre = document.getElementById("pre"),
    bar = document.getElementById("prb"),
    num = document.getElementById("prn"),
    p = 0,
    t0 = performance.now(),
    loaded = document.readyState === "complete",
    fonts = false,
    done = false;
  document.body.style.overflow = "hidden";
  addEventListener("load", function () {
    loaded = true;
  });
  (document.fonts && document.fonts.ready
    ? document.fonts.ready
    : Promise.resolve()
  ).then(function () {
    fonts = true;
  });
  setTimeout(function () {
    loaded = fonts = true;
  }, 8000);
  function end() {
    if (done) return;
    done = true;
    pre.classList.add("out");
    setTimeout(function () {
      pre.remove();
      document.body.style.overflow = "";
      window.__preDone = true;
      window.dispatchEvent(new Event("preloaded"));
    }, 950);
  }
  (function tick() {
    var age = performance.now() - t0,
      ready = loaded && fonts && age > 2400,
      target = ready ? 100 : Math.min(88, (age / 2400) * 88);
    p += (target - p) * 0.07;
    if (ready && p > 99.4) p = 100;
    bar.style.width = p + "%";
    num.textContent = Math.round(p) + "%";
    if (p >= 100) setTimeout(end, 350);
    else requestAnimationFrame(tick);
  })();
})();
