import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "linear-gradient(135deg, #1d1836 0%, #232946 100%)",
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ 
        background: experience.iconBg,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: experience.company_name.includes('Innate AI')
          ? '0 0 30px rgba(74, 144, 226, 0.6), 0 0 60px rgba(34, 139, 34, 0.3)'
          : '0 0 20px rgba(255, 255, 255, 0.1)',
        border: experience.company_name.includes('Innate AI')
          ? '2px solid rgba(74, 144, 226, 0.5)'
          : 'none',
        transform: experience.company_name.includes('Innate AI')
          ? 'scale(1.1)'
          : 'scale(1.0)'
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full p-2'>
          {experience.icon ? (
            <img
              src={experience.icon}
              alt={experience.company_name}
              className={`object-contain rounded-lg ${
                experience.company_name.includes('Innate AI') 
                  ? 'w-[95%] h-[95%]' 
                  : 'w-[85%] h-[85%]'
              }`}
              style={{
                filter: experience.company_name.includes('Innate AI')
                  ? 'brightness(1.4) contrast(1.3) saturate(1.2)'
                  : 'brightness(1.1) contrast(1.1)',
                backgroundColor: experience.company_name.includes('Innate AI')
                  ? 'rgba(255, 255, 255, 0.25)'
                  : 'rgba(255, 255, 255, 0.1)',
                padding: experience.company_name.includes('Innate AI') ? '2px' : '4px',
                borderRadius: '8px',
                boxShadow: experience.company_name.includes('Innate AI')
                  ? '0 0 15px rgba(74, 144, 226, 0.4)'
                  : 'none'
              }}
            />
          ) : (
            <div className='w-full h-full flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg'>
              <span className='text-white text-2xl font-bold'>
                {experience.company_name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold mb-2'>{experience.title}</h3>
        <p
          className='text-[#4A90E2] text-[18px] font-semibold bg-gradient-to-r from-[#4A90E2] to-[#228B22] bg-clip-text text-transparent'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-6 space-y-3'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[15px] leading-relaxed tracking-wide flex items-start'
          >
            <span className='text-[#4A90E2] mr-3 mt-1 text-[18px]'>▸</span>
            <span className='flex-1'>{point}</span>
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
