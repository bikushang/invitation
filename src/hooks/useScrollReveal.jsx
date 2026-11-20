import { useEffect } from 'react';

export function useScrollReveal(depKey) {
  useEffect(() => {
    // Find all animatable elements
    const els = Array.from(
      document.querySelectorAll('[data-anim]:not([data-anim="none"]):not([data-anim="float"])')
    );

    // Function to check visibility in any scrollable parent or window
    function checkVisibility() {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView =
          rect.top < window.innerHeight * 0.95 &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0;

        if (inView) {
          el.setAttribute('data-visible', 'true');
        }
      });
    }

    // Immediately mark visible elements
    checkVisibility();

    // Listen to scroll on window and all builder scroll containers
    const scrollContainers = Array.from(document.querySelectorAll('.builder-scroll, main, body, window'));
    window.addEventListener('scroll', checkVisibility, { passive: true });
    scrollContainers.forEach((c) => c.addEventListener('scroll', checkVisibility, { passive: true }));

    // Fallback: reveal all elements after short delay so nothing is ever permanently hidden
    const timer = setTimeout(() => {
      els.forEach((el) => el.setAttribute('data-visible', 'true'));
    }, 400);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', checkVisibility);
      scrollContainers.forEach((c) => c.removeEventListener('scroll', checkVisibility));
    };
  }, [depKey]);
}

export function revealAll() {
  document
    .querySelectorAll('[data-anim]:not([data-anim="none"]):not([data-anim="float"])')
    .forEach((el) => el.setAttribute('data-visible', 'true'));
}

export function resetAllReveals() {
  document
    .querySelectorAll('[data-anim]:not([data-anim="none"]):not([data-anim="float"])')
    .forEach((el) => el.setAttribute('data-visible', 'false'));
}
