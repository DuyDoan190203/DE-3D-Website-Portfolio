import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { badmintonSmash, labUniversity } from "../assets";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt 
    tiltMaxAngleX={45}
    tiltMaxAngleY={45}
    scale={1}
    transitionSpeed={450}
    className='xs:w-[250px] w-full'
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Background.</h2>
      </motion.div>

      <div className='mt-4 flex flex-col lg:flex-row gap-8 items-start'>
        <div className='flex-1'>
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className='text-secondary text-[17px] leading-[30px] mb-6'
          >
            My background combines competitive sports with technical expertise. I competed professionally in badminton in Vietnam 
            and continued competing in Finland during my studies at LAB University of Applied Sciences, earning 3 gold and 5 silver medals 
            in Finnish tournaments. This experience developed strong analytical thinking and performance under pressure.
          </motion.p>

          <motion.p
            variants={fadeIn("", "", 0.2, 1)}
            className='text-secondary text-[17px] leading-[30px] mb-6'
          >
            At LAB University of Applied Sciences, I pursued Business Information Technology studies while maintaining competitive badminton. 
            This combination taught me discipline and time management, skills essential for both sports and software development. 
            Through web development projects and freelance work, I discovered my passion for data engineering and transforming raw data into meaningful insights.
          </motion.p>

          <motion.p
            variants={fadeIn("", "", 0.3, 1)}
            className='text-secondary text-[17px] leading-[30px]'
          >
            Currently specializing in data engineering with practical experience using AWS services (Glue, Redshift, S3, Kinesis, Lambda), 
            Apache Airflow, Kafka, Spark, Terraform, Docker, dbt, and Great Expectations. I'm pursuing Big Data Analytics at Arcada UAS 
            while gaining hands-on experience through roles at Innate AI and Listeds, focusing on building scalable data solutions.
          </motion.p>
        </div>

        <div className='lg:w-1/3 w-full flex flex-col gap-6'>
          {/* Badminton Image */}
          <motion.div
            variants={fadeIn("left", "", 0.2, 1)}
          >
            <div className='relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500'>
              <img
                src={badmintonSmash}
                alt="Duy executing a badminton smash during competition"
                className='w-full h-auto transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-2xl p-6'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-gray-200 text-sm font-light leading-relaxed'>
                    <span className='text-yellow-400 font-semibold'>3 Gold</span> • <span className='text-gray-300 font-semibold'>5 Silver</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* LAB University Image */}
          <motion.div
            variants={fadeIn("left", "", 0.4, 1)}
          >
            <div className='relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500'>
              <img
                src={labUniversity}
                alt="LAB University of Applied Sciences campus building"
                className='w-full h-auto transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-2xl p-6'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-gray-300 text-xs uppercase tracking-widest opacity-90'>
                    Business Information Technology
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
