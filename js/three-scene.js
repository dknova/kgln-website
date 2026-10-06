(function () {
  var cv = document.getElementById("bg");
  if (!window.THREE) {
    return;
  }
  var r = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
  r.setPixelRatio(Math.min(devicePixelRatio, 2));
  var s = new THREE.Scene(),
    c = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  c.position.z = 7;
  var g = new THREE.Group();
  s.add(g);
  window.KG = {};
  var core = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.15, 0.36, 180, 28),
    new THREE.MeshStandardMaterial({
      color: 0xffa592,
      metalness: 0.15,
      roughness: 0.45,
      transparent: true,
      opacity: 0.55,
    }),
  );
  var inner = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0xb3a9ff,
      metalness: 0.1,
      roughness: 0.4,
      transparent: true,
      opacity: 0.6,
    }),
  );
  var ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.7, 0.07, 16, 120),
    new THREE.MeshStandardMaterial({
      color: 0xb3a9ff,
      metalness: 0.1,
      roughness: 0.5,
      transparent: true,
      opacity: 0.5,
    }),
  );
  ring.rotation.x = 1.2;
  s.add(new THREE.AmbientLight(0xffffff, 0.9));
  var l1 = new THREE.PointLight(0xffffff, 1.2);
  l1.position.set(5, 5, 6);
  s.add(l1);
  var l2 = new THREE.PointLight(0x88aaff, 0.9);
  l2.position.set(-6, -3, 4);
  s.add(l2);
  for (var q = 0; q < 6; q++) {
    var o = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.16, 0),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.5,
        transparent: true,
        opacity: 0.8,
      }),
    );
    var an = (q / 6) * 6.283;
    o.position.set(Math.cos(an) * 2.7, Math.sin(an) * 2.7, 0);
    ring.add(o);
  }
  g.add(core, inner, ring);
  window.KG = { core: core, inner: inner, ring: ring };
  var N = 900,
    p = new Float32Array(N * 3);
  for (var i = 0; i < N * 3; i++) p[i] = (Math.random() - 0.5) * 28;
  var pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(p, 3));
  var pts = new THREE.Points(
    pg,
    new THREE.PointsMaterial({ size: 0.035, color: 0x8b92ad }),
  );
  s.add(pts);
  var mx = 0,
    my = 0,
    sy = 0;
  addEventListener("mousemove", function (e) {
    mx = e.clientX / innerWidth - 0.5;
    my = e.clientY / innerHeight - 0.5;
  });
  addEventListener("scroll", function () {
    sy = scrollY / Math.max(1, document.body.scrollHeight - innerHeight);
  });
  function rs() {
    r.setSize(innerWidth, innerHeight, false);
    c.aspect = innerWidth / innerHeight;
    c.updateProjectionMatrix();
    g.position.x = 0;
  }
  rs();
  addEventListener("resize", rs);
  var t = 0;
  (function loop() {
    t += 0.005;
    core.rotation.y = t + sy * 6;
    core.rotation.x = t * 0.6;
    inner.rotation.y = -t * 1.5;
    inner.rotation.z = t;
    ring.rotation.z = t * 0.8;
    g.rotation.y += (mx * 0.8 - g.rotation.y) * 0.05;
    g.rotation.x += (my * 0.8 - g.rotation.x) * 0.05;
    g.position.y = -sy * 4 + Math.sin(t * 2) * 0.1;
    g.scale.setScalar(1 - sy * 0.35);
    pts.rotation.y = t * 0.15 + sy * 2;
    pts.position.y = sy * 3;
    r.render(s, c);
    requestAnimationFrame(loop);
  })();
})();
