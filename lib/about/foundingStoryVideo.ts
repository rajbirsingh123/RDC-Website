/* "Story Behind Our Crest" video — ported near-verbatim from the static site's
   public/assets/founding-story-video.js. Plays the crest-story video automatically once it scrolls
   into view, and pauses it again once it scrolls back out. Respects prefers-reduced-motion by
   leaving playback to the visible controls instead of starting it automatically. */

/** Wires up the autoplay-on-scroll behaviour for a video element; returns a cleanup function. */
export function initFoundingStoryVideo(video: HTMLVideoElement): () => void {
  if (typeof IntersectionObserver === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  let userPaused = false;
  let pausingProgrammatically = false;

  const onPause = () => {
    // The "pause" event fires as an async task, so this can run after
    // pausingProgrammatically has already been reset - clear it here
    // instead of right after the synchronous video.pause() call.
    if (pausingProgrammatically) {
      pausingProgrammatically = false;
      return;
    }
    if (!video.seeking && !video.ended) userPaused = true;
  };
  const onPlay = () => {
    userPaused = false;
  };

  video.addEventListener("pause", onPause);
  video.addEventListener("play", onPlay);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (userPaused || !video.paused) return;
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
              // Autoplay with sound was blocked - retry muted so the video
              // still plays; the visible controls let people unmute it.
              video.muted = true;
              video.play().catch(() => {});
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

  return () => {
    observer.disconnect();
    video.removeEventListener("pause", onPause);
    video.removeEventListener("play", onPlay);
  };
}
