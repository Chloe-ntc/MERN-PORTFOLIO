import React from "react";
import { useSelector } from "react-redux";

function Intro() {
  const { portfolioData } = useSelector((state) => state.root);

  if (!portfolioData || !portfolioData.intro) return null;

  const { firstName, lastName, welcomeText, description, caption } =
    portfolioData.intro;

  return (
    <div className="h-[80vh] bg-primary flex items-center justify-between px-10 gap-10 sm:flex-col sm:h-auto sm:py-10">
      {/* Left: Text */}
      <div className="flex flex-col gap-5 w-1/2 sm:w-full sm:items-center">
        <h1 className="text-white text-3xl sm:text-2xl">{welcomeText}</h1>
        <h1 className="text-7xl sm:text-4xl text-secondary font-semibold">
          {firstName} {lastName}
        </h1>
        <h1 className="text-5xl sm:text-3xl text-white font-semibold">
          {caption}
        </h1>
        <p className="text-white text-lg">{description}</p>
        <button className="border-2 border-tertiary text-tertiary px-10 py-3 rounded mt-3">
          Get Started
        </button>
      </div>

      {/* Right: Image */}
      <div className="w-1/2 flex justify-end sm:w-full sm:justify-center sm:mt-5">
        <img
          src="https://res.cloudinary.com/dwayuj3vl/image/upload/v1770580575/WhatsApp_Image_2025-10-11_at_19.00.56_75a1ea1f-removebg-preview_aohe1y.png" // your Cloudinary URL
          alt="Intro"
           className="w-full max-w-lg h-auto object-cover rounded-lg opacity-90"
        />
      </div>
    </div>
  );
}

export default Intro;
