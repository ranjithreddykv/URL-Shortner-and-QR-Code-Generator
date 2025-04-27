import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AllQrPage() {
    const [qrData,setQrData]=useState([]);
    useEffect(()=>{
        const fetchQrs=async()=>{
            try{
            const qrdoc=await axios.get("/qrcode/all")
            console.log(qrdoc);
            setQrData(qrdoc.data.data);
        }
        catch(err){
            console.log(err);
        }
        }
        fetchQrs();
    },[])
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        All QR Codes
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white text-base">
            <tr>
              <th className="px-6 py-4">Long URL</th>
              <th className="px-6 py-4">QR Code</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {qrData?.map((qr, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 break-words max-w-sm">
                  <a
                    href={qr.longUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {qr.longUrl}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <img
                    src={qr.qrCodeUrl}
                    alt="QR Code"
                    className="w-24 h-24 object-contain mx-auto rounded-md shadow-md"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllQrPage
