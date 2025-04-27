import React, { useEffect, useState } from 'react'
import axios from 'axios'
 function AllUrl() {
  const [urls, setUrls] = useState([]);
  useEffect(()=>{
    const fetchUrls=async()=>{
      try{
        const res=await axios.get("/url/all");
        setUrls(res.data.data);
      }
      catch(err){
        console.error("Failed to fetch Urls",err);
      }
    }
    fetchUrls();
  },[]);
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        All Shortened URLs
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white">
            <tr>
              <th className="px-4 py-3">Long URL</th>
              <th className="px-4 py-3">Short URL</th>
              <th className="px-4 py-3">Clicks</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {urls.map((url, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-2 break-words max-w-xs">
                  {url.redirectURL}
                </td>
                <td className="px-4 py-2">
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {url.shortUrl}
                  </a>
                </td>
                <td className="px-4 py-2 text-center">{url.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUrl
