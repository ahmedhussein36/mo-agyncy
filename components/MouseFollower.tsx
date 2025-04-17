// components/MouseFollower.tsx
import { useState, useEffect } from "react";

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #FF7F00, #FFFFFF)", // Orange to White gradient
        opacity: "0.6",
        transform: `translate3d(${position.x - 30}px, ${position.y - 30}px, 0)`,
        transition: "transform 0.1s ease-out",
      
      }}
    ></div>
  );
};

export default MouseFollower;
