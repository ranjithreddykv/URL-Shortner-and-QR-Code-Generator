import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
function UrlGeneratingPage() {
  const [longUrl,setLongUrl]=useState("");
  const [customCode,setCustomCode]=useState("");
  const [expiresIn,setExpireIn]=useState("");
  const [shortUrl,setShortUrl]=useState("");
  const [error,setError]=useState("");
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError('');
    try{
      const data=await axios.post("/url/",{longUrl,customCode,expiresIn})
      console.log(data.data.data);
      setShortUrl(data.data.data);
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          
          placeholder="Custom code (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="number"
          placeholder="Expire in days (optional)"
          value={expiresIn}
          onChange={(e) => setExpireIn(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition"
        >
          Generate
        </button>
      </form>

      {shortUrl && (
        <div className="text-center bg-green-50 border border-green-300 rounded-lg p-4">
          <p className="text-green-800 font-medium">Your short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}
      <div>
        <Link to="/all-url" className="text-indigo-600 underline font-medium">
          Click here to see all short url generated
        </Link>
      </div>
      {error && <p className="text-red-600 font-medium text-center">{error}</p>}
    </div>
  );
}

export default UrlGeneratingPage
