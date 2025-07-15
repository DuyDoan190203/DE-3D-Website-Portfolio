import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Text, Box, Sphere, Plane } from "@react-three/drei";
import * as THREE from 'three';

import CanvasLoader from "../Loader";

// Clinical Record Particle System
const ClinicalRecords = () => {
  const groupRef = useRef();
  const [particles] = useState(() => {
    const particleArray = [];
    for (let i = 0; i < 100; i++) {
      particleArray.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 20
        ],
        velocity: [
          (Math.random() - 0.5) * 0.02,
          Math.random() * 0.01,
          (Math.random() - 0.5) * 0.02
        ],
        color: `hsl(${Math.random() * 60 + 180}, 70%, ${Math.random() * 30 + 50}%)`
      });
    }
    return particleArray;
  });

  useFrame(() => {
    if (groupRef.current) {
      particles.forEach((particle, index) => {
        particle.position[0] += particle.velocity[0];
        particle.position[1] += particle.velocity[1];
        particle.position[2] += particle.velocity[2];

        // Reset particles that go too far
        if (particle.position[1] > 8) {
          particle.position[1] = -5;
          particle.position[0] = (Math.random() - 0.5) * 20;
          particle.position[2] = (Math.random() - 0.5) * 20;
        }

        const mesh = groupRef.current.children[index];
        if (mesh) {
          mesh.position.set(...particle.position);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle) => (
        <Sphere key={particle.id} args={[0.05]} position={particle.position}>
          <meshStandardMaterial 
            color={particle.color} 
            emissive={particle.color} 
            emissiveIntensity={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
};

// Data Quality Monitor
const DataQualityMonitor = ({ position }) => {
  const meshRef = useRef();
  const [qualityLevel, setQualityLevel] = useState(95);

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    // Simulate quality fluctuation
    const newQuality = 95 + Math.sin(state.clock.elapsedTime * 2) * 2;
    setQualityLevel(Math.round(newQuality));
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[2, 1, 0.1]}>
        <meshStandardMaterial color="#228B22" />
      </Box>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Data Quality: {qualityLevel}%
      </Text>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.15}
        color="#228B22"
        anchorX="center"
        anchorY="middle"
      >
        95% Quality Improvement
      </Text>
    </group>
  );
};

// Processing Pipeline Visualization
const ProcessingPipeline = ({ position }) => {
  const pipeRef = useRef();

  useFrame((state) => {
    pipeRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <group position={position}>
      <Box ref={pipeRef} args={[4, 0.5, 0.5]}>
        <meshStandardMaterial color="#4A90E2" />
      </Box>
      <Text
        position={[0, -1, 0]}
        fontSize={0.15}
        color="#4A90E2"
        anchorX="center"
        anchorY="middle"
      >
        Apache Airflow Pipeline
      </Text>
    </group>
  );
};

// HIPAA Compliance Shield
const HIPAAShield = ({ position }) => {
  const shieldRef = useRef();

  useFrame((state) => {
    shieldRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    shieldRef.current.material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
  });

  return (
    <group position={position}>
      <Sphere ref={shieldRef} args={[1.5, 8, 6]}>
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700"
          emissiveIntensity={0.2}
          wireframe 
        />
      </Sphere>
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.2}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        HIPAA Compliant
      </Text>
    </group>
  );
};

// 5M Records Counter
const RecordCounter = ({ position }) => {
  const [count, setCount] = useState(0);

  useFrame((state) => {
    const targetCount = 5000000;
    const currentCount = Math.floor((Math.sin(state.clock.elapsedTime * 0.5) + 1) * targetCount / 2);
    setCount(currentCount);
  });

  return (
    <group position={position}>
      <Text
        fontSize={0.4}
        color="#00CED1"
        anchorX="center"
        anchorY="middle"
      >
        {count.toLocaleString()}
      </Text>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Clinical Records Processed
      </Text>
    </group>
  );
};

// Main Healthcare Visualization
const HealthcareVisualization = () => {
  return (
    <>
      <ClinicalRecords />
      <DataQualityMonitor position={[-4, 2, 0]} />
      <ProcessingPipeline position={[0, 0, 0]} />
      <HIPAAShield position={[4, 2, 0]} />
      <RecordCounter position={[0, 4, 0]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4A90E2" />
      <pointLight position={[-10, 10, 10]} intensity={0.8} color="#228B22" />
      <pointLight position={[0, -10, 10]} intensity={0.6} color="#FFD700" />
    </>
  );
};

const HealthcareDataCanvas = () => {
  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 8, 12], fov: 60 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          autoRotate={true}
          autoRotateSpeed={1}
        />
        <HealthcareVisualization />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default HealthcareDataCanvas; 