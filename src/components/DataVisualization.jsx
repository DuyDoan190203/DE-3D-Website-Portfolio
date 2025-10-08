import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const DataVisualization = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dataMetrics = [
    {
      label: "AWS Services Used",
      value: "8+",
      description: "Glue, Redshift, S3, Lambda, Kinesis",
    },
    {
      label: "Data Pipeline Projects",
      value: "3",
      description: "Healthcare and business analytics",
    },
    {
      label: "Technologies Applied",
      value: "12+",
      description: "Apache Airflow, Kafka, dbt, Docker",
    },
    {
      label: "Company Experience",
      value: "2",
      description: "Innate AI and Listeds",
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center bg-primary">
      <div className="relative z-10 w-full">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>
            Data Engineering
          </p>
          <h2 className={`${styles.sectionHeadText} text-center`}>
            Recent Projects.
          </h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl mx-auto text-center leading-[30px]"
        >
          Key metrics from recent data engineering projects at Innate AI and Listeds, focusing on healthcare data processing 
          and business analytics using AWS services, Apache Airflow, and data quality frameworks.
        </motion.p>

        {/* Data Metrics Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {dataMetrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.2, 0.75)}
              className="bg-tertiary p-6 rounded-2xl border border-[#4A90E2] hover:border-[#228B22] transition-colors"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01 + index) * 10}px)`,
              }}
            >
              <div className="text-center">
                <h3 className="text-[#4A90E2] text-4xl font-bold mb-2">
                  {metric.value}
                </h3>
                <h4 className="text-white text-lg font-semibold mb-2">
                  {metric.label}
                </h4>
                <p className="text-secondary text-sm">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Visualization */}
        <motion.div
          variants={fadeIn("up", "spring", 0.5, 1)}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-center text-white text-2xl font-bold mb-8">
            AWS-First Data Engineering Stack
          </h3>
          <div className="flex justify-center items-center space-x-4 overflow-x-auto pb-4">
            {["AWS S3", "Glue ETL", "Redshift", "Airflow", "Terraform"].map((tech, index) => (
              <div key={tech} className="flex items-center">
                <div className="bg-gradient-to-r from-[#4A90E2] to-[#228B22] p-4 rounded-lg min-w-[120px] text-center">
                  <div className="text-white font-semibold">{tech}</div>
                </div>
                {index < 4 && (
                  <div className="w-8 h-1 bg-[#00CED1] mx-2 rounded" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          variants={fadeIn("up", "spring", 0.7, 1)}
          className="mt-16 max-w-4xl mx-auto text-center"
        >
          <h3 className="text-white text-2xl font-bold mb-6">Professional Development</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-tertiary p-6 rounded-xl border border-[#228B22]">
              <h4 className="text-[#228B22] text-lg font-semibold mb-2">
                🎓 Big Data Analytics Specialization Program
              </h4>
              <p className="text-secondary text-sm">
                Arcada University of Applied Sciences (2025-2026) - 30 etcs Master Level Studies
              </p>
            </div>
            <div className="bg-tertiary p-6 rounded-xl border border-[#4A90E2]">
              <h4 className="text-[#4A90E2] text-lg font-semibold mb-2">
                ☁️ AWS Data Engineering Specialization
              </h4>
              <p className="text-secondary text-sm">
                AWS & DeepLearning.AI Professional Program (2025)
              </p>
            </div>
            <div className="bg-tertiary p-6 rounded-xl border border-[#4A90E2]">
              <h4 className="text-[#4A90E2] text-lg font-semibold mb-2">
                💻 Business Information Technology
              </h4>
              <p className="text-secondary text-sm">
                LAB University Of Applied Sciences (2021-2025) - Bachelor Level Studies
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(DataVisualization, "data-viz"); 