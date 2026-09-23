/* Hero blueprint/skyline scene — ported near-verbatim from the static site's
   public/assets/hero-blueprint-scene.js (GSAP + ScrollTrigger line-art hero
   decoration). Logic/choreography unchanged; only the module wrapper, GSAP
   import (instead of window.gsap globals), and an init/destroy split for
   React mount/unmount were adapted. See that file's original header comment
   for the full design description. */
/* eslint-disable @typescript-eslint/no-explicit-any */

let gsapRef: any = null;
let scrollTriggerRef: any = null;

const SVG_NS = "http://www.w3.org/2000/svg";
const VIEW_W = 1200;
const VIEW_H = 700;

const BACK_BUILDINGS = [
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
  { x: 1096, w: 60, h: 120, pitched: true },
];

const FRONT_BUILDINGS = [
  { x: 20, w: 120, h: 60, pitched: true },
  { x: 170, w: 80, h: 40, pitched: false },
  { x: 280, w: 140, h: 80, pitched: true },
  { x: 460, w: 90, h: 50, pitched: false },
  { x: 580, w: 130, h: 70, pitched: true },
  { x: 760, w: 100, h: 45, pitched: false },
  { x: 900, w: 150, h: 85, pitched: true },
  { x: 1090, w: 90, h: 55, pitched: false },
];

const DOTS_FULL: Array<[number, number, number]> = [
  [140, 120, 3.2], [260, 210, 2.4], [360, 90, 3], [520, 160, 2.6],
  [610, 260, 3.4], [760, 110, 2.4], [860, 190, 3], [980, 130, 2.6],
  [1080, 240, 3.2], [200, 320, 2.4], [660, 340, 2.8], [940, 320, 2.4],
  [420, 240, 2.6], [1140, 160, 3],
];

const DOTS_COMPACT: Array<[number, number, number]> = [
  [960, 110, 2.6], [1040, 210, 3], [1120, 150, 2.4],
  [880, 260, 2.6], [1000, 320, 2.4],
];

function svgEl(tag: string, attrs: Record<string, any>): SVGElement {
  const node = document.createElementNS(SVG_NS, tag);
  for (const key in attrs) {
    if (Object.prototype.hasOwnProperty.call(attrs, key)) {
      node.setAttribute(key, String(attrs[key]));
    }
  }
  return node;
}

function appendHouse(
  group: SVGElement,
  x: number,
  w: number,
  h: number,
  baseY: number,
  pitched: boolean,
  extra: Record<string, any>,
  withWindows: boolean
) {
  const top = baseY - h;
  group.appendChild(svgEl("rect", { x, y: top, width: w, height: h, ...extra }));

  if (pitched) {
    const roofH = w * 0.42;
    const overhang = w * 0.06;
    group.appendChild(
      svgEl("path", {
        d: `M${x - overhang} ${top} L${x + w / 2} ${top - roofH} L${x + w + overhang} ${top} Z`,
        "stroke-linejoin": "round",
        ...extra,
      })
    );
  } else if (w > 70) {
    const capOverhang = w * 0.05;
    group.appendChild(
      svgEl("rect", { x: x - capOverhang, y: top - 4, width: w + capOverhang * 2, height: 4, ...extra })
    );
  }

  if (withWindows && w > 55 && h > 40) {
    const cols = w > 110 ? 4 : w > 80 ? 3 : 2;
    const rows = Math.max(2, Math.min(5, Math.round(h / 34)));
    const padX = w * 0.14;
    const padTop = pitched ? h * 0.28 : h * 0.16;
    const padBottom = h * 0.1;
    const gridW = w - padX * 2;
    const gridH = h - padTop - padBottom;
    const winW = (gridW / cols) * 0.58;
    const winH = (gridH / rows) * 0.58;
    const gapX = gridW / cols;
    const gapY = gridH / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        group.appendChild(
          svgEl("rect", {
            x: x + padX + c * gapX + (gapX - winW) / 2,
            y: top + padTop + r * gapY + (gapY - winH) / 2,
            width: winW,
            height: winH,
            class: "bp-building-window",
          })
        );
      }
    }
  }
}

function buildSkylineRow(
  group: SVGElement,
  buildings: Array<{ x: number; w: number; h: number; pitched: boolean }>,
  baseY: number,
  extra: Record<string, any>,
  withWindows: boolean
) {
  [0, VIEW_W].forEach((offset) => {
    buildings.forEach((b) => {
      appendHouse(group, offset + b.x, b.w, b.h, baseY, b.pitched, extra, withWindows);
    });
  });
}

