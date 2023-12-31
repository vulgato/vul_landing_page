import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from 'react-three-fiber';
import { MeshStandardMaterial } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls} from '@react-three/drei';
import model from '../assets/vulgato.obj';


function Model({ url }) {
  const obj = useLoader(OBJLoader, url);
  const mesh = React.useRef();

  // Apply the material to all children of the model.
  React.useEffect(() => {
    if (obj) {
      obj.traverse((child) => {
        if (child.isMesh) {
          child.material = new MeshStandardMaterial({ color: 0x7F47DD });
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
            <Canvas camera={{ position: [5, 2, 0] }}>
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
