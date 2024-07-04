import { motion, useDragControls, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function DraggableRow({ children }: Props) {
  const x = useMotionValue(0);
  const controls = useDragControls();
  const divRef = useRef<HTMLDivElement>(null);

  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    if (divRef.current) {
      if (divRef.current.scrollWidth > divRef.current.clientWidth) {
        setParentWidth(
          divRef.current.scrollWidth - divRef.current.clientWidth + 12
        );
      } else {
        setParentWidth(divRef.current.scrollWidth - divRef.current.clientWidth);
      }
    }
  }, [divRef]);

  return (
    <div
      ref={divRef}
      className="pl-3 max-w-xl mx-auto w-full relative overflow-hidden"
    >
      <motion.div
        drag="x"
        style={{ x }}
        dragControls={controls}
        dragConstraints={{ right: 0, left: -parentWidth }}
        className="flex gap-2 cursor-grab items-center active:cursor-grabbing touch-none"
      >
        {children}
      </motion.div>
    </div>
  );
}
