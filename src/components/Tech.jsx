import React from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";
import { styles } from "../styles";

const TechCard = ({ index, technology }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.75)}
    className="w-28 h-28 relative group cursor-pointer"
  >
    <div className="w-full h-full bg-tertiary rounded-full p-4 shadow-card hover:shadow-lg transition-all duration-300 group-hover:scale-110 border border-transparent hover:border-[#4A90E2]">
      <img
        src={technology.icon}
        alt={technology.name}
        className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
        onError={(e) => {
          console.warn(`Failed to load image for ${technology.name}:`, technology.icon);
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      {/* Fallback display */}
      <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-[#4A90E2] to-[#228B22] rounded-full">
        <span className="text-white font-bold text-lg">
          {technology.name.charAt(0)}
        </span>
      </div>
    </div>
    
    {/* Technology name on hover */}
    <div className="absolute -bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap">
        {technology.name}
      </span>
    </div>
  </motion.div>
);

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          My Technology Stack
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Data Engineering Tools.
        </h2>
      </motion.div>

      <motion.div 
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl mx-auto text-center leading-[30px]"
      >
        Technologies and frameworks I use to build scalable data pipelines and analytics solutions
      </motion.div>

      <div className='mt-20 flex flex-row flex-wrap justify-center gap-10'>
        {technologies.map((technology, index) => (
          <TechCard 
            key={technology.name} 
            index={index} 
            technology={technology} 
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
