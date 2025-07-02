"use client";

import { TypeAnimation } from "react-type-animation";

const Description = () => {
  return (
    <>
      <div className="w-full px-3 h-max">
        <h1 className="flex flex-col text-[50px] leading-normal font-['Courgette-regular'] text-black">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              `Hello, I'm Melon`,
              2000, // wait 1s before replacing "Mice" with "Hamsters"
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={true}
          />
        </h1>
        <div className="mt-2 text-gray-600 antialiased text-[0.9em]">
          <p className="flex flex-wrap py-1">
            <span>
              🧑‍💻&nbsp;Java｜Go｜Python｜React｜Next.js 开发者&nbsp;/&nbsp;全栈开发者&nbsp;/&nbsp;
            </span>
            <span> Full-stack Developer</span>
          </p>
          <p className="flex flex-wrap py-1">
            🤩&nbsp;正在做一些有趣的事 / Working on something interesting
          </p>
        </div>
      </div>
    </>
  );
};

export default Description;
