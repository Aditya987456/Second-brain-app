import { useState, useEffect } from 'react';



interface TypingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}





export const Typingtext = ({ text, speed = 20, onComplete  }:TypingTextProps) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      // setDisplayed(prev => prev + text[i]);
      setDisplayed(prev => prev + (text[i] ?? ""));

      i++;
      if (i >= text.length){
         clearInterval(interval);
         onComplete?.()
         return
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return <div className="text-md font-sans whitespace-pre-wrap">{displayed}</div>;
};
