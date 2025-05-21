import { useEffect, useRef, useState } from "react";

export const useSectionScroll = (sectionCount: number, delay: number = 3000) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      e.preventDefault();

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        Math.max(currentIndexRef.current + direction, 0),
        sectionCount - 1
      );

      if (nextIndex !== currentIndexRef.current) {
        setCurrentIndex(nextIndex);
        isScrolling.current = true;

        container.scrollTo({
          top: nextIndex * window.innerHeight,
          behavior: "smooth",
        });

        scrollTimeout.current = setTimeout(() => {
          isScrolling.current = false;
        }, delay);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [sectionCount, delay]);

  return containerRef;
};
