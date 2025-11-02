import React from "react";
import arijitImg from "@/assets/arijit.jpg"; // <-- replace with your image path (the one you uploaded)

const ConcertPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-purple-700 flex flex-col items-center justify-center text-white font-sans p-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-5xl mb-10">
        <div className="flex items-center space-x-2">
          <div className="bg-green-500 rounded-lg p-2 text-2xl font-bold">E</div>
          <span className="text-xl font-semibold">Ease</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-[#e3d4f4] text-black rounded-2xl shadow-lg flex flex-col md:flex-row items-center p-6 md:p-10 max-w-5xl w-full">
        {/* Left Section (Image + Title) */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="bg-gradient-to-t from-orange-600 to-orange-300 rounded-2xl overflow-hidden mb-6">
            <img
              src={arijitImg}
              alt="Arijit Singh"
              className="w-full h-80 object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-center text-[#4b1c6d]">Arijit Singh</h1>
          <p className="text-center text-[#6c2aa7] mt-1">
            The Soulful Voice of Indian Music Today
          </p>
        </div>

        {/* Right Section (Description + Details) */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-10">
          <p className="text-gray-800 mb-6 text-justify leading-relaxed">
            The Arijit Singh concert is a mesmerizing live musical experience
            where India’s most soulful singer performs his greatest hits, known
            for his deep voice and emotional connection with the audience.
            Arijit blends romantic, melancholic, and energetic songs into a
            magical evening.
          </p>

          <div className="space-y-2 text-gray-800">
            <p>
              <span className="font-semibold">Venue :</span> Pragati maidan
            </p>
            <p>
              <span className="font-semibold">Date :</span> 19/09/25
            </p>
            <p>
              <span className="font-semibold">Time :</span> 10:00 PM
            </p>
          </div>

          <button className="mt-6 bg-purple-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-900 transition">
            Buy ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConcertPage;
