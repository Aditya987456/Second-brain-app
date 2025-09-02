import { useEffect, useRef } from "react";

 export const VideoDemo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Autoplay failed, probably due to browser policy.");
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="auto"
      className="w-full rounded-3xl shadow-xl border-x-4 border-y-2 border-purple-300 ring-1 ring-gray-200 dark:ring-gray-700"
    >
      <source src="/demomp4.mp4" type="video/mp4" />
    </video>
  );
};
