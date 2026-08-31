/* Royal Den Capital - "Story Behind Our Crest" video.
   Plays the crest-story video automatically once it scrolls into view, and
   pauses it again once it scrolls back out. Independent of the GSAP-driven
   section animation so it still works if that script or the CDN fails.
   Respects prefers-reduced-motion by leaving playback to the visible
   controls instead of starting it automatically. */
(function () {
  "use strict";

  var video = document.getElementById("crestStoryVideo");
  if (!video) return;
  if (typeof window.IntersectionObserver === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var userPaused = false;
  var pausingProgrammatically = false;

  video.addEventListener("pause", function () {
    // The "pause" event fires as an async task, so this can run after
    // pausingProgrammatically has already been reset - clear it here
    // instead of right after the synchronous video.pause() call.
    if (pausingProgrammatically) {
      pausingProgrammatically = false;
      return;
    }
    if (!video.seeking && !video.ended) userPaused = true;
  });
  video.addEventListener("play", function () {
    userPaused = false;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (userPaused || !video.paused) return;
          var playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(function () {
              // Autoplay with sound was blocked - retry muted so the video
              // still plays; the visible controls let people unmute it.
              video.muted = true;
              video.play().catch(function () {});
            });
          }
        } else if (!video.paused) {
          pausingProgrammatically = true;
          video.pause();
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(video);
})();
