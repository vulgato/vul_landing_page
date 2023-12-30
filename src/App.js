import logo from './logo.svg';
import './App.css';
import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader} from 'react-three-fiber';
import { MeshStandardMaterial } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls} from '@react-three/drei';
import model from './assets/vulgato.obj';


function Model({ url }) {
  const obj = useLoader(OBJLoader, url);
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(obj.position);
  });

  // Create a material and set its color.
  const material = new MeshStandardMaterial({ color: 0x60e1fa }); // Red color.

  // Apply the material to all children of the model.
  obj.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });

  return <primitive object={obj} />;
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight />
          <Suspense fallback={null}>
            <Model url={model} />
          </Suspense>
          <OrbitControls />
        </Canvas>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
    </div>
  );
}

export default App;
