(function () {
  function cube(x, y, z, c) {
    var w = z,
      h = z * 0.58;
    return (
      '<g transform="translate(' +
      x +
      "," +
      y +
      ')"><polygon points="0,0 ' +
      w +
      "," +
      h +
      " 0," +
      2 * h +
      " -" +
      w +
      "," +
      h +
      '" fill="#fff" fill-opacity=".95"/><polygon points="-' +
      w +
      "," +
      h +
      " 0," +
      2 * h +
      " 0," +
      (2 * h + z) +
      " -" +
      w +
      "," +
      (h + z) +
      '" fill="' +
      c +
      '" fill-opacity=".55"/><polygon points="' +
      w +
      "," +
      h +
      " 0," +
      2 * h +
      " 0," +
      (2 * h + z) +
      " " +
      w +
      "," +
      (h + z) +
      '" fill="#000" fill-opacity=".28"/></g>'
    );
  }
  function art(t, a, b, id) {
    var d =
        '<defs><linearGradient id="g' +
        id +
        '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' +
        a +
        '"/><stop offset="1" stop-color="' +
        b +
        '"/></linearGradient></defs><rect width="400" height="250" fill="url(#g' +
        id +
        ')"/>',
      i,
      o = "";
    for (i = 0; i < 9; i++)
      o +=
        '<circle cx="' +
        (30 + i * 45) +
        '" cy="' +
        (20 + (i % 3) * 90) +
        '" r="' +
        (2 + (i % 3)) +
        '" fill="#fff" fill-opacity=".25"/>';
    d += o;
    t = t % 5;
    if (t == 0) {
      d +=
        cube(200, 40, 50, b) +
        cube(130, 92, 40, a) +
        cube(270, 98, 40, a) +
        cube(200, 120, 34, b);
    } else if (t == 1) {
      d +=
        '<rect x="95" y="40" width="210" height="140" rx="12" fill="#fff" fill-opacity=".95"/><rect x="95" y="40" width="210" height="22" rx="12" fill="#fff"/>' +
        [0, 1, 2]
          .map(function (k) {
            return (
              '<circle cx="' +
              (111 + k * 12) +
              '" cy="51" r="3.5" fill="' +
              (k ? b : a) +
              '"/>'
            );
          })
          .join("") +
        [60, 95, 75, 120, 100]
          .map(function (h, k) {
            return (
              '<rect x="' +
              (115 + k * 36) +
              '" y="' +
              (170 - h * 0.9) +
              '" width="22" height="' +
              h * 0.9 +
              '" rx="5" fill="url(#g' +
              id +
              ')"/>'
            );
          })
          .join("") +
        '<rect x="150" y="190" width="100" height="8" rx="4" fill="#fff" fill-opacity=".8"/>';
    } else if (t == 2) {
      d +=
        '<ellipse cx="200" cy="125" rx="150" ry="48" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2" transform="rotate(-18 200 125)"/><ellipse cx="200" cy="125" rx="110" ry="32" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2" transform="rotate(24 200 125)"/><circle cx="200" cy="125" r="46" fill="#fff" fill-opacity=".95"/><circle cx="188" cy="112" r="14" fill="' +
        a +
        '" fill-opacity=".45"/><circle cx="330" cy="82" r="13" fill="#fff"/><circle cx="82" cy="165" r="10" fill="#fff" fill-opacity=".85"/>';
    } else if (t == 3) {
      [
        [110, 40, -8],
        [165, 28, 0],
        [220, 40, 8],
      ].forEach(function (p, k) {
        d +=
          '<g transform="rotate(' +
          p[2] +
          " " +
          (p[0] + 35) +
          ' 125)"><rect x="' +
          p[0] +
          '" y="' +
          p[1] +
          '" width="70" height="150" rx="12" fill="#fff" fill-opacity="' +
          (k == 1 ? 1 : 0.8) +
          '"/><rect x="' +
          (p[0] + 8) +
          '" y="' +
          (p[1] + 14) +
          '" width="54" height="50" rx="7" fill="url(#g' +
          id +
          ')"/><rect x="' +
          (p[0] + 8) +
          '" y="' +
          (p[1] + 74) +
          '" width="40" height="7" rx="3" fill="#cfd3e0"/><rect x="' +
          (p[0] + 8) +
          '" y="' +
          (p[1] + 90) +
          '" width="54" height="7" rx="3" fill="#cfd3e0"/><rect x="' +
          (p[0] + 8) +
          '" y="' +
          (p[1] + 116) +
          '" width="54" height="16" rx="8" fill="' +
          b +
          '"/></g>';
      });
    } else {
      d +=
        '<path d="M0 190 C70 120 120 220 200 150 S330 90 400 140 V250 H0Z" fill="#fff" fill-opacity=".25"/><path d="M0 215 C80 170 150 235 230 185 S340 150 400 190 V250 H0Z" fill="#fff" fill-opacity=".35"/><polyline points="40,170 110,120 170,145 240,80 310,100 360,50" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="240" cy="80" r="8" fill="#fff"/><circle cx="360" cy="50" r="8" fill="#fff"/>';
    }
    return (
      '<svg class="artsvg" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      d +
      "</svg>"
    );
  }
  var n = 0;
  function dec() {
    document.querySelectorAll(".cc .im,.pj .th,.viz").forEach(function (el) {
      if (el.dataset.art) return;
      el.dataset.art = 1;
      var st = el.getAttribute("style") || "",
        m =
          st.match(/#[0-9a-f]{6}/gi) ||
          (el.classList.contains("b")
            ? ["#0fb5a6", "#6d5dfc"]
            : ["#6d5dfc", "#ff4d2e"]);
      var svg = art(n, m[0], m[1], n++);
      if (el.classList.contains("th")) el.innerHTML = svg;
      else el.insertAdjacentHTML("afterbegin", svg);
      if (el.classList.contains("im") || el.classList.contains("viz"))
        el.innerHTML = el.innerHTML.replace(/>([^<]+)$/, "><span>$1</span>");
    });
  }
  var _d = window.draw;
  window.draw = function (k) {
    _d(k);
    dec();
  };
  dec();
})();
