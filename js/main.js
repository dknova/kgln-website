// scroll reveal
var io = new IntersectionObserver(
  function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".rv").forEach(function (el) {
  io.observe(el);
});
// =====================================================
// ANIMATED STAT COUNTERS
// =====================================================

var co = new IntersectionObserver(
  function (entries) {

    entries.forEach(function (entry) {

      if (!entry.isIntersecting) return;

      var el = entry.target;

      // Make sure each counter runs only once
      if (el.dataset.counted === "true") return;

      el.dataset.counted = "true";

      co.unobserve(el);

      var target = Number(el.dataset.n) || 0;
      var suffix = el.dataset.s || "";

      var duration = 1800;
      var start = performance.now();

      function animate(now) {

        var progress =
          Math.min(
            1,
            (now - start) / duration
          );

        // Smooth ease-out
        var eased =
          1 -
          Math.pow(
            1 - progress,
            3
          );

        var current =
          Math.round(
            target * eased
          );

        // Keep + / % visible during animation
        el.textContent =
          current + suffix;

        if (progress < 1) {

          requestAnimationFrame(
            animate
          );

        } else {

          // Guarantee exact final value
          el.textContent =
            target + suffix;
        }
      }

      requestAnimationFrame(
        animate
      );

    });

  },
  {
    threshold: 0.35
  }
);


// Observe every statistic number
document
  .querySelectorAll(".stat b[data-n]")
  .forEach(function (el) {
    el.textContent =
      "0" + (el.dataset.s || "");
    co.observe(el);
  });
// 3D tilt cards
document.querySelectorAll(".card").forEach(function (el) {
  el.addEventListener("mousemove", function (e) {
    var b = el.getBoundingClientRect(),
      x = (e.clientX - b.left) / b.width - 0.5,
      y = (e.clientY - b.top) / b.height - 0.5;
    el.style.transform =
      "perspective(700px) rotateY(" +
      x * 12 +
      "deg) rotateX(" +
      -y * 12 +
      "deg) translateZ(8px)";
  });
  el.addEventListener("mouseleave", function () {
    el.style.transform = "";
  });
});

var PJ = [
  ["Web", "Adelaide Roofing Co", "Lead-gen website", "#ff4d2e,#ffb020"],
  ["Ecom", "Coastal Outfitters", "E-commerce store", "#6d5dfc,#00b3ff"],
  ["Brand", "Northline Studio", "Brand + website", "#10c98f,#0a84ff"],
  ["Web", "Praxis Consulting", "Corporate website", "#e0457b,#6d5dfc"],
  ["Ecom", "Fresh Pantry", "Online grocery", "#ffb020,#10c98f"],
  ["Brand", "Apex Dental", "Brand + booking site", "#00b3ff,#6d5dfc"],
];
var FL = [
  ["All", "*"],
  ["Websites", "Web"],
  ["E-commerce", "Ecom"],
  ["Branding", "Brand"],
];
function draw(k) {
  document.getElementById("port").innerHTML = PJ.filter(function (p) {
    return k == "*" || p[0] == k;
  })
    .map(function (p) {
      var c = p[3].split(",");
      return (
        '<div class="pj"><div class="th" style="background:linear-gradient(135deg,' +
        c[0] +
        "," +
        c[1] +
        ')"><div class="br"><div class="dots"><u></u><u></u><u></u></div><div class="h" style="background:linear-gradient(90deg,' +
        c[0] +
        "," +
        c[1] +
        ')"></div><i style="width:70%"></i><i style="width:90%"></i><i style="width:45%"></i></div></div><div class="tx"><small>' +
        p[2] +
        "</small><h4>" +
        p[1] +
        "</h4></div></div>"
      );
    })
    .join("");
}
document.getElementById("flt").innerHTML = FL.map(function (f, i) {
  return (
    '<button data-k="' +
    f[1] +
    '" class="' +
    (i ? "" : "on") +
    '">' +
    f[0] +
    "</button>"
  );
}).join("");
document.getElementById("flt").onclick = function (e) {
  var k = e.target.dataset.k;
  if (!k) return;
  [].forEach.call(this.children, function (b) {
    b.classList.toggle("on", b === e.target);
  });
  draw(k);
};
draw("*");
var PAL = [
  ["#ff4d2e", "#6d5dfc"],
  ["#00b3ff", "#6d5dfc"],
  ["#10c98f", "#0a84ff"],
  ["#ffb020", "#e0457b"],
];
var pe = document.getElementById("pal");
function setPal(i) {
  var a = PAL[i];
  document.documentElement.style.setProperty("--acc", a[0]);
  document.documentElement.style.setProperty("--acc2", a[1]);
  if (window.KG && KG.core) {
    var W = new THREE.Color(0xffffff);
    KG.core.material.color.set(a[0]).lerp(W, 0.5);
    KG.inner.material.color.set(a[1]).lerp(W, 0.5);
    KG.ring.material.color.set(a[1]).lerp(W, 0.5);
  }
  [].forEach.call(pe.children, function (b, j) {
    b.classList.toggle("on", j == i);
  });
  try {
    localStorage.setItem("kgp", i);
  } catch (x) {}
}
PAL.forEach(function (a, i) {
  var b = document.createElement("button");
  b.style.background = "linear-gradient(135deg," + a[0] + "," + a[1] + ")";
  b.setAttribute("aria-label", "Palette " + (i + 1));
  b.onclick = function () {
    setPal(i);
  };
  pe.appendChild(b);
});
var sp = 0;
try {
  sp = +localStorage.getItem("kgp") || 0;
} catch (x) {}
setPal(sp);
document.getElementById("cf").onsubmit = function (ev) {

  ev.preventDefault();

  var form = this;

  var button =
    form.querySelector('button[type="submit"]');

  if (button) {
    button.disabled = true;
    button.textContent = "SENDING...";
  }

  emailjs.sendForm(
    "service_337y2gc",
    "template_d0l19tw",
    form
  )
  .then(function () {

    console.log(
      "KGLN enquiry sent successfully"
    );

    document.getElementById("ok").style.display =
      "block";

    if (button) {
      button.disabled = false;
      button.textContent = "SEND ENQUIRY";
    }

    form.reset();

  })
.catch(function (error) {
  console.error("KGLN enquiry failed:", error);

  alert(
    "Email sending failed.\n\n" +
    "Status: " + (error.status || "unknown") +
    "\nMessage: " + (error.text || error.message || "Unknown error")
  );

  if (button) {
    button.disabled = false;
    button.textContent = "SEND ENQUIRY";
  }
});

};
