/*
   Hero blueprint/skyline scene.
   Replaces the old static hero photo with a light, animated line-art scene:
   a drifting skyline of simple house silhouettes, a hand-drawn "blueprint"
   house that sketches itself in, a flowing gold trace line, and a scatter of
   softly floating accent dots. Built with GSAP + ScrollTrigger (already used
   elsewhere on the site) so motion stays eased and choreographed instead of
   a flat looping GIF/video.

   Every container with class="hero-blueprint-scene" gets its own scene.
   Add data-scene-variant="compact" for a lighter decoration on pages that
   already carry a real photo (the mortgage detail heroes).

   A separate ".hero-logo-story" container (data-logo-src="...") renders the
   real RDC crest with its own looping story: a gold shield ring draws in,
   the crest reveals bottom-to-top like its own tree growing, a few leaf
   sparks drift off the canopy, a trend-arrow swoosh runs through the
   growth-chart area, then it all erases and repeats.

   Falls back to a static (undrawn/undrifting) illustration when GSAP isn't
   available or the visitor prefers reduced motion, so the layer never
   depends on JS to look intentional.
*/
(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var VIEW_W = 1200;
  var VIEW_H = 700;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var BACK_BUILDINGS = [
    { x: 0, w: 70, h: 90, pitched: false },
    { x: 80, w: 46, h: 130, pitched: true },
    { x: 140, w: 60, h: 70, pitched: false },
    { x: 214, w: 90, h: 150, pitched: false },
    { x: 320, w: 50, h: 100, pitched: true },
    { x: 386, w: 64, h: 80, pitched: false },
    { x: 466, w: 100, h: 170, pitched: false },
    { x: 582, w: 54, h: 110, pitched: true },
    { x: 652, w: 72, h: 90, pitched: false },
    { x: 740, w: 46, h: 60, pitched: true },
    { x: 800, w: 110, h: 140, pitched: false },
    { x: 928, w: 56, h: 100, pitched: true },
    { x: 1000, w: 80, h: 75, pitched: false },
    { x: 1096, w: 60, h: 120, pitched: true }
  ];

  var FRONT_BUILDINGS = [
    { x: 20, w: 120, h: 60, pitched: true },
    { x: 170, w: 80, h: 40, pitched: false },
    { x: 280, w: 140, h: 80, pitched: true },
    { x: 460, w: 90, h: 50, pitched: false },
    { x: 580, w: 130, h: 70, pitched: true },
    { x: 760, w: 100, h: 45, pitched: false },
    { x: 900, w: 150, h: 85, pitched: true },
    { x: 1090, w: 90, h: 55, pitched: false }
  ];

  var DOTS_FULL = [
    [140, 120, 3.2], [260, 210, 2.4], [360, 90, 3], [520, 160, 2.6],
    [610, 260, 3.4], [760, 110, 2.4], [860, 190, 3], [980, 130, 2.6],
    [1080, 240, 3.2], [200, 320, 2.4], [660, 340, 2.8], [940, 320, 2.4],
    [420, 240, 2.6], [1140, 160, 3]
  ];

  var DOTS_COMPACT = [
    [960, 110, 2.6], [1040, 210, 3], [1120, 150, 2.4],
    [880, 260, 2.6], [1000, 320, 2.4]
  ];

  // Logo story scene, built to the same 227x242 frame as the real crest
  // artwork so the hand-drawn version and the photo crossfade line up.
  // Geometry mirrors the crest's own iconography: two canopies that lean
  // together with a house roofline peeking between them, trunks that taper
  // into a single rising arrow, three growth bars sitting on that arrow,
  // and a person standing beside them.
  var LOGO_VIEW_W = 227;
  var LOGO_VIEW_H = 242;

  // A handful of large, heavily-overlapping blobs read as a full rounded
  // canopy at a glance -- a dozen small dots just turned to noise at the
  // crest's small on-page size, so this trades fussy detail for a bold,
  // legible silhouette instead.
  var LEFT_TREE_LEAVES = [
    [12, 62, 15], [18, 30, 16], [44, 13, 17], [72, 24, 16], [86, 56, 15], [50, 48, 19]
  ];
  var RIGHT_TREE_LEAVES = LEFT_TREE_LEAVES.map(function (leaf) {
    return [227 - leaf[0], leaf[1], leaf[2]];
  });

  var CREST_BARS = [
    { x: 96, w: 13, h: 20 },
    { x: 113, w: 13, h: 32 },
    { x: 130, w: 13, h: 45 }
  ];
  var CREST_BAR_BASE_Y = 206;

  function el(tag, attrs) {
    var node = document.createElementNS(SVG_NS, tag);
    for (var key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key)) {
        node.setAttribute(key, attrs[key]);
      }
    }
    return node;
  }

  // withWindows adds a real elevation-drawing touch (a grid of window
  // outlines) to the nearer skyline row -- distant buildings stay as plain
  // silhouettes, which is how real depth-of-field reads anyway.
  function appendHouse(group, x, w, h, baseY, pitched, extra, withWindows) {
    var top = baseY - h;
    group.appendChild(el("rect", Object.assign({ x: x, y: top, width: w, height: h }, extra)));

    if (pitched) {
      var roofH = w * 0.42;
      var overhang = w * 0.06;
      group.appendChild(
        el(
          "path",
          Object.assign(
            {
              d:
                "M" + (x - overhang) + " " + top + " L" + (x + w / 2) + " " + (top - roofH) + " L" + (x + w + overhang) + " " + top + " Z",
              "stroke-linejoin": "round"
            },
            extra
          )
        )
      );
    } else if (w > 70) {
      // Flat-roofed buildings get a thin parapet ledge instead of a bare
      // rectangle top, closer to how real low-rise facades read.
      var capOverhang = w * 0.05;
      group.appendChild(
        el(
          "rect",
          Object.assign({ x: x - capOverhang, y: top - 4, width: w + capOverhang * 2, height: 4 }, extra)
        )
      );
    }

    if (withWindows && w > 55 && h > 40) {
      var cols = w > 110 ? 4 : w > 80 ? 3 : 2;
      var rows = Math.max(2, Math.min(5, Math.round(h / 34)));
      var padX = w * 0.14;
      var padTop = pitched ? h * 0.28 : h * 0.16;
      var padBottom = h * 0.1;
      var gridW = w - padX * 2;
      var gridH = h - padTop - padBottom;
      var winW = (gridW / cols) * 0.58;
      var winH = (gridH / rows) * 0.58;
      var gapX = gridW / cols;
      var gapY = gridH / rows;
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          group.appendChild(
            el("rect", {
              x: x + padX + c * gapX + (gapX - winW) / 2,
              y: top + padTop + r * gapY + (gapY - winH) / 2,
              width: winW,
              height: winH,
              class: "bp-building-window"
            })
          );
        }
      }
    }
  }

  function buildSkylineRow(group, buildings, baseY, extra, withWindows) {
    [0, VIEW_W].forEach(function (offset) {
      buildings.forEach(function (b) {
        appendHouse(group, offset + b.x, b.w, b.h, baseY, b.pitched, extra, withWindows);
      });
    });
  }

  // Single hand-drawn "blueprint" house, built like a real elevation
  // drawing rather than a bare rectangle-and-triangle silhouette: a roof
  // with true eave overhang and a ridge cap, mullioned four-pane windows,
  // a paneled front door with a knob and a step, and a capped chimney.
  // Each piece animates in with its own stroke-dashoffset draw so it reads
  // like a sketch settling into place rather than a static stamp.
  function buildHouseSketch(group, cx, groundY, w, wallH, roofH) {
    var left = cx - w / 2;
    var right = cx + w / 2;
    var eaveY = groundY - wallH;
    var apexY = eaveY - roofH;
    var overhang = w * 0.09;

    var outline = el("path", {
      class: "bp-sketch-path bp-house-outline",
      d:
        "M" + left + " " + groundY +
        " L" + left + " " + eaveY +
        " L" + (left - overhang) + " " + eaveY +
        " L" + cx + " " + apexY +
        " L" + (right + overhang) + " " + eaveY +
        " L" + right + " " + eaveY +
        " L" + right + " " + groundY
    });

    var ridgeCap = el("path", {
      class: "bp-sketch-path bp-house-detail",
      d: "M" + (left - overhang * 0.55) + " " + (eaveY - roofH * 0.06) + " L" + cx + " " + (apexY - roofH * 0.05)
    });

    var foundation = el("path", {
      class: "bp-sketch-path bp-house-detail",
      d: "M" + (left - overhang * 0.7) + " " + groundY + " L" + (right + overhang * 0.7) + " " + groundY
    });

    var doorX = cx - w * 0.085;
    var doorY = groundY - wallH * 0.54;
    var doorW = w * 0.17;
    var doorH = wallH * 0.54;
    var door = el("path", {
      class: "bp-sketch-path bp-house-detail",
      d:
        "M" + doorX + " " + groundY + " L" + doorX + " " + doorY +
        " L" + (doorX + doorW) + " " + doorY + " L" + (doorX + doorW) + " " + groundY +
        " M" + (doorX + doorW / 2) + " " + doorY + " L" + (doorX + doorW / 2) + " " + groundY
    });
    var doorKnob = el("circle", {
      class: "bp-sketch-path bp-house-detail",
      cx: doorX + doorW * 0.78,
      cy: groundY - doorH * 0.46,
      r: Math.max(1.4, w * 0.006)
    });

    function mullionedWindow(wx, wy, ww, wh) {
      return el("path", {
        class: "bp-sketch-path bp-house-detail",
        d:
          "M" + wx + " " + wy + " L" + wx + " " + (wy + wh) + " L" + (wx + ww) + " " + (wy + wh) +
          " L" + (wx + ww) + " " + wy + " Z" +
          " M" + wx + " " + (wy + wh / 2) + " L" + (wx + ww) + " " + (wy + wh / 2) +
          " M" + (wx + ww / 2) + " " + wy + " L" + (wx + ww / 2) + " " + (wy + wh)
      });
    }

    var window1 = mullionedWindow(left + w * 0.14, eaveY + wallH * 0.15, w * 0.17, wallH * 0.24);
    var window2 = mullionedWindow(right - w * 0.31, eaveY + wallH * 0.15, w * 0.17, wallH * 0.24);

    var chimneyX = cx + w * 0.19;
    var chimneyTopY = apexY + roofH * 0.16;
    var chimneyBottomY = apexY + roofH * 0.62;
    var chimneyW = w * 0.075;
    var chimney = el("path", {
      class: "bp-sketch-path bp-house-detail",
      d:
        "M" + (chimneyX - chimneyW * 0.18) + " " + chimneyBottomY +
        " L" + (chimneyX - chimneyW * 0.18) + " " + chimneyTopY +
        " L" + (chimneyX + chimneyW) + " " + chimneyTopY +
        " L" + (chimneyX + chimneyW) + " " + chimneyBottomY
    });
    var chimneyCap = el("path", {
      class: "bp-sketch-path bp-house-detail",
      d:
        "M" + (chimneyX - chimneyW * 0.4) + " " + chimneyTopY +
        " L" + (chimneyX + chimneyW * 1.25) + " " + chimneyTopY
    });

    var details = [ridgeCap, foundation, window1, window2, door, doorKnob, chimney, chimneyCap];
    [outline].concat(details).forEach(function (node) {
      group.appendChild(node);
    });

    return { outline: outline, details: details };
  }

  function buildTraceLine(group) {
    var d = "M-20 520";
    var points = [
      [120, 500], [260, 535], [420, 495], [600, 530],
      [780, 500], [940, 528], [1100, 500], [1220, 518]
    ];
    points.forEach(function (p) {
      d += " L" + p[0] + " " + p[1];
    });
    var path = el("path", { class: "bp-trace-line", d: d });
    group.appendChild(path);
    return path;
  }

  function buildDots(group, dotSpecs) {
    return dotSpecs.map(function (spec) {
      var dot = el("circle", {
        class: "bp-dot",
        cx: spec[0],
        cy: spec[1],
        r: spec[2]
      });
      group.appendChild(dot);
      return dot;
    });
  }

  // Builds the animated "logo story" mark. Rather than just fading the crest
  // image in and out, it sketches the crest's own iconography piece by
  // piece -- two canopies leaning together, a house roofline peeking
  // between them, trunks tapering into a single rising arrow, growth bars
  // standing on that arrow, and a person beside them -- inside a gold
  // shield ring, then crossfades into the real logo artwork once the story
  // is told.
  function renderLogoStory(container) {
    var src = container.getAttribute("data-logo-src");
    if (!src) return null;

    var glow = document.createElement("div");
    glow.className = "hero-logo-glow";
    container.appendChild(glow);

    var svg = el("svg", {
      class: "hero-logo-fx hero-logo-story-svg",
      viewBox: "0 0 " + LOGO_VIEW_W + " " + LOGO_VIEW_H,
      "aria-hidden": "true",
      focusable: "false"
    });

    var ring = el("path", {
      class: "hero-logo-ring",
      d:
        "M24 34 Q24 16 44 16 L183 16 Q203 16 203 34" +
        " L203 118 Q203 176 113 226 Q23 176 23 118 Z"
    });

    var leftTrunk = el("path", { class: "hero-crest-trunk", d: "M56 79 C 51 101, 45 113, 39 129" });
    var rightTrunk = el("path", { class: "hero-crest-trunk", d: "M171 79 C 176 101, 172 111, 166 122" });

    var leftLeaves = LEFT_TREE_LEAVES.map(function (leaf) {
      return el("circle", { class: "hero-crest-leaf", cx: leaf[0], cy: leaf[1], r: leaf[2] });
    });
    var rightLeaves = RIGHT_TREE_LEAVES.map(function (leaf) {
      return el("circle", { class: "hero-crest-leaf", cx: leaf[0], cy: leaf[1], r: leaf[2] });
    });

    var roof = el("path", { class: "hero-crest-house", d: "M89 97 L113 73 L137 97" });
    var windowGlyph = el("path", {
      class: "hero-crest-house",
      d: "M102 99 L102 113 L124 113 L124 99 M113 99 L113 113 M102 106 L124 106"
    });

    var bars = CREST_BARS.map(function (bar) {
      return el("rect", {
        class: "hero-crest-bar",
        x: bar.x,
        y: CREST_BAR_BASE_Y - bar.h,
        width: bar.w,
        height: bar.h
      });
    });

    var arrow = el("path", {
      class: "hero-crest-arrow",
      d: "M28 191 Q68 177 98 166 Q131 154 150 131"
    });
    var arrowHead = el("path", { class: "hero-crest-arrow", d: "M138 124 L152 129 L146 143" });

    var personHead = el("circle", { class: "hero-crest-person", cx: 191, cy: 167, r: 7.5 });
    var personBody = el("path", {
      class: "hero-crest-person",
      d: "M178 182 Q191 175 204 182 L204 221 Q191 227 178 221 Z"
    });

    [ring, leftTrunk, rightTrunk]
      .concat(leftLeaves, rightLeaves, [roof, windowGlyph])
      .concat(bars, [arrow, arrowHead, personHead, personBody])
      .forEach(function (node) {
        svg.appendChild(node);
      });
    container.appendChild(svg);

    var img = document.createElement("img");
    img.className = "hero-logo-mark";
    img.src = src;
    img.alt = "";
    container.appendChild(img);

    return {
      glow: glow,
      ring: ring,
      img: img,
      leftTrunk: leftTrunk,
      rightTrunk: rightTrunk,
      leftLeaves: leftLeaves,
      rightLeaves: rightLeaves,
      roof: roof,
      windowGlyph: windowGlyph,
      bars: bars,
      arrow: [arrow, arrowHead],
      person: [personHead, personBody],
      sketchGroup: [ring, leftTrunk, rightTrunk]
        .concat(leftLeaves, rightLeaves, [roof, windowGlyph])
        .concat(bars, [arrow, arrowHead, personHead, personBody])
    };
  }

  function animateLogoStatic(logo) {
    if (!logo) return;
    logo.img.style.clipPath = "none";
    logo.img.style.opacity = "1";
    logo.img.style.transform = "none";
    logo.glow.style.opacity = "0.45";
    logo.sketchGroup.forEach(function (node) {
      node.style.opacity = "0";
    });
  }

  function animateLogoWithGsap(logo) {
    var gsap = window.gsap;
    var drawn = [logo.ring, logo.leftTrunk, logo.rightTrunk, logo.roof, logo.windowGlyph]
      .concat(logo.arrow);
    var drawnLens = drawn.map(function (path) {
      return path.getTotalLength();
    });

    gsap.set(drawn, {
      strokeDasharray: function (i) { return drawnLens[i]; },
      strokeDashoffset: function (i) { return drawnLens[i]; }
    });
    gsap.set(logo.sketchGroup, { opacity: 0 });
    gsap.set(logo.leftLeaves.concat(logo.rightLeaves), { scale: 0, transformOrigin: "50% 50%" });
    gsap.set(logo.bars, { scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set(logo.person, { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" });
    gsap.set(logo.img, { clipPath: "inset(100% 0% 0% 0%)", opacity: 0, scale: 0.94, transformOrigin: "50% 100%" });
    gsap.set(logo.glow, { opacity: 0, scale: 1, transformOrigin: "50% 50%" });

    // Slow independent halo breathing, running the whole time regardless of
    // where the main story loop currently is.
    gsap.to(logo.glow, { scale: 1.1, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 });

    // Plays once -- the crest tells its story on load and then rests on
    // the finished brand mark, rather than looping indefinitely.
    var tl = gsap.timeline({ delay: 0.6 });

    // The shield frame draws first -- everything that follows is sketched
    // inside it.
    tl.to(logo.glow, { opacity: 1, duration: 0.7, ease: "sine.out" }, 0)
      .set(logo.ring, { opacity: 1 }, 0.1)
      .to(logo.ring, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.1);

    // Two trees grow together, branch by branch: trunks first, then their
    // canopies bloom leaf by leaf.
    tl.set([logo.leftTrunk, logo.rightTrunk], { opacity: 1 }, 1.0)
      .to([logo.leftTrunk, logo.rightTrunk], { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, 1.0);

    var leafPairs = logo.leftLeaves.length;
    for (var i = 0; i < leafPairs; i++) {
      var leafStart = 1.35 + i * 0.1;
      tl.to([logo.leftLeaves[i], logo.rightLeaves[i]], { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, leafStart);
    }

    // The home they grew for peeks through between the two canopies.
    var houseStart = 1.35 + leafPairs * 0.1 + 0.25;
    tl.set([logo.roof, logo.windowGlyph], { opacity: 1 }, houseStart)
      .to(logo.roof, { strokeDashoffset: 0, duration: 0.4, ease: "power1.out" }, houseStart)
      .to(logo.windowGlyph, { strokeDashoffset: 0, duration: 0.35, ease: "power1.out" }, houseStart + 0.3);

    // Financial progress: the bars rise one at a time.
    var barsStart = houseStart + 0.7;
    tl.set(logo.bars, { opacity: 0.92 }, barsStart).to(
      logo.bars,
      { scaleY: 1, duration: 0.4, ease: "power2.out", stagger: 0.14 },
      barsStart
    );

    // The upward arrow connects the foundation to opportunity.
    var arrowStart = barsStart + 0.65;
    tl.set(logo.arrow, { opacity: 1 }, arrowStart)
      .to(logo.arrow, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }, arrowStart);

    // Behind every mortgage is a person with a goal.
    var personStart = arrowStart + 0.55;
    tl.to(logo.person, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, personStart);

    // Hold the fully hand-drawn crest for a beat, then let the real
    // artwork take over -- the story settling into the finished brand mark.
    var holdStart = personStart + 0.9;
    var crossfadeStart = holdStart + 1.1;
    tl.to(logo.sketchGroup, { opacity: 0, duration: 0.6, ease: "sine.in" }, crossfadeStart)
      .to(
        logo.img,
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        crossfadeStart
      );

    // That's it -- the timeline ends here and simply rests on the real
    // logo artwork (still gently breathing via the independent glow tween
    // above) instead of erasing and repeating.
  }

  function renderScene(container) {
    var variant = container.getAttribute("data-scene-variant") || "full";
    var svg = el("svg", {
      class: "bp-scene-svg",
      viewBox: "0 0 " + VIEW_W + " " + VIEW_H,
      preserveAspectRatio: "xMidYMax slice",
      "aria-hidden": "true",
      focusable: "false"
    });

    var backGroup = el("g", { class: "bp-layer bp-skyline-back" });
    var frontGroup = el("g", { class: "bp-layer bp-skyline-front" });
    var traceGroup = el("g", { class: "bp-layer bp-trace" });
    var houseGroup = el("g", { class: "bp-layer bp-house" });
    var dotsGroup = el("g", { class: "bp-layer bp-dots" });

    var houseSketch;
    var tracePath;
    var dots;

    if (variant === "compact") {
      houseSketch = buildHouseSketch(houseGroup, 980, 470, 150, 90, 70);
      dots = buildDots(dotsGroup, DOTS_COMPACT);
      svg.appendChild(houseGroup);
      svg.appendChild(dotsGroup);
    } else {
      buildSkylineRow(backGroup, BACK_BUILDINGS, 640, { class: "bp-back-building" }, false);
      buildSkylineRow(frontGroup, FRONT_BUILDINGS, 690, { class: "bp-front-building" }, true);
      tracePath = buildTraceLine(traceGroup);
      houseSketch = buildHouseSketch(houseGroup, 900, 480, 220, 140, 120);
      dots = buildDots(dotsGroup, DOTS_FULL);

      svg.appendChild(backGroup);
      svg.appendChild(frontGroup);
      svg.appendChild(traceGroup);
      svg.appendChild(houseGroup);
      svg.appendChild(dotsGroup);
    }

    container.appendChild(svg);

    return {
      variant: variant,
      backGroup: backGroup,
      frontGroup: frontGroup,
      tracePath: tracePath,
      houseSketch: houseSketch,
      dots: dots
    };
  }

  function animateStatic(scene) {
    // No GSAP / reduced motion: leave the sketch fully drawn and dots at a
    // gentle resting opacity so the scene still reads as a finished
    // illustration, just without motion.
    if (scene.houseSketch) {
      scene.houseSketch.outline.style.strokeDasharray = "none";
      scene.houseSketch.details.forEach(function (path) {
        path.style.strokeDasharray = "none";
      });
    }
    if (scene.dots) {
      scene.dots.forEach(function (dot) {
        dot.style.opacity = "0.4";
      });
    }
    if (scene.tracePath) {
      scene.tracePath.style.strokeDasharray = "none";
    }
  }

  function animateWithGsap(scene, container) {
    var gsap = window.gsap;

    if (scene.variant === "full") {
      gsap.to(scene.backGroup, { x: -VIEW_W, duration: 90, ease: "none", repeat: -1 });
      gsap.fromTo(scene.frontGroup, { x: -VIEW_W }, { x: 0, duration: 65, ease: "none", repeat: -1 });

      if (scene.tracePath) {
        var traceLen = scene.tracePath.getTotalLength();
        gsap.set(scene.tracePath, { strokeDasharray: traceLen / 4 + " " + traceLen / 4 });
        gsap.to(scene.tracePath, { strokeDashoffset: -traceLen, duration: 14, ease: "none", repeat: -1 });
      }

      if (window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(scene.backGroup, {
          y: 26,
          ease: "none",
          scrollTrigger: { trigger: container, start: "top top", end: "bottom top", scrub: true }
        });
        gsap.to(scene.frontGroup, {
          y: 54,
          ease: "none",
          scrollTrigger: { trigger: container, start: "top top", end: "bottom top", scrub: true }
        });
      }
    }

    // House sketch draws itself in, holds, then un-draws and redraws --
    // a continuous sketch-and-erase loop rather than a one-shot reveal, so
    // the illustration never settles into a finished, static frame.
    var outline = scene.houseSketch.outline;
    var details = scene.houseSketch.details;
    var outlineLen = outline.getTotalLength();
    var detailLens = details.map(function (path) {
      return path.getTotalLength();
    });

    gsap.set(outline, { strokeDasharray: outlineLen, strokeDashoffset: outlineLen, opacity: 1 });
    details.forEach(function (path, i) {
      gsap.set(path, { strokeDasharray: detailLens[i], strokeDashoffset: detailLens[i], opacity: 1 });
    });

    var tl = gsap.timeline({ repeat: -1, delay: 0.3 });
    tl.to(outline, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" });
    details.forEach(function (path, i) {
      tl.to(path, { strokeDashoffset: 0, duration: 0.4, ease: "power1.out" }, 1.3 + i * 0.11);
    });
    // Hold the finished sketch on screen for a while before erasing it.
    tl.to({}, { duration: 3.4 });
    tl.to(details.slice().reverse(), {
      strokeDashoffset: function (i) {
        return detailLens[details.length - 1 - i];
      },
      duration: 0.35,
      ease: "power1.in",
      stagger: 0.09
    });
    tl.to(outline, { strokeDashoffset: -outlineLen, duration: 1.3, ease: "power2.in" }, "-=0.2");
    // Brief blank pause before the sketch begins again.
    tl.to({}, { duration: 1.1 });
    tl.set(outline, { strokeDashoffset: outlineLen });
    details.forEach(function (path, i) {
      tl.set(path, { strokeDashoffset: detailLens[i] });
    });

    // Very slow, barely-there breathing on top of the draw/erase cycle so
    // the held sketch still feels alive rather than perfectly frozen.
    gsap.to([outline].concat(details), {
      opacity: 0.72,
      duration: 3.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Floating accent dots: fade in, drift up, fade out, on independent
    // staggered loops so the scatter never reads as one synchronized cycle.
    scene.dots.forEach(function (dot) {
      gsap.set(dot, { opacity: 0, transformOrigin: "50% 50%" });
      var dotTl = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 5) });
      dotTl
        .to(dot, { opacity: gsap.utils.random(0.32, 0.62), duration: 1.4, ease: "sine.out" })
        .to(dot, { y: "-=" + gsap.utils.random(28, 64), duration: gsap.utils.random(3.5, 6.5), ease: "sine.inOut" }, "<")
        .to(dot, { opacity: 0, duration: 1.4, ease: "sine.in" }, "-=1.4")
        .set(dot, { y: "+=" + gsap.utils.random(28, 64) });
    });
  }

  function init() {
    var containers = document.querySelectorAll(".hero-blueprint-scene");
    var hasGsap = typeof window.gsap !== "undefined";

    containers.forEach(function (container) {
      var scene = renderScene(container);

      if (reduceMotion || !hasGsap) {
        animateStatic(scene);
        return;
      }

      animateWithGsap(scene, container);
    });

    var logoContainers = document.querySelectorAll(".hero-logo-story");
    logoContainers.forEach(function (container) {
      var logo = renderLogoStory(container);
      if (!logo) return;

      if (reduceMotion || !hasGsap) {
        animateLogoStatic(logo);
        return;
      }

      animateLogoWithGsap(logo);
    });

    // The homepage hero's real skyline video: honour reduced-motion by
    // dropping autoplay/loop and just showing the poster frame instead of
    // fighting the browser's own autoplay throttling.
    var bgVideo = document.querySelector(".hero-bg-video");
    if (bgVideo) {
      if (reduceMotion) {
        bgVideo.removeAttribute("autoplay");
        bgVideo.removeAttribute("loop");
        bgVideo.pause();
      } else {
        var playPromise = bgVideo.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(function () {
            /* Autoplay blocked -- the poster frame still shows, so no harm done. */
          });
        }
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
