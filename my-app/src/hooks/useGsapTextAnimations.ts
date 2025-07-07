import { useEffect } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom GSAP animation hook triggered by a flag (e.g., after analysis is submitted).
 * @param shouldAnimate - Boolean to control when animations are initialized.
 */
export function useGsapTextAnimations(shouldAnimate: boolean) {
  useEffect(() => {
    if (!shouldAnimate) return;

    const wrappers = document.querySelectorAll(".animation-wrapper");

    wrappers.forEach(wrapper => {
      // Blur-in animation
      const blurItems = wrapper.querySelectorAll(".blur-in");
      if (blurItems.length > 0) {
        gsap.set(blurItems, {
          autoAlpha: 0,
          filter: "blur(10px)",
        });
        gsap.to(blurItems, {
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.1,
          delay: 1,
          scrollTrigger: {
            trigger: wrapper,
            start: "center bottom-=100",
          },
        });
      }

      // Fly-in animation (word-based)
      const flyItems = wrapper.querySelectorAll(".fly-in");
      if (flyItems.length > 0) {
        flyItems.forEach(item => {
          const element = item as HTMLElement;
          new SplitType(element, { types: "words" });

          const words = element.querySelectorAll(".word") as NodeListOf<HTMLElement>;

          gsap.set(words, {
            autoAlpha: 0,
            y: 30,
          });

          gsap.to(words, {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
            delay: 0.2,
            scrollTrigger: {
              trigger: element,
              start: "center bottom-=100",
            },
          });
        });
      }

      // Mask-in animation
      const maskItems = wrapper.querySelectorAll(".mask-in");
      if (maskItems.length > 0) {
        gsap.set(maskItems, { yPercent: 100 });
        gsap.to(maskItems, {
          yPercent: 0,
          duration: 1,
          stagger: 0.2,
          delay: 0.2,
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom-=100",
          },
        });
      }
    });

    // Optional global fly-in effect based on lines (e.g., paragraphs)
    const flyInLines = document.querySelectorAll(".fly-in-wrapper");
    if (flyInLines.length > 0) {
      new SplitType(".fly-in", { types: "lines" });
      gsap.set(".fly-in .line", {
        autoAlpha: 0,
        y: 30,
      });
      gsap.to(".fly-in .line", {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        delay: 0.2,
      });
    }

    // Cleanup all scroll triggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [shouldAnimate]);
}
