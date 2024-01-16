import React, { Suspense } from 'react';
//import { MeshStandardMaterial } from '@react-three/fiber';
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls} from '@react-three/drei';
import model from '../assets/vulgato.obj';
import { Canvas } from '@react-three/fiber';
import { useFrame, useLoader } from '@react-three/fiber';

function Model({ url }) {
  const obj = useLoader(OBJLoader, url);
  const mesh = React.useRef();

  React.useEffect(() => {
    if (obj) {
      obj.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({ color: 0x2d6cea });
        }
      });
      mesh.current = obj;
    }
  }, [obj]);

  useFrame(({ clock }) => {
    if (mesh.current) { // Check if the object is loaded before accessing it
      mesh.current.rotation.y = clock.getElapsedTime();
    }
  });

  return obj ? <primitive ref={mesh} object={obj} /> : null;
}

const ThreeDContainer = ({className}) => {
    return (
        <div className={className}>
            <Canvas camera={{ position: [5, 2, 0] }} style={{width : 'fit-content'}}>
              <ambientLight intensity={2.8} />
              <Suspense fallback={null}>
                <Model url={model} />
              </Suspense>
              <OrbitControls
                minDistance={5} 
                maxDistance={10} />
            </Canvas>
        </div>
    );
};

export default ThreeDContainer;
