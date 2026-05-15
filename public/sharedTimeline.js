const sharedTimeline = window.gsap.timeline();

const iconQueue = [];
let started = false;

export function addIconToTimeline(buildAnimation) {
  iconQueue.push(buildAnimation);

  if (iconQueue.length === 5) {
    // Ensure all icons are hidden initially
    sharedTimeline.set('.lucide-telescope, .lucide-eclipse, .lucide-rocket, .lucide-astroid, .lucide-orbit', {autoAlpha: 0});

    while (iconQueue.length) {
      const build = iconQueue.shift();
      const subTimeline = window.gsap.timeline();
      build(subTimeline);
      sharedTimeline.add(subTimeline, ">");
    }

    if (!started) {
      started = true;
      sharedTimeline.play(0);
    }
  }
}
