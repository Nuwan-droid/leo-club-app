import { useEffect, useState, useRef } from "react";

const Stat = ({ end, label, Icon }) => {
  const [count, setCount] = useState();
  const currentRef = useRef(0);
  const startTimeRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (isNaN(end) || end <= 0) {
      return;
    }

    const duration = 5000;

    const step = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      currentRef.current = progress * end;
      setCount(Math.ceil(currentRef.current));

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      startTimeRef.current = null;
    };
  }, [end]);

  return (
    <div className="flex flex-col items-center justify-center text-center ">
      {Icon && <Icon className="w-10 h-10 text-blue-600 mb-2" />}
      <span className="text-3xl font-extrabold text-gray-900">{count}</span>
      <span className="text-md font-medium text-gray-600">{label}</span>
    </div>
  );
};

export default Stat;
