import { Github, Twitter, Linkedin } from "lucide-react";

export  function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-darkbg border-t border-gray-200 dark:border-gray-700 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/*-------- logo + name---*/}
        <div>
            
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">

             Second Brain</h3>
          <p className="mt-3 text-md text-gray-600 dark:text-gray-400">
            Build your digital second brain powered by AI search & semantic recall.  
            Stay organized, connected, and never lose track of knowledge again.
          </p>
        </div>

        {/* ---- links ------- */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-md text-gray-500 ">
            <li><a href="/about" className="hover:text-indigo-500">About</a></li>
            <li><a href="/features" className="hover:text-indigo-500">Contact</a></li>
            <li><a href="/docs" className="hover:text-indigo-500">How it works?</a></li>
            
          </ul>
        </div>

        {/* Support and profile links ---*/}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Support Me</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            If you love this project, consider supporting me 💜
          </p>

          <a 
            href="/support" 
            className="inline-block bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            ☕ Support Me
          </a>

          <div className="flex gap-4 mt-6">
            <a href="https://github.com/yourusername" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-indigo-500"><Github /></a>
            <a href="https://twitter.com/yourusername" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-indigo-500"><Twitter /></a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-indigo-500"><Linkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Second Brain. Built with ❤️ by Aditya Raj.
      </div>
    </footer>
  );
}
