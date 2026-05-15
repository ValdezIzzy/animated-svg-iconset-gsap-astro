import gsap from "gsap";

export const sharedTimeline = gsap.timeline();

const iconQueue = /** @type {Array<(tl: import("gsap").core.Timeline) => void>} */ ([]);
let started = false;

/**
 * @param {(tl: import("gsap").core.Timeline) => void} buildAnimation
 */
export function addIconToTimeline(buildAnimation) {
  iconQueue.push(buildAnimation);

  if (iconQueue.length === 1) {
    setTimeout(() => {
      while (iconQueue.length) {
        const build = iconQueue.shift();
        const subTimeline = gsap.timeline();
        build(subTimeline);
        sharedTimeline.add(subTimeline, ">");
      }

      if (!started) {
        started = true;
        sharedTimeline.play(0);
      }
    }, 0);
  }
}
