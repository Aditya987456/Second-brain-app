import { useEffect, useRef } from "react";

interface TwitterCardProps {
  tweetUrl: string;
}

export function TwitterCard({ tweetUrl }: TwitterCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear previous content
    containerRef.current.innerHTML = "";
    
    // Create tweet element
    const tweetDiv = document.createElement("div");
    tweetDiv.className = "twitter-tweet";
    
    const tweetLink = document.createElement("a");
    tweetLink.href = tweetUrl;
    
    tweetDiv.appendChild(tweetLink);
    containerRef.current.appendChild(tweetDiv);
    
    // Load the tweet
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  }, [tweetUrl]);

  return <div ref={containerRef}></div>;
}