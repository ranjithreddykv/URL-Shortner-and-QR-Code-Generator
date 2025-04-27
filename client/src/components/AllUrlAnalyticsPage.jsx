import axios from 'axios';
import React, { useState } from 'react'

function AllUrlAnalyticsPage() {
     const [shortId,setShortId]=useState('');
     const [data,setData]=useState([]);
     async function handleSubmit(e){
        e.preventDefault();
        try{
        const response = await axios.get(`/analytics/${shortId}`);
        console.log(response.data.data);    
        setData(response.data.data);
    }
    catch(err){
        console.error("Error in fetching data",err);
    }
     } 
     return (
       <div>
         <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl space-y-6">
           <form onSubmit={handleSubmit} className="space-y-4">
             <input
               type="text"
               placeholder="Enter short Id"
               value={shortId}
               onChange={(e) => setShortId(e.target.value)}
               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
             />
             <button
               type="submit"
               className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition"
             >
               See Analytics
             </button>
           </form>
         </div>

         <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
           <h2 className="text-2xl font-bold mb-4 text-gray-800">
             Short URL Analytics
           </h2>

           <div className="overflow-x-auto">
             <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
               <thead className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white">
                 <tr>
                   <th className="px-4 py-3">City</th>
                   <th className="px-4 py-3">ClickedAt</th>
                   <th className="px-4 py-3">Country</th>
                   <th className="px-4 py-3">IP Address</th>
                   <th className="px-70 py-3">Device</th>
                   <th className="px-4 py-3">Referrer</th>
                 </tr>
               </thead>
               <tbody className="bg-white">
                 {data.map((value, index) => (
                   <tr
                     key={index}
                     className="border-t hover:bg-gray-50 transition duration-200"
                   >
                     <td className="px-4 py-2 break-words max-w-xs">
                       {value.city}
                     </td>
                     <td className="px-4 py-2">{value.clickedAt}</td>
                     <td className="px-4 py-2 text-center">{value.country}</td>
                     <td className="px-4 py-2 text-center">
                       {value.ipAddress}
                     </td>
                     <td className="px-4 py-2 text-center">{value.device}</td>
                     <td className="px-4 py-2 text-center">{value.referrer}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
     );
}

export default AllUrlAnalyticsPage
