import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


function QrGeneratingPage() {
    const [longurl,setLongUrl]=useState('');
    const [qrurl,setQrUrl]=useState('');
    async function handleSubmit(e){
        e.preventDefault();
        try{
        const response=await axios.post(`/qrcode/gen`,{longurl});
        console.log("response :",response);
        setQrUrl(response.data.data.qrCodeUrl);
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Url"
          required
          value={longurl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition"
        >
          Generate
        </button>
      </form>
      {qrurl && (
        <div className="flex flex-col items-center justify-center ">
          <p className="text-green-800 font-medium">Your Qr Code:</p>
          <img className="w-20 h-20 mt-8" src={qrurl} alt="" />
        </div>
      )}
      <div>
        <Link to="/all-qr" className="text-indigo-600 underline font-medium">
          Click here to see all qrs generated
        </Link>
      </div>
    </div>
  );
}

export default QrGeneratingPage
