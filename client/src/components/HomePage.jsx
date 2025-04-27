import { useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [url, setUrl] = useState("");

  const handleShorten = () => {
    if (!url) return alert("Please enter a URL.");
    alert(`URL to shorten: ${url}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4 pt-24 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center space-y-6"
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          🔗 Shorten Your URLs in Seconds
        </h1>
        <p className="text-lg text-gray-700">
          Turn long, messy links into clean, easy-to-share URLs. Whether it's
          for social media, emails, or tracking — we've got you covered.
        </p>

        

        <div className="mt-12 text-sm text-gray-600">
          <p>
            A URL shortener takes a long web address and converts it into a
            shorter, more manageable link. This shorter link redirects users to
            the original URL, making sharing easier without losing
            functionality.
          </p>
        </div>
      </motion.div>
    </div>
  );
}


