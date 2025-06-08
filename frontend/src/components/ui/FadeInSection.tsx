import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function FadeInSection({ children }: { children: React.ReactNode }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,     
    threshold: 0.2    
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}
    >
      {children}
    </motion.div>
  );
}