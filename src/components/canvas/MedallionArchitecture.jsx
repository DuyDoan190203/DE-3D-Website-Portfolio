import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Text, Cylinder, Sphere, Torus } from "@react-three/drei";
import * as THREE from 'three';

import CanvasLoader from "../Loader";

// Medallion Layer Component
const MedallionLayer = ({ position, color, label, emissiveColor, radius = 3, height = 0.5 }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
  });

  return (
    <group position={position}>
      <Cylinder 
        ref={meshRef}
        args={[radius, radius, height, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>
      <Text
        position={[0, -2, 0]}
        fontSize={0.4}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

// Data Flow Between Layers
const LayerDataFlow = ({ start, end, color }) => {
  const groupRef = useRef();
  const [particles] = useState(() => {
    const particleArray = [];
    for (let i = 0; i < 15; i++) {
      particleArray.push({
        id: i,
        progress: i / 15,
      });
    }
    return particleArray;
  });

  useFrame(() => {
    if (groupRef.current) {
      particles.forEach((particle, index) => {
        particle.progress += 0.008;
        if (particle.progress > 1) particle.progress = 0;
        
        const x = THREE.MathUtils.lerp(start[0], end[0], particle.progress);
        const y = THREE.MathUtils.lerp(start[1], end[1], particle.progress) + 
                  Math.sin(particle.progress * Math.PI * 4) * 0.5;
        const z = THREE.MathUtils.lerp(start[2], end[2], particle.progress);
        
        if (groupRef.current.children[index]) {
          groupRef.current.children[index].position.set(x, y, z);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle) => (
        <Sphere key={particle.id} args={[0.08]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
};

// Data Quality Improvement Indicator
const QualityIndicator = ({ position, percentage }) => {
  const ringRef = useRef();

  useFrame((state) => {
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
  });

  return (
    <group position={position}>
      <Torus ref={ringRef} args={[1, 0.1, 8, 32]}>
        <meshStandardMaterial color="#00CED1" emissive="#00CED1" emissiveIntensity={0.3} />
      </Torus>
      <Text
        fontSize={0.3}
        color="#00CED1"
        anchorX="center"
        anchorY="middle"
      >
        {percentage}%
      </Text>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Data Quality
      </Text>
    </group>
  );
};

// Processing Time Reduction
const ProcessingTimeIndicator = ({ position }) => {
  const [reduction, setReduction] = useState(80);
  const cubeRef = useRef();

  useFrame((state) => {
    cubeRef.current.rotation.x = state.clock.elapsedTime * 0.4;
    cubeRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    
    // Animate reduction percentage
    const animatedReduction = 80 + Math.sin(state.clock.elapsedTime) * 2;
    setReduction(Math.round(animatedReduction));
  });

  return (
    <group position={position}>
      <Cylinder ref={cubeRef} args={[0.8, 0.8, 1.5, 6]}>
        <meshStandardMaterial color="#228B22" emissive="#228B22" emissiveIntensity={0.2} />
      </Cylinder>
      <Text
        position={[0, 0, 1]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        -{reduction}%
      </Text>
      <Text
        position={[0, -2, 0]}
        fontSize={0.15}
        color="#228B22"
        anchorX="center"
        anchorY="middle"
      >
        Manual Processing
      </Text>
    </group>
  );
};

// Main Medallion Architecture Visualization
const MedallionVisualization = () => {
  return (
    <>
      {/* Bronze Layer (Raw Data) */}
      <MedallionLayer 
        position={[-6, 0, 0]} 
        color="#CD7F32" 
        emissiveColor="#8B4513"
        label="Bronze Layer"
        radius={2.5}
      />
      
      {/* Silver Layer (Cleaned Data) */}
      <MedallionLayer 
        position={[0, 0, 0]} 
        color="#C0C0C0" 
        emissiveColor="#808080"
        label="Silver Layer"
        radius={3}
      />
      
      {/* Gold Layer (Business Ready) */}
      <MedallionLayer 
        position={[6, 0, 0]} 
        color="#FFD700" 
        emissiveColor="#DAA520"
        label="Gold Layer"
        radius={3.5}
      />

      {/* Data Flows */}
      <LayerDataFlow 
        start={[-3.5, 0.5, 0]} 
        end={[-2.5, 0.5, 0]} 
        color="#4A90E2" 
      />
      <LayerDataFlow 
        start={[2.5, 0.5, 0]} 
        end={[3.5, 0.5, 0]} 
        color="#228B22" 
      />

      {/* Performance Indicators */}
      <QualityIndicator position={[0, 4, 0]} percentage={95} />
      <ProcessingTimeIndicator position={[-6, 4, 0]} />

      {/* Architecture Label */}
      <Text
        position={[0, -4, 0]}
        fontSize={0.5}
        color="#4A90E2"
        anchorX="center"
        anchorY="middle"
      >
        Medallion Architecture
      </Text>
      <Text
        position={[0, -5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        AWS + Infrastructure as Code
      </Text>

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#FFD700" />
      <pointLight position={[-10, 10, 10]} intensity={1} color="#C0C0C0" />
      <pointLight position={[0, -10, 10]} intensity={0.8} color="#CD7F32" />
    </>
  );
};

const MedallionArchitectureCanvas = () => {
  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 6, 15], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          autoRotate={true}
          autoRotateSpeed={0.8}
        />
        <MedallionVisualization />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default MedallionArchitectureCanvas; 