function buildHouseSketch(group: SVGElement, cx: number, groundY: number, w: number, wallH: number, roofH: number) {
  const left = cx - w / 2;
  const right = cx + w / 2;
  const eaveY = groundY - wallH;
  const apexY = eaveY - roofH;
  const overhang = w * 0.09;

  const outline = svgEl("path", {
    class: "bp-sketch-path bp-house-outline",
    d:
      `M${left} ${groundY}` +
      ` L${left} ${eaveY}` +
      ` L${left - overhang} ${eaveY}` +
      ` L${cx} ${apexY}` +
      ` L${right + overhang} ${eaveY}` +
      ` L${right} ${eaveY}` +
      ` L${right} ${groundY}`,
  });

  const ridgeCap = svgEl("path", {
    class: "bp-sketch-path bp-house-detail",
    d: `M${left - overhang * 0.55} ${eaveY - roofH * 0.06} L${cx} ${apexY - roofH * 0.05}`,
  });

  const foundation = svgEl("path", {
    class: "bp-sketch-path bp-house-detail",
    d: `M${left - overhang * 0.7} ${groundY} L${right + overhang * 0.7} ${groundY}`,
  });

  const doorX = cx - w * 0.085;
  const doorY = groundY - wallH * 0.54;
  const doorW = w * 0.17;
  const doorH = wallH * 0.54;
  const door = svgEl("path", {
    class: "bp-sketch-path bp-house-detail",
    d:
      `M${doorX} ${groundY} L${doorX} ${doorY}` +
      ` L${doorX + doorW} ${doorY} L${doorX + doorW} ${groundY}` +
      ` M${doorX + doorW / 2} ${doorY} L${doorX + doorW / 2} ${groundY}`,
  });
  const doorKnob = svgEl("circle", {
    class: "bp-sketch-path bp-house-detail",
    cx: doorX + doorW * 0.78,
    cy: groundY - doorH * 0.46,
    r: Math.max(1.4, w * 0.006),
  });

  function mullionedWindow(wx: number, wy: number, ww: number, wh: number) {
    return svgEl("path", {
      class: "bp-sketch-path bp-house-detail",
      d:
        `M${wx} ${wy} L${wx} ${wy + wh} L${wx + ww} ${wy + wh}` +
        ` L${wx + ww} ${wy} Z` +
        ` M${wx} ${wy + wh / 2} L${wx + ww} ${wy + wh / 2}` +
        ` M${wx + ww / 2} ${wy} L${wx + ww / 2} ${wy + wh}`,
    });
  }

  const window1 = mullionedWindow(left + w * 0.14, eaveY + wallH * 0.15, w * 0.17, wallH * 0.24);
  const window2 = mullionedWindow(right - w * 0.31, eaveY + wallH * 0.15, w * 0.17, wallH * 0.24);

  const chimneyX = cx + w * 0.19;
  const chimneyTopY = apexY + roofH * 0.16;
  const chimneyBottomY = apexY + roofH * 0.62;
  const chimneyW = w * 0.075;
  const chimney = svgEl("path", {
    class: "bp-sketch-path bp-house-detail",
    d:
      `M${chimneyX - chimneyW * 0.18} ${chimneyBottomY}` +
      ` L${chimneyX - chimneyW * 0.18} ${chimneyTopY}` +
      ` L${chimneyX + chimneyW} ${chimneyTopY}` +
      ` L${chimneyX + chimneyW} ${chimneyBottomY}`,
  });
  const chimneyCap = svgEl("path", {
    class: "bp-sketch-path bp-house-detail",
    d: `M${chimneyX - chimneyW * 0.4} ${chimneyTopY} L${chimneyX + chimneyW * 1.25} ${chimneyTopY}`,
  });

  const details = [ridgeCap, foundation, window1, window2, door, doorKnob, chimney, chimneyCap];
  [outline, ...details].forEach((node) => group.appendChild(node));

  return { outline, details };
}

function buildTraceLine(group: SVGElement) {
  let d = "M-20 520";
  const points: Array<[number, number]> = [
    [120, 500], [260, 535], [420, 495], [600, 530],
    [780, 500], [940, 528], [1100, 500], [1220, 518],
  ];
  points.forEach((p) => {
    d += ` L${p[0]} ${p[1]}`;
  });
  const path = svgEl("path", { class: "bp-trace-line", d });
  group.appendChild(path);
  return path;
}

function buildDots(group: SVGElement, dotSpecs: Array<[number, number, number]>) {
  return dotSpecs.map((spec) => {
    const dot = svgEl("circle", { class: "bp-dot", cx: spec[0], cy: spec[1], r: spec[2] });
    group.appendChild(dot);
    return dot;
  });
}

