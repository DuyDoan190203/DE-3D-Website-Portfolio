import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Text, Box, Sphere, Cylinder, Plane, Float } from "@react-three/drei";
import * as THREE from 'three';

import CanvasLoader from "../Loader";

// Realistic Badminton Court Component (Official dimensions: 13.4m x 6.1m)
const BadmintonCourt = ({ isTransitioning, progress }) => {
  const courtRef = useRef();
  const netRef = useRef();
  
  useFrame((state) => {
    if (courtRef.current) {
      // Fade out court as it transitions
      courtRef.current.material.opacity = Math.max(0, 1 - progress);
      
      // Slight floating motion
      courtRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    
    if (netRef.current) {
      netRef.current.material.opacity = Math.max(0, 1 - progress);
    }
  });
  
  // Official badminton court dimensions (scaled down for 3D scene)
  const courtLength = 13.4 * 0.4; // 5.36m scaled
  const courtWidth = 6.1 * 0.4;   // 2.44m scaled
  const netHeight = 1.55 * 0.6;   // Official net height scaled
  
  return (
    <group>
      {/* Main Court Floor - Professional green surface */}
      <Plane
        ref={courtRef}
        args={[courtWidth, courtLength]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
      >
        <meshStandardMaterial 
          color="#2d5a3d" // Professional court green
          transparent
          opacity={1}
          roughness={0.8}
        />
      </Plane>
      
      {/* Out of bounds area */}
      <Plane
        args={[courtWidth + 2, courtLength + 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
      >
        <meshStandardMaterial 
          color="#1a4028" // Darker green for out of bounds
          transparent
          opacity={1 - progress * 0.5}
        />
      </Plane>
      
      {/* Center Line */}
      <Plane
        args={[0.05, courtLength]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="white" transparent opacity={1 - progress} />
      </Plane>
      
      {/* Service Lines */}
      {/* Short service line (close to net) */}
      <Plane
        args={[courtWidth, 0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -1.98 * 0.4]}
      >
        <meshStandardMaterial color="white" transparent opacity={1 - progress} />
      </Plane>
      <Plane
        args={[courtWidth, 0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 1.98 * 0.4]}
      >
        <meshStandardMaterial color="white" transparent opacity={1 - progress} />
      </Plane>
      
      {/* Long service line (doubles) */}
      <Plane
        args={[courtWidth, 0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -2.53 * 0.4]}
      >
        <meshStandardMaterial color="white" transparent opacity={1 - progress} />
      </Plane>
      <Plane
        args={[courtWidth, 0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 2.53 * 0.4]}
      >
        <meshStandardMaterial color="white" transparent opacity={1 - progress} />
      </Plane>
      
      {/* Side Lines */}
      <Plane
        args={[0.05, courtLength]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-courtWidth/2, 0, 0]}
      >
        <meshStandardMaterial color="white" transparent opacity={1 - progress} />
      </Plane>
      <Plane
        args={[0.05, courtLength]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[courtWidth/2, 0, 0]}
      >
        <meshStandardMaterial color="white" transparent opacity={1 - progress} />
      </Plane>
      
      {/* Service Court Side Lines (singles) */}
      <Plane
        args={[0.05, courtLength * 0.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-0.76 * 0.4, 0, 0]}
      >
        <meshStandardMaterial color="white" transparent opacity={1 - progress} />
      </Plane>
      <Plane
        args={[0.05, courtLength * 0.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0.76 * 0.4, 0, 0]}
      >
        <meshStandardMaterial color="white" transparent opacity={1 - progress} />
      </Plane>
      
      {/* Professional Net */}
      <Box
        ref={netRef}
        args={[courtWidth, netHeight, 0.02]}
        position={[0, netHeight/2, 0]}
      >
        <meshStandardMaterial 
          color="#000000"
          wireframe
          transparent
          opacity={0.8}
        />
      </Box>
      
      {/* Net Posts - Realistic height and positioning */}
      <Cylinder args={[0.03, 0.03, netHeight]} position={[-courtWidth/2 - 0.1, netHeight/2, 0]}>
        <meshStandardMaterial color="#444444" transparent opacity={1 - progress} />
      </Cylinder>
      <Cylinder args={[0.03, 0.03, netHeight]} position={[courtWidth/2 + 0.1, netHeight/2, 0]}>
        <meshStandardMaterial color="#444444" transparent opacity={1 - progress} />
      </Cylinder>
      
      {/* Net Support Cables */}
      <Cylinder args={[0.005, 0.005, courtWidth + 0.2]} rotation={[0, 0, Math.PI/2]} position={[0, netHeight, 0]}>
        <meshStandardMaterial color="#666666" transparent opacity={1 - progress} />
      </Cylinder>
    </group>
  );
};

// Realistic Shuttlecock Animation with proper physics
const Shuttlecock = ({ isActive, position = [0, 2, -3] }) => {
  const shuttlecockRef = useRef();
  const [phase, setPhase] = useState(0); // 0: serving, 1: flying, 2: landing
  
  useFrame((state) => {
    if (shuttlecockRef.current && isActive) {
      const time = state.clock.elapsedTime;
      const cycleTime = time % 6; // 6-second complete rally cycle
      
      // Realistic badminton rally physics
      if (cycleTime < 1) {
        // Serve phase - shuttlecock starts at back court
        shuttlecockRef.current.position.set(-1, 0.5, -2);
        shuttlecockRef.current.rotation.x = 0;
        setPhase(0);
      } else if (cycleTime < 3) {
        // Flying phase - high clear shot
        const flyTime = (cycleTime - 1) / 2; // 0 to 1
        
        // Realistic shuttlecock trajectory (high and slow due to air resistance)
        shuttlecockRef.current.position.x = -1 + flyTime * 2; // -1 to 1
        shuttlecockRef.current.position.y = 0.5 + Math.sin(flyTime * Math.PI) * 2.5; // Arc up to 3m high
        shuttlecockRef.current.position.z = -2 + flyTime * 4; // -2 to 2
        
        // Shuttlecock tumbles realistically (feathers create drag)
        shuttlecockRef.current.rotation.x = flyTime * Math.PI * 3;
        shuttlecockRef.current.rotation.z = Math.sin(flyTime * Math.PI * 4) * 0.3;
        setPhase(1);
      } else if (cycleTime < 4.5) {
        // Return shot phase
        const returnTime = (cycleTime - 3) / 1.5;
        
        // Smash trajectory - faster and steeper
        shuttlecockRef.current.position.x = 1 - returnTime * 2;
        shuttlecockRef.current.position.y = 2.5 - returnTime * returnTime * 2; // Steep drop
        shuttlecockRef.current.position.z = 2 - returnTime * 3;
        
        // Faster rotation during smash
        shuttlecockRef.current.rotation.x = (flyTime + returnTime) * Math.PI * 2;
        setPhase(1);
      } else {
        // Landing and reset
        shuttlecockRef.current.position.set(-1, 0.1, -1.5);
        shuttlecockRef.current.rotation.x = 0;
        setPhase(2);
      }
    }
  });
  
  return isActive ? (
    <group ref={shuttlecockRef} position={position}>
      {/* Realistic shuttlecock cork/rubber head */}
      <Sphere args={[0.08]}>
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Feather skirt - more realistic shape */}
      <group position={[0, -0.08, 0]}>
        {/* Individual feathers */}
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const x = Math.cos(angle) * 0.12;
          const z = Math.sin(angle) * 0.12;
          return (
            <Cylinder
              key={i}
              args={[0.005, 0.015, 0.25]}
              position={[x, -0.125, z]}
              rotation={[Math.PI * 0.1, angle, 0]}
            >
              <meshStandardMaterial 
                color="#f8f8f8" 
                transparent
                opacity={0.9}
              />
            </Cylinder>
          );
        })}
        
        {/* Feather base ring */}
        <Cylinder args={[0.12, 0.08, 0.02]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#e0e0e0" />
        </Cylinder>
      </group>
      
      {/* Motion blur effect during fast phases */}
      {phase === 1 && (
        <Sphere args={[0.15]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#ffffff"
            transparent
            opacity={0.2}
          />
        </Sphere>
      )}
    </group>
  ) : null;
};

// Badminton Rackets
const BadmintonRacket = ({ position, rotation = [0, 0, 0], isVisible = true }) => {
  const racketRef = useRef();
  
  useFrame((state) => {
    if (racketRef.current) {
      racketRef.current.rotation.z += Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }
  });
  
  return isVisible ? (
    <group ref={racketRef} position={position} rotation={rotation}>
      {/* Racket Handle */}
      <Cylinder args={[0.02, 0.02, 0.6]} position={[0, -0.3, 0]}>
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </Cylinder>
      
      {/* Racket Head Frame */}
      <Cylinder args={[0.15, 0.15, 0.015]} position={[0, 0.1, 0]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Cylinder>
      
      {/* Strings - vertical */}
      {Array.from({ length: 12 }, (_, i) => {
        const x = -0.13 + (i / 11) * 0.26;
        return (
          <Cylinder
            key={`v-${i}`}
            args={[0.001, 0.001, 0.26]}
            position={[x, 0.1, 0]}
            rotation={[Math.PI/2, 0, 0]}
          >
            <meshStandardMaterial color="#ffffff" />
          </Cylinder>
        );
      })}
      
      {/* Strings - horizontal */}
      {Array.from({ length: 12 }, (_, i) => {
        const z = -0.13 + (i / 11) * 0.26;
        return (
          <Cylinder
            key={`h-${i}`}
            args={[0.001, 0.001, 0.26]}
            position={[0, 0.1, z]}
            rotation={[0, 0, Math.PI/2]}
          >
            <meshStandardMaterial color="#ffffff" />
          </Cylinder>
        );
      })}
      
      {/* Grip wrap */}
      <Cylinder args={[0.022, 0.022, 0.15]} position={[0, -0.45, 0]}>
        <meshStandardMaterial color="#000000" roughness={0.9} />
      </Cylinder>
    </group>
  ) : null;
};

// Trophy Case (transforms into server rack)
const TrophyCase = ({ isTransitioning, progress }) => {
  const trophyRef = useRef();
  
  const trophies = [
    { position: [-2, 1, 0], color: "#FFD700", label: "Gold" },
    { position: [-0.7, 1, 0], color: "#FFD700", label: "Gold" },
    { position: [0.7, 1, 0], color: "#FFD700", label: "Gold" },
    { position: [2, 1, 0], color: "#C0C0C0", label: "Silver" },
    { position: [-1.3, 0.3, 0], color: "#C0C0C0", label: "Silver" },
  ];
  
  useFrame((state) => {
    if (trophyRef.current) {
      // Transform trophies into tech icons
      trophyRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      trophyRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  
  return (
    <group ref={trophyRef} position={[0, 0, -4]}>
      {trophies.map((trophy, index) => (
        <group key={index} position={trophy.position}>
          {/* Trophy (morphs into tech icon) */}
          <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
            <Cylinder
              args={[0.15, 0.1, 0.4]}
            >
              <meshStandardMaterial 
                color={isTransitioning ? "#4A90E2" : trophy.color}
                metalness={0.8}
                roughness={0.2}
                emissive={isTransitioning ? "#4A90E2" : trophy.color}
                emissiveIntensity={isTransitioning ? 0.3 : 0.1}
              />
            </Cylinder>
          </Float>
          
          {/* Label */}
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {isTransitioning ? "Tech" : trophy.label}
          </Text>
        </group>
      ))}
      
      {/* Case/Server Rack */}
      <Box
        args={[5, 2.5, 0.5]}
        position={[0, 0.5, -0.5]}
      >
        <meshStandardMaterial 
          color={isTransitioning ? "#2a2a2a" : "#8B4513"}
          metalness={isTransitioning ? 0.8 : 0.1}
          roughness={isTransitioning ? 0.2 : 0.8}
        />
      </Box>
    </group>
  );
};

// Tech Particles (appear during transition)
const TechParticles = ({ progress }) => {
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  
  const particles = Array.from({ length: 20 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 10,
      Math.random() * 5,
      (Math.random() - 0.5) * 10
    ],
    delay: Math.random() * 2
  }));
  
  return progress > 0.3 ? (
    <group ref={particlesRef}>
      {particles.map((particle, index) => (
        <Float
          key={index}
          speed={2}
          rotationIntensity={1}
          floatIntensity={2}
        >
          <Sphere args={[0.05]} position={particle.position}>
            <meshStandardMaterial 
              color="#4A90E2"
              emissive="#4A90E2"
              emissiveIntensity={0.5}
              transparent
              opacity={progress}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  ) : null;
};

// Main Transition Scene
const BadmintonToTechScene = () => {
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sceneRef = useRef();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionProgress(prev => {
        if (prev >= 1) {
          setTimeout(() => {
            setTransitionProgress(0);
            setIsTransitioning(false);
          }, 2000);
          return 1;
        }
        if (prev > 0.2) {
          setIsTransitioning(true);
        }
        return prev + 0.01;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });
  
  return (
    <group ref={sceneRef}>
      {/* Enhanced Lighting for realistic badminton court */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[8, 10, 8]} 
        intensity={0.8} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#ffffff" />
      <pointLight position={[-3, 2, -2]} intensity={0.2} color="#4A90E2" />
      <pointLight position={[3, 2, 2]} intensity={0.2} color="#228B22" />
      
      {/* Badminton Court */}
      <BadmintonCourt 
        isTransitioning={isTransitioning} 
        progress={transitionProgress} 
      />
      
      {/* Shuttlecock */}
      <Shuttlecock isActive={!isTransitioning} />
      
      {/* Badminton Rackets positioned around court */}
      <BadmintonRacket 
        position={[-1.5, 0.2, -2.5]} 
        rotation={[0, Math.PI/4, Math.PI/6]}
        isVisible={!isTransitioning}
      />
      <BadmintonRacket 
        position={[1.8, 0.2, 2.2]} 
        rotation={[0, -Math.PI/3, -Math.PI/8]}
        isVisible={!isTransitioning}
      />
      
      {/* Trophy Case -> Server Rack */}
      <TrophyCase 
        isTransitioning={isTransitioning} 
        progress={transitionProgress} 
      />
      
      {/* Tech Particles */}
      <TechParticles progress={transitionProgress} />
      
      {/* Transition Text */}
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.4}
        color={isTransitioning ? "#4A90E2" : "#228B22"}
        anchorX="center"
        anchorY="middle"
      >
        {isTransitioning ? "From Courts to Code" : "Competitive Excellence"}
      </Text>
      
      {/* Sub Text */}
      <Text
        position={[0, 3.8, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {isTransitioning ? "Applying Athletic Discipline to Data Engineering" : "3 Gold, 5 Silver Medals in Finland"}
      </Text>
      
      {/* Court type indicator */}
      {!isTransitioning && (
        <Text
          position={[0, 0.05, -2.8]}
          fontSize={0.15}
          color="#90EE90"
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI/2, 0, 0]}
        >
          Professional Indoor Court
        </Text>
      )}
    </group>
  );
};

const BadmintonToTechCanvas = () => {
  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{
        fov: 50,
        near: 0.1,
        far: 200,
        position: [8, 6, 8], // Better angle to see the full court
      }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: true,
        shadowMapEnabled: true,
        shadowMapType: THREE.PCFSoftShadowMap
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.2} // Slower rotation for better viewing
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.5} // Don't go too low
          minPolarAngle={Math.PI / 8}   // Nice overhead view
          maxDistance={18}
          minDistance={4}
          target={[0, 0, 0]} // Focus on center of court
        />
        <BadmintonToTechScene />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default BadmintonToTechCanvas;
