'use client';

import { useState } from "react";
import { FaArrowRight, FaBars } from "react-icons/fa";
import { RiSunCloudyLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

function formatDate() {
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const monthName = months[today.getMonth()];
  const suffix = (date % 10 === 1 && date !== 11) ? 'st' :
                 (date % 10 === 2 && date !== 12) ? 'nd' :
                 (date % 10 === 3 && date !== 13) ? 'rd' : 'th';
  return `${dayName}, ${date}${suffix} ${monthName}`;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-100 bg-inherit">
      {/* Burger Icon to Toggle Sidebar */}
      <button
        onClick={handleClick}
        className="absolute lg:hidden text-white text-2xl p-3"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-10 bg-black top-0 left-0 min-h-screen transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:w-64`}
      >
        {/* Close Button */}
        <div className="w-full flex justify-end">
          <button className="btn btn-ghost lg:hidden text-2xl text-white" onClick={handleClick}>
            <IoMdClose />
          </button>
        </div>

        <div className="py-2 px-5 flex flex-col items-center min-h-screen h-full" style={{ backgroundColor: 'inherit' }}>

          {/* Search Bar */}
          <div className="flex items-center gap-2 mb-8 w-full">
            <input
              type="text"
              placeholder="Search for a location"
              className="w-full h-10 text-black bg-white rounded-lg p-2"
            />
            <button className="bg-white text-black rounded-full p-3">
              <FaArrowRight />
            </button>
          </div>

          {/* Weather Information */}
          <div className="min-h-screen mt-[-60px] text-center w-full flex flex-col justify-center items-center gap-6 text-white">
            <h1 className="font-bold text-xl lg:text-2xl">Brighton</h1>
            <p className="text-xl lg:text-2xl">{formatDate()}</p>
            <div className="text-6xl lg:text-7xl">
              <RiSunCloudyLine />
            </div>
            <p className="text-5xl lg:text-6xl font-bold">15°C</p>
            <h3 className="text-lg lg:text-xl">Sunny</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