const LOGO_PIECES = [
  { key: "shield", file: "shield.png", left: 8.4, top: 8.3, width: 84.1, height: 85.5, origin: "50% 50%" },
  { key: "leftTree", file: "left-tree.png", left: 14, top: 12, width: 36, height: 37, origin: "50% 100%" },
  { key: "rightTree", file: "right-tree.png", left: 50, top: 12, width: 36, height: 37, origin: "50% 100%" },
  { key: "house", file: "house.png", left: 42, top: 25, width: 17, height: 13, origin: "50% 50%" },
  { key: "bars", file: "bar-chart.png", left: 51, top: 45, width: 17, height: 11, origin: "50% 100%" },
  { key: "arrow", file: "growth-arrow.png", left: 22, top: 44, width: 46, height: 14, origin: "0% 100%" },
  { key: "person", file: "human-figure.png", left: 68, top: 38, width: 10, height: 18, origin: "50% 100%" },
];

function renderLogoStory(container: HTMLElement) {
  const src = container.getAttribute("data-logo-src");
  if (!src) return null;

  const basePath = src.slice(0, src.lastIndexOf("/") + 1) + "logo-elements/";

  const glow = document.createElement("div");
  glow.className = "hero-logo-glow";
  container.appendChild(glow);

  const pieces: Record<string, HTMLImageElement> = {};
  LOGO_PIECES.forEach((spec) => {
    const pieceImg = document.createElement("img");
    pieceImg.className = `hero-logo-piece hero-logo-piece--${spec.key}`;
    pieceImg.src = basePath + spec.file;
    pieceImg.alt = "";
    pieceImg.style.left = `${spec.left}%`;
    pieceImg.style.top = `${spec.top}%`;
    pieceImg.style.width = `${spec.width}%`;
    pieceImg.style.height = `${spec.height}%`;
    pieceImg.style.transformOrigin = spec.origin;
    container.appendChild(pieceImg);
    pieces[spec.key] = pieceImg;
  });

  const img = document.createElement("img");
  img.className = "hero-logo-mark";
  img.src = src;
  img.alt = "";
  container.appendChild(img);

  return {
    glow,
    img,
    shield: pieces.shield,
    leftTree: pieces.leftTree,
    rightTree: pieces.rightTree,
    house: pieces.house,
    bars: pieces.bars,
    arrow: pieces.arrow,
    person: pieces.person,
    sketchGroup: [pieces.shield, pieces.leftTree, pieces.rightTree, pieces.house, pieces.bars, pieces.arrow, pieces.person],
  };
}

function animateLogoStatic(logo: NonNullable<ReturnType<typeof renderLogoStory>>) {
  logo.img.style.clipPath = "none";
  logo.img.style.opacity = "1";
  logo.img.style.transform = "none";
  logo.glow.style.opacity = "0.45";
  logo.sketchGroup.forEach((node) => {
    node.style.opacity = "0";
  });
}

