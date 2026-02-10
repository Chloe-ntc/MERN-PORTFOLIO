import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="https://open.spotify.com/show/4dREDWx1Ey8aQILFQradOH?si=jQNJXwnkRoqnIWmIFxU0cg"> <i class="fa-brands fa-spotify text-gray-400"></i></a>
          <a href="mailto:chloenitcheu24@gmail.com" > <i class="ri-mail-line text-gray-400"></i></a>
          <a href="https://www.instagram.com/chloenitcheu/"> <i class="ri-instagram-line text-gray-400"></i></a>
          <a href="https://www.linkedin.com/in/chloe-nitcheu-305469180/"> <i class="ri-linkedin-box-line text-gray-400"></i></a>
          <a href="https://github.com/Chloe-ntc/"> <i class="ri-github-line text-gray-400"></i></a>
        </div>
        <div className="w-[1px] h-32 bg-[#d22e86] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
