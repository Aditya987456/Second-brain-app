//------ typing of the ai reponse  -------



import { useState, useEffect, useRef } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export const Typingtext = ({ text, speed = 20, onComplete }: TypingTextProps) => {
  const [displayed, setDisplayed] = useState(''); //set what to displayed after each text
  const indexRef = useRef(0); // track the index of the text

  useEffect(() => {
    if (!text || text.length === 0) return;    //if no reponse or reponse is empty

    setDisplayed('');
    indexRef.current = 0; // reset the index for new text

    const interval = setInterval(() => {
      const i = indexRef.current;
      setDisplayed(prev => prev + (text[i] ?? ""));
      indexRef.current += 1;  //index is now increse means now the next text will gets append to prev index like 0 then 1,2...

      if (indexRef.current >= text.length) {    //means index ka size aur text from ai ka length are equal means whole text is get printed
        clearInterval(interval);
        onComplete?.();         //on complete of printing text call next task which is showing the related contents
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <div className="text-md font-sans whitespace-pre-wrap">{displayed}</div>;
};