function animateLogoWithGsap(logo: NonNullable<ReturnType<typeof renderLogoStory>>) {
  const gsap = gsapRef;

  gsap.set(logo.sketchGroup, { opacity: 0 });
  gsap.set(logo.shield, { opacity: 0, scale: 0.88, transformOrigin: "50% 50%" });
  gsap.set([logo.leftTree, logo.rightTree], { opacity: 0, scale: 0.4, y: 10 });
  gsap.set(logo.house, { opacity: 0, scale: 0.5, y: -6 });
  gsap.set(logo.bars, { opacity: 0, scaleY: 0 });
  gsap.set(logo.arrow, { opacity: 0, scaleX: 0 });
  gsap.set(logo.person, { opacity: 0, scale: 0.6, y: 8 });
  gsap.set(logo.img, { clipPath: "inset(100% 0% 0% 0%)", opacity: 0, scale: 0.94, transformOrigin: "50% 100%" });
  gsap.set(logo.glow, { opacity: 0, scale: 1, transformOrigin: "50% 50%" });

  gsap.to(logo.glow, { scale: 1.1, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 });

  const tl = gsap.timeline({ delay: 0.6 });

  tl.to(logo.glow, { opacity: 1, duration: 0.7, ease: "sine.out" }, 0).to(
    logo.shield,
    { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
    0.1
  );

  const treesStart = 0.75;
  tl.to(
    [logo.leftTree, logo.rightTree],
    { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.6)", stagger: 0.12 },
    treesStart
  );

  const houseStart = treesStart + 0.65;
  tl.to(logo.house, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power2.out" }, houseStart);

  const barsStart = houseStart + 0.45;
  tl.to(logo.bars, { opacity: 1, scaleY: 1, duration: 0.45, ease: "power2.out" }, barsStart);

  const arrowStart = barsStart + 0.35;
  tl.to(logo.arrow, { opacity: 1, scaleX: 1, duration: 0.55, ease: "power2.out" }, arrowStart);

  const personStart = arrowStart + 0.4;
  tl.to(logo.person, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" }, personStart);

  const holdStart = personStart + 0.9;
  const crossfadeStart = holdStart + 1.1;

  tl.to(
    [logo.person, logo.arrow, logo.bars, logo.house, logo.leftTree, logo.rightTree],
    { opacity: 0, y: "-=4", scale: "*=0.97", duration: 0.55, ease: "sine.in", stagger: 0.045 },
    crossfadeStart
  )
    .to(logo.img, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1, duration: 1.15, ease: "power2.out" }, crossfadeStart + 0.08)
    .to(logo.glow, { opacity: 1, scale: 1.22, duration: 0.4, ease: "sine.out" }, crossfadeStart + 0.5)
    .to(logo.glow, { scale: 1.1, duration: 0.6, ease: "sine.inOut" }, crossfadeStart + 0.9);
}

function renderScene(container: HTMLElement) {
  const variant = container.getAttribute("data-scene-variant") || "full";
  const svg = svgEl("svg", {
    class: "bp-scene-svg",
    viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
    preserveAspectRatio: "xMidYMax slice",
    "aria-hidden": "true",
    focusable: "false",
  });

  const backGroup = svgEl("g", { class: "bp-layer bp-skyline-back" });
  const frontGroup = svgEl("g", { class: "bp-layer bp-skyline-front" });
  const traceGroup = svgEl("g", { class: "bp-layer bp-trace" });
  const houseGroup = svgEl("g", { class: "bp-layer bp-house" });
  const dotsGroup = svgEl("g", { class: "bp-layer bp-dots" });

  let houseSketch;
  let tracePath;
  let dots;

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

  return { variant, backGroup, frontGroup, tracePath, houseSketch, dots };
}

function animateStatic(scene: ReturnType<typeof renderScene>) {
  if (scene.houseSketch) {
    (scene.houseSketch.outline as SVGElement).style.strokeDasharray = "none";
    scene.houseSketch.details.forEach((path) => {
      (path as SVGElement).style.strokeDasharray = "none";
    });
  }
  if (scene.dots) {
    scene.dots.forEach((dot) => {
      (dot as SVGElement).style.opacity = "0.4";
    });
  }
  if (scene.tracePath) {
    (scene.tracePath as SVGElement).style.strokeDasharray = "none";
  }
}

function animateWithGsap(scene: ReturnType<typeof renderScene>, container: HTMLElement) {
  const gsap = gsapRef;

  if (scene.variant === "full") {
    gsap.to(scene.backGroup, { x: -VIEW_W, duration: 90, ease: "none", repeat: -1 });
    gsap.fromTo(scene.frontGroup, { x: -VIEW_W }, { x: 0, duration: 65, ease: "none", repeat: -1 });

    if (scene.tracePath) {
      const traceLen = (scene.tracePath as SVGGeometryElement).getTotalLength();
      gsap.set(scene.tracePath, { strokeDasharray: `${traceLen / 4} ${traceLen / 4}` });
      gsap.to(scene.tracePath, { strokeDashoffset: -traceLen, duration: 14, ease: "none", repeat: -1 });
    }

    if (scrollTriggerRef) {
      gsap.to(scene.backGroup, {
        y: 26,
        ease: "none",
        scrollTrigger: { trigger: container, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(scene.frontGroup, {
        y: 54,
        ease: "none",
        scrollTrigger: { trigger: container, start: "top top", end: "bottom top", scrub: true },
      });
    }
  }

  const outline = scene.houseSketch.outline as SVGGeometryElement;
  const details = scene.houseSketch.details as unknown as SVGGeometryElement[];
  const outlineLen = outline.getTotalLength();
  const detailLens = details.map((path) => path.getTotalLength());

  gsap.set(outline, { strokeDasharray: outlineLen, strokeDashoffset: outlineLen, opacity: 1 });
  details.forEach((path, i) => {
    gsap.set(path, { strokeDasharray: detailLens[i], strokeDashoffset: detailLens[i], opacity: 1 });
  });

  const tl = gsap.timeline({ repeat: -1, delay: 0.3 });
  tl.to(outline, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" });
  details.forEach((path, i) => {
    tl.to(path, { strokeDashoffset: 0, duration: 0.4, ease: "power1.out" }, 1.3 + i * 0.11);
  });
  tl.to({}, { duration: 3.4 });
  tl.to(details.slice().reverse(), {
    strokeDashoffset: (i: number) => detailLens[details.length - 1 - i],
    duration: 0.35,
    ease: "power1.in",
    stagger: 0.09,
  });
  tl.to(outline, { strokeDashoffset: -outlineLen, duration: 1.3, ease: "power2.in" }, "-=0.2");
  tl.to({}, { duration: 1.1 });
  tl.set(outline, { strokeDashoffset: outlineLen });
  details.forEach((path, i) => {
    tl.set(path, { strokeDashoffset: detailLens[i] });
  });

  gsap.to([outline, ...details], { opacity: 0.72, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

  scene.dots?.forEach((dot) => {
    gsap.set(dot, { opacity: 0, transformOrigin: "50% 50%" });
    const dotTl = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 5) });
    dotTl
      .to(dot, { opacity: gsap.utils.random(0.32, 0.62), duration: 1.4, ease: "sine.out" })
      .to(dot, { y: `-=${gsap.utils.random(28, 64)}`, duration: gsap.utils.random(3.5, 6.5), ease: "sine.inOut" }, "<")
      .to(dot, { opacity: 0, duration: 1.4, ease: "sine.in" }, "-=1.4")
      .set(dot, { y: `+=${gsap.utils.random(28, 64)}` });
  });
}

/** Like root.querySelectorAll(selector), but also includes root itself if it matches. */
function queryIncludingSelf(root: HTMLElement, selector: string): HTMLElement[] {
  const results = Array.from(root.querySelectorAll<HTMLElement>(selector));
  if (root.matches(selector)) results.unshift(root);
  return results;
}

/**
 * Initializes the scene inside a specific root element (scoped, not document-wide — required for React mount/unmount).
 * `isStale`, if given, is checked right after the async GSAP import resolves: React's dev-mode Strict Mode mounts
 * every component twice (mount → cleanup → mount again) to surface exactly this kind of bug, and without this guard
 * a slow-resolving first mount can render into `root` *after* the second mount already has, then its own stale
 * completion handler wipes that second mount's content back out. Aborting before touching the DOM once superseded
 * avoids the race entirely — real production builds don't double-invoke effects, so this is a dev-safety guard.
 */
export async function initHeroBlueprintScene(root: HTMLElement, isStale?: () => boolean) {
  const gsapModule = await import("gsap");
  const scrollTriggerModule = await import("gsap/ScrollTrigger");
  if (isStale?.()) return;
  gsapRef = gsapModule.gsap ?? gsapModule.default;
  scrollTriggerRef = scrollTriggerModule.ScrollTrigger;
  gsapRef.registerPlugin(scrollTriggerRef);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // `root` is typically the container itself (each wrapper component's ref points directly at
  // its own .hero-blueprint-scene/.hero-logo-story div), not an ancestor — and querySelectorAll
  // only matches *descendants*, never the element it's called on. Include root itself when it
  // matches, so this still works the same way the original document-wide querySelectorAll did.
  const containers = queryIncludingSelf(root, ".hero-blueprint-scene");
  containers.forEach((container) => {
    const scene = renderScene(container);
    if (reduceMotion) {
      animateStatic(scene);
    } else {
      animateWithGsap(scene, container);
    }
  });

  const logoContainers = queryIncludingSelf(root, ".hero-logo-story");
  logoContainers.forEach((container) => {
    const logo = renderLogoStory(container);
    if (!logo) return;
    if (reduceMotion) {
      animateLogoStatic(logo);
    } else {
      animateLogoWithGsap(logo);
    }
  });
}

/** Honours prefers-reduced-motion for the homepage's hero background video (a sibling of .hero-logo-story, not a descendant, so it's handled separately). */
export function applyReducedMotionToHeroVideo(video: HTMLVideoElement) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    video.removeAttribute("autoplay");
    video.removeAttribute("loop");
    video.pause();
  } else {
    video.play().catch(() => {
      /* Autoplay blocked — the poster frame still shows, so no harm done. */
    });
  }
}

/** Tears down GSAP tweens/ScrollTriggers and injected DOM created by init, for clean unmount on route change. */
export function destroyHeroBlueprintScene(root: HTMLElement) {
  scrollTriggerRef?.getAll().forEach((st: any) => {
    if (root.contains(st.trigger)) st.kill();
  });
  gsapRef?.globalTimeline.getChildren(true, true, false).forEach((tween: any) => {
    const target = tween.targets?.()[0];
    if (target instanceof Node && root.contains(target)) tween.kill();
  });
  root.querySelectorAll<HTMLElement>(".hero-blueprint-scene, .hero-logo-story").forEach((container) => {
    container.innerHTML = "";
  });
}
