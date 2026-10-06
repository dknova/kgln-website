(function () {
  var sl = document.querySelectorAll(".sl"),
    tb = document.querySelectorAll(".thumbs button"),
    i = 0,
    t;
  function go(n) {
    i = n;
    sl.forEach(function (e, k) {
      e.classList.toggle("on", k == n);
    });
    tb.forEach(function (b, k) {
      b.classList.remove("on");
      void b.offsetWidth;
      b.classList.toggle("on", k == n);
    });
    clearTimeout(t);
    t = setTimeout(function () {
      go((i + 1) % sl.length);
    }, 6000);
  }
  tb.forEach(function (b, k) {
    b.onclick = function () {
      go(k);
    };
  });
  go(0);
})();
