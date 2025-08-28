import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { styles } from "../styles";
import { DataPipelineCanvas, HealthcareDataCanvas, MedallionArchitectureCanvas, BadmintonToTechCanvas } from "./canvas";

const Hero = () => {
  const [currentVisualization, setCurrentVisualization] = useState(0);
  
  const visualizations = [
    { component: DataPipelineCanvas, name: "ETL Pipeline", description: "Interactive data pipeline visualization" },
    { component: BadmintonToTechCanvas, name: "Career Journey", description: "From competitive badminton to data engineering" },
    { component: HealthcareDataCanvas, name: "Data Processing", description: "Clinical data processing & HIPAA compliance" },
    { component: MedallionArchitectureCanvas, name: "Medallion Architecture", description: "Bronze, Silver & Gold data layers" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVisualization((prev) => (prev + 1) % visualizations.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const CurrentVisualization = visualizations[currentVisualization].component;

  return (
    <section className="relative w-full h-screen mx-auto data-engineer-hero-bg">
      {/* Main content container */}
      <div className={`absolute inset-0 top-[120px] ${styles.paddingX} max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-8`}>
        
        {/* Left side - Text content */}
        <div className="flex flex-col justify-start z-10 lg:w-1/2">
          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="w-5 h-5 rounded-full bg-[#4A90E2]" />
              <div className="w-1 sm:h-80 h-40 blue-gradient" />
            </div>
            
            <div>
              <h1 className={`${styles.heroHeadText} text-white leading-tight`}>
                Hi, I'm <span className="text-[#4A90E2]">Duy Doan</span>
              </h1>
              <p className={`${styles.heroSubText} mt-4 text-white-100 leading-relaxed max-w-lg`}>
                I build data pipelines and transform messy data into insights
              </p>
            </div>
          </div>

          {/* Location and Education info */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-2 text-secondary">
              <span className="text-[#FF6B35]">📍</span>
              <span className="text-[16px]">Helsinki, Finland</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <span className="text-[#4A90E2]">🎓</span>
              <span className="text-[16px]">Big Data Analytics Student</span>
              <a 
                href="https://www.arcada.fi/en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#228B22] font-medium hover:text-[#4A90E2] transition-colors duration-300 cursor-pointer"
              >
                Arcada UAS Specialization Program
              </a>
            </div>
          </div>
        </div>

        {/* Right side - 3D Visualization */}
        <div className="lg:w-1/2 w-full h-[400px] lg:h-[500px] relative">
          {/* Visualization container */}
          <div className="w-full h-full relative overflow-hidden rounded-2xl">
            <CurrentVisualization />
            
            {/* Visualization info overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-semibold text-lg mb-1">
                {visualizations[currentVisualization].name}
              </h3>
              <p className="text-secondary text-sm">
                {visualizations[currentVisualization].description}
              </p>
              
              {/* Visualization indicators */}
              <div className="flex gap-2 mt-3">
                {visualizations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVisualization(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentVisualization 
                        ? 'bg-[#4A90E2] w-6' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
