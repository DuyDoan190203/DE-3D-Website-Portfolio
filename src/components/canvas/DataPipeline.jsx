import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Text, Box, Sphere, Cylinder, Line } from "@react-three/drei";
import * as THREE from 'three';

import CanvasLoader from "../Loader";

// Data Source Node (API/Database)
const DataSource = ({ position, label, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

// ETL Processing Node
const ETLNode = ({ position, label, nodeType }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
  });

  const getColor = () => {
    switch(nodeType) {
      case 'extract': return '#4A90E2';
      case 'transform': return '#228B22';
      case 'load': return '#FFD700';
      default: return '#4A90E2';
    }
  };

  return (
    <group position={position}>
      <Cylinder 
        ref={meshRef}
        args={[0.8, 0.8, 1.5, 6]} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={getColor()} />
      </Cylinder>
      <Text
        position={[0, -2, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

// AWS Cloud Destination
const CloudDestination = ({ position, service }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
  });

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[1, 16, 16]}>
        <meshStandardMaterial color="#FF9500" wireframe />
      </Sphere>
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="#FF9500"
        anchorX="center"
        anchorY="middle"
      >
        AWS {service}
      </Text>
    </group>
  );
};

// Animated Data Flow Particles
const DataFlow = ({ start, end, color = "#00CED1" }) => {
  const particlesRef = useRef();
  const [particles] = useState(() => {
    const particleArray = [];
    for (let i = 0; i < 20; i++) {
      particleArray.push({
        id: i,
        progress: i / 20,
      });
    }
    return particleArray;
  });

  useFrame((state) => {
    if (particlesRef.current) {
      particles.forEach((particle, index) => {
        particle.progress += 0.01;
        if (particle.progress > 1) particle.progress = 0;
        
        const x = THREE.MathUtils.lerp(start[0], end[0], particle.progress);
        const y = THREE.MathUtils.lerp(start[1], end[1], particle.progress) + Math.sin(particle.progress * Math.PI * 2) * 0.5;
        const z = THREE.MathUtils.lerp(start[2], end[2], particle.progress);
        
        if (particlesRef.current.children[index]) {
          particlesRef.current.children[index].position.set(x, y, z);
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle) => (
        <Sphere key={particle.id} args={[0.05]} position={[0, 0, 0]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </Sphere>
      ))}
    </group>
  );
};

// Main Pipeline Visualization
const PipelineVisualization = () => {
  return (
    <>
      {/* Data Sources */}
      <DataSource position={[-8, 2, 0]} label="APIs" color="#4A90E2" />
      <DataSource position={[-8, -2, 0]} label="Databases" color="#228B22" />
      
      {/* ETL Nodes */}
      <ETLNode position={[-4, 0, 0]} label="Extract" nodeType="extract" />
      <ETLNode position={[0, 0, 0]} label="Transform" nodeType="transform" />
      <ETLNode position={[4, 0, 0]} label="Load" nodeType="load" />
      
      {/* AWS Cloud Destinations */}
      <CloudDestination position={[8, 2, 0]} service="S3" />
      <CloudDestination position={[8, -2, 0]} service="Redshift" />
      
      {/* Data Flow Lines */}
      <DataFlow start={[-7, 2, 0]} end={[-4.5, 0.5, 0]} color="#4A90E2" />
      <DataFlow start={[-7, -2, 0]} end={[-4.5, -0.5, 0]} color="#228B22" />
      <DataFlow start={[-3.5, 0, 0]} end={[-0.5, 0, 0]} color="#00CED1" />
      <DataFlow start={[0.5, 0, 0]} end={[3.5, 0, 0]} color="#FFD700" />
      <DataFlow start={[4.5, 0.5, 0]} end={[7, 2, 0]} color="#FF9500" />
      <DataFlow start={[4.5, -0.5, 0]} end={[7, -2, 0]} color="#FF9500" />
      
      {/* Background Elements */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
    </>
  );
};

const DataPipelineCanvas = () => {
  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 5, 15], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          enablePan={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        <PipelineVisualization />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default DataPipelineCanvas; 