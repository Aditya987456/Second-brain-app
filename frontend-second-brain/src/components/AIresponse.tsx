import React from "react";
import { Typingtext } from "./Typingtext";

interface AIResponseCardProps {
  text: string;
  isLoading: boolean;
  onTypingComplete?: () => void;
}

export const AIResponseCard = ({ text, isLoading, onTypingComplete }: AIResponseCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mx-8">
      {isLoading ? (
        <div className="text-sm text-gray-500 flex items-center">
          <span>Thinking</span>
          <span className="animate-bounce mx-1">.</span>
          <span className="animate-bounce mx-1 delay-100">.</span>
          <span className="animate-bounce mx-1 delay-200">.</span>
        </div>
      ) : (
        <Typingtext text={text} onComplete={onTypingComplete} />
      )}
    </div>
  );
};
