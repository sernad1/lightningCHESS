import { useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { usePreferredBoardTheme } from '@/stores/usePreferencesStore';

const boardVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const boardFragmentShader = `
  varying vec2 vUv;
  uniform vec3 uLightSquare;
  uniform vec3 uDarkSquare;

  void main() {
    vec2 pos = floor(vUv * 8.0);
    float pattern = 1.0 - mod(pos.x + pos.y, 2.0);
    
    vec3 color = mix(uLightSquare, uDarkSquare, pattern);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function useChessBoardTexture(size = 1024) {
  const { gl } = useThree();
  const theme = usePreferredBoardTheme();

  return useMemo(() => {
    const renderTarget = new THREE.WebGLRenderTarget(size, size, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const material = new THREE.ShaderMaterial({
      vertexShader: boardVertexShader,
      fragmentShader: boardFragmentShader,
      uniforms: {
        uLightSquare: { value: new THREE.Color(theme.lightSquare) },
        uDarkSquare: { value: new THREE.Color(theme.darkSquare) },
      },
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    gl.setRenderTarget(renderTarget);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    quad.geometry.dispose();
    material.dispose();

    return renderTarget.texture;
  }, [gl, size, theme.lightSquare, theme.darkSquare]);
}
