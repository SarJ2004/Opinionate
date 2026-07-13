import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { AlignStartVerticalIcon } from "lucide-react";

function HeroSection() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-700">
      <div className="flex flex-col items-center space-y-8 px-4 text-center">
        <Image
          src="/banner1.svg"
          width={500}
          height={500}
          alt="Banner Image"
          className="drop-shadow-2xl animate-fadeIn"
        />

        <div className="flex flex-col items-center mt-2">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 drop-shadow-2xl font-display">
            Verso
          </h1>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mt-4 mb-6"></div>
          <p className="text-lg md:text-2xl text-gray-800 dark:text-gray-300 font-medium italic drop-shadow-sm max-w-xl">
            Discover the better choice, together.
          </p>
          <Button variant={"outline"} className="mt-2 cursor-pointer ">
            <AlignStartVerticalIcon />
            Create A Poll
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
