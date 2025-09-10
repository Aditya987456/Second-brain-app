import { FaThumbtack } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { VideoDemo } from "./videodemo"; 


export default function LandingSection() {
  const features = [
    {
      icon: <FaThumbtack size={28} className="text-purple-600" />,
      title: "Save Anything",
      desc: "Whether it’s a YouTube tutorial, GitHub project, tweet, or handwritten note—keep everything in one organized space."
    },
    {
      icon: <FaSearch size={28} className="text-purple-600" />,
      title: "Smart Search",
      desc: "AI-powered search understands your content and helps you retrieve exactly what you need without scrolling endlessly."
    },
    {
      icon: <FaFolder size={28} className="text-purple-600" />,
      title: "Stay Organized",
      desc: "Categorize by tags, types, and collections to keep your brain clutter-free."
    },
    {
      icon: <FaLink size={28} className="text-purple-600" />,
      title: "Share Easily",
      desc: "Generate shareable links and let your friends or team access your saved content."
    }
  ]; 

  return (
    <div className="min-h-screen text-gray-800 md:px-6 mt-10 md:-mt-32 dark:bg-darkbg">
   







{/* --------------------------------demo video section--------------------------- */}

    <section className="relative md:ml-64 md:mr-8 md:px-0">


      <div className="max-w-8xl px-2  md:ml-8 grid grid-cols-1 md:grid-cols-2 md:gap-x-8   items-center">
        
        {/* Left: Demo Video */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }} //---it animate on mounting...
          transition={{ duration: 1.0 }}
          className="w-full"
                >
        <VideoDemo/>

        </motion.div>

        
        {/* Right: How It Works */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }} // animate immediately on mount
  transition={{ duration: 0.8, delay: 0.2 }}
  className="w-full"
        >
          <h2 className="md:text-4xl text-2xl md:mt-0 mt-8 border-l-4 border-purple-500 pl-4 font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 md:mb-10">
            How It Works
          </h2>
          {/* <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Our platform blends <span className="font-semibold text-indigo-600 dark:text-indigo-400">semantic search</span>, 
            intelligent retrieval, and modular design to help you build your Second Brain effortlessly.
          </p> */}

          <ul className="md:space-y-3  md:mr-52 space-y-1">
            {[
              "Upload or sync notes, articles, videos, bookmarks, and more—all in one place that’s easy to access anytime.",
              "We embed and index your content using vector search",
              "Type a question — and instantly get context-aware answers and suggestions powered by advanced AI models.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 md:w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-secondary font-light text-sm md:text-lg">{step}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section> 


    












 {/* Heading---> why choose second brain */}
      <div className="text-center mb-12 mt-32">
        <h2 className="text-3xl md:text-4xl font-bold dark:text-white">
          Why Choose Our<span className="text-purple-600 ml-2">Second Brain?</span>
        </h2>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2 max-w-6xl mx-auto mb-16">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl dark:bg-cardbg 
                      dark:border-black shadow-md border p-6 
                      dark:shadow-sm dark:transition-all
                       dark:shadow-purple-900 dark:hover:shadow-sm
                        text-center hover:shadow-2xl transition md:mx-0 mx-6"
                      
          >
            <div className="mb-4 flex justify-center">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">{f.title}</h3>
            <p className="text-gray-600 text-sm dark:text-secondary">{f.desc}</p>
          </div>
        ))}
      </div>









      
    </div>
    
  );
}



