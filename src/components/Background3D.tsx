import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Trail, Sparkles } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function TechShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();

        // Smooth rotation - SLOWER for stability
        meshRef.current.rotation.x = Math.cos(t / 8) / 4;
        meshRef.current.rotation.y = Math.sin(t / 8) / 4;
        meshRef.current.rotation.z = Math.sin(t / 4) / 4;

        // Gentle floating
        const scale = 1 + Math.sin(t * 1) * 0.02;
        meshRef.current.scale.set(scale, scale, scale);
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[2.5, 0]} /> {/* Low poly look */}
                <meshBasicMaterial
                    color="#94a3b8" // Slate 400
                    wireframe
                    transparent
                    opacity={0.2}
                />
            </mesh>

            {/* Inner core */}
            <mesh scale={[0.5, 0.5, 0.5]}>
                <octahedronGeometry args={[2, 0]} />
                <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
            </mesh>
        </Float>
    );
}

function SceneContent() {
    return (
        <>
            <group position={[0, 0, -5]}>
                <TechShape />
            </group>

            {/* Stars removed for clean look */}
            <Sparkles
                count={30}
                scale={10}
                size={2}
                speed={0.2}
                opacity={0.4}
                color="#60a5fa"
            />
        </>
    );
}

export default function Background3D() {
    return (
        <div className="fixed inset-0 -z-0 pointer-events-none opacity-60">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
            >
                <SceneContent />
            </Canvas>
        </div>
    );
}
