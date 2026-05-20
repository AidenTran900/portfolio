import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, invalidate } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

const screenColor = new THREE.Color('#ffffff')

function GLTFCamera({ cameras }: { cameras: THREE.Camera[] }) {
  const { set, size } = useThree()
  const [initialFov, setInitialFov] = useState<number | null>(null)

  useEffect(() => {
    if (!cameras?.length) return
    const cam = cameras[0]
    if (!(cam instanceof THREE.PerspectiveCamera)) return

    if (initialFov === null) {
      const newFov = cam.fov * 1.1
      setInitialFov(newFov)
      cam.fov = newFov
    } else {
      cam.fov = initialFov
    }
    cam.aspect = size.width / size.height
    cam.updateProjectionMatrix()
    set({ camera: cam })
  }, [cameras, set, size, initialFov])

  return null
}

const tempVec3 = new THREE.Vector3()
const tempVec3_2 = new THREE.Vector3()
const tempQuat = new THREE.Quaternion()

function LaptopModel({ isOpen }: { isOpen: boolean }) {
  const { scene, cameras } = useGLTF('/models/Laptop/thinkpad.glb')
  const topLidRef = useRef<THREE.Object3D | null>(null)
  const screenRef = useRef<THREE.Object3D | null>(null)
  const screenLightRef = useRef<THREE.PointLight>(null)
  const [targetRotation, setTargetRotation] = useState(Math.PI * 0.67)

  const screenEmissiveIntensity = 1
  const screenRotationOffset = 1.05

  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      const nameLower = child.name.toLowerCase()
      if (nameLower.includes('lid') || (nameLower.includes('top') && !nameLower.includes('screen'))) {
        topLidRef.current = child
      }
      if (nameLower.includes('screen') || nameLower.includes('display')) {
        screenRef.current = child
      }
      if (child instanceof THREE.Mesh && child.material) {
        const isScreen = nameLower.includes('screen') || nameLower.includes('display')
        const clone = Array.isArray(child.material)
          ? child.material.map((m) => m.clone())
          : child.material.clone()
        const apply = (mat: THREE.Material) => {
          if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
            if (isScreen) {
              mat.emissive = screenColor
              mat.emissiveIntensity = screenEmissiveIntensity
              mat.toneMapped = false
            } else {
              mat.metalness = Math.max(mat.metalness, 0.3)
              mat.roughness = Math.min(mat.roughness, 0.7)
              mat.envMapIntensity = 1.4
            }
            mat.needsUpdate = true
          }
        }
        if (Array.isArray(clone)) clone.forEach(apply)
        else apply(clone)
        child.material = clone
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  useEffect(() => {
    setTargetRotation(isOpen ? Math.PI * 0.12 : Math.PI * 0.67)
    invalidate()
  }, [isOpen])

  useFrame((_, delta) => {
    const clampedDelta = Math.min(delta, 0.1)
    const lerpFactor = 1 - Math.pow(0.001, clampedDelta)
    let needsUpdate = false

    if (topLidRef.current) {
      const diff = targetRotation - topLidRef.current.rotation.x
      if (Math.abs(diff) > 0.001) {
        topLidRef.current.rotation.x += diff * lerpFactor
        needsUpdate = true
      }
    }

    if (screenRef.current) {
      const target = targetRotation + screenRotationOffset
      const diff = target - screenRef.current.rotation.x
      if (Math.abs(diff) > 0.001) {
        screenRef.current.rotation.x += diff * lerpFactor
        needsUpdate = true
      }
      if (screenLightRef.current) {
        screenRef.current.getWorldPosition(tempVec3)
        screenRef.current.getWorldQuaternion(tempQuat)
        tempVec3_2.set(0, 0, 1).applyQuaternion(tempQuat).multiplyScalar(0.3)
        screenLightRef.current.position.copy(tempVec3.add(tempVec3_2))
        screenLightRef.current.intensity = isOpen ? 8 : 0
      }
    }

    if (needsUpdate) invalidate()
  })

  return (
    <group>
      {cameras && cameras.length > 0 && <GLTFCamera cameras={cameras} />}
      <pointLight ref={screenLightRef} color={screenColor} intensity={8} distance={5} decay={2} />
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/Laptop/thinkpad.glb')

export function Laptop3D({ isOpen }: { isOpen: boolean }) {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      frameloop="demand"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <LaptopModel isOpen={isOpen} />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  )
}
