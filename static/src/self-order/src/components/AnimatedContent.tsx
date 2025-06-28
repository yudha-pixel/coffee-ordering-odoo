import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  delay?: number;
  isExiting: boolean;
  onExitComplete: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  delay = 0,
  isExiting,
  onExitComplete,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const axis = direction === "horizontal" ? "x" : "y";
  const offset = reverse ? -distance : distance;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Entrance Animation
    gsap.fromTo(el,
        { [axis]: offset, scale, opacity: animateOpacity ? initialOpacity : 1 },
        {
            [axis]: 0,
            scale: 1,
            opacity: 1,
            duration,
            ease,
            delay,
        }
    );
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (isExiting && el) {
        // Exit Animation
        gsap.to(el, {
            [axis]: offset,
            opacity: animateOpacity ? initialOpacity : 1,
            duration: duration * 0.7, // Make exit slightly faster
            ease: "power3.in",
            onComplete: onExitComplete,
        });
    }
  }, [isExiting, onExitComplete, axis, offset, duration, ease, animateOpacity, initialOpacity]);

  return <div className="w-full h-full" ref={ref}>{children}</div>;
};

export default AnimatedContent;