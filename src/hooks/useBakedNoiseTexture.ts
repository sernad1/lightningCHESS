import { useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

const noiseVertexShader = `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const noiseFragmentShader = `
  varying vec2 vUv;

  float random(vec2 st){
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float valueNoise(vec2 st){
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main(){
      vec2 coord = vUv * 12.0;
      float n = valueNoise(coord);
      
      gl_FragColor = vec4(vec3(n), 1.0);
  }
`;

export function useBakedNoiseTexture(size = 512) {
  const { gl } = useThree();

  return useMemo(() => {
    const renderTarget = new THREE.WebGLRenderTarget(size, size, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const material = new THREE.ShaderMaterial({
      vertexShader: noiseVertexShader,
      fragmentShader: noiseFragmentShader,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    gl.setRenderTarget(renderTarget);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    quad.geometry.dispose();
    material.dispose();

    return renderTarget.texture;
  }, [gl, size]);
}
