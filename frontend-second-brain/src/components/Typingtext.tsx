// import { useState, useEffect } from 'react';



// interface TypingTextProps {
//   text: string;
//   speed?: number;
//   onComplete?: () => void;
// }





// export const Typingtext = ({ text, speed = 50, onComplete  }:TypingTextProps) => {
//   const [displayed, setDisplayed] = useState('');

//   useEffect(() => {
     

//      console.log('First chars:', text.slice(0, 5), [...text.slice(0, 5)].map(c => c.charCodeAt(0)));

//     if (!text || text.length === 0) return;
//     setDisplayed('')

//     let i = 0;
//     const interval = setInterval(() => {
//       // setDisplayed(prev => prev + text[i]);
//       setDisplayed(prev => prev + (text[i] ?? ""));
//       i++;

//       if (i >= text.length){
//          clearInterval(interval);
//          onComplete?.()
//          return
//       }
//     }, speed);

//     return () => clearInterval(interval);
//   }, [text,speed]);

//   return <div className="text-md font-sans whitespace-pre-wrap">{displayed}</div>;
// };



import { useState, useEffect, useRef } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export const Typingtext = ({ text, speed = 20, onComplete }: TypingTextProps) => {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0); // Track the index outside of state

  useEffect(() => {
    if (!text || text.length === 0) return;

    setDisplayed('');
    indexRef.current = 0; // Reset index on new text

    const interval = setInterval(() => {
      const i = indexRef.current;
      setDisplayed(prev => prev + (text[i] ?? ""));
      indexRef.current += 1;

      if (indexRef.current >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <div className="text-md font-sans whitespace-pre-wrap">{displayed}</div>;
};

