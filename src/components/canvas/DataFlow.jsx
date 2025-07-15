import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const DataSphere = ({ position, color, scrollY }) => {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.3;
      
      // Apply scroll-based transformations
      const scrollFactor = scrollY * 0.01;
      mesh.current.position.z = position[2] + Math.sin(scrollFactor) * 2;
      mesh.current.scale.setScalar(1 + Math.sin(scrollFactor + position[0]) * 0.2);
    }
  });

  return (
    <Sphere ref={mesh} args={[1, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        wireframe={false}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

const DataFlow = () => {
  const [scrollY, setScrollY] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const spheres = [
    { position: [-4, 2, 0], color: "#4A90E2" },
    { position: [4, -2, 0], color: "#228B22" },
    { position: [0, 0, -3], color: "#00CED1" },
    { position: [-2, -3, 2], color: "#4A90E2" },
    { position: [3, 1, 1], color: "#228B22" },
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {spheres.map((sphere, index) => (
        <DataSphere
          key={index}
          position={sphere.position}
          color={sphere.color}
          scrollY={scrollY}
        />
      ))}
      
      {/* Data connection lines */}
      {spheres.map((_, index) => {
        if (index < spheres.length - 1) {
          return (
            <line key={`line-${index}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    ...spheres[index].position,
                    ...spheres[index + 1].position,
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00CED1" transparent opacity={0.6} />
            </line>
          );
        }
        return null;
      })}
    </Canvas>
  );
};

export default DataFlow; 