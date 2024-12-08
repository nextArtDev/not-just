import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Stack, useRouter } from 'expo-router'
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from 'expo-camera'
import { useEffect, useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
//https://notjust.notion.site/Camera-0e431cdfec744f8f8cd6483d529d3d26?p=f0bf37f91ba14b0bbf71f6e3f0a54475&pm=s

export default function CameraScreen() {
  const router = useRouter()
  const [permission, requestPermission] = useCameraPermissions()
  const [facing, setFacing] = useState<CameraType>('back')
  const [picture, setPicture] = useState<CameraCapturedPicture>()
  const cameraRef = useRef<CameraView>(null)

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission()
    }
  }, [permission])

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'))
  }

  const takePicture = async () => {
    const res = await cameraRef.current?.takePictureAsync()
    setPicture(res)
    // console.log({ res })
  }

  if (!permission?.granted) {
    return (
      <View className="  w-full h-full flex items-center justify-center  ">
        <ActivityIndicator size={70} />
      </View>
    )
  }

  if (picture) {
    return (
      <View>
        <Image source={{ uri: picture.uri }} className="w-full h-full" />
        <MaterialIcons
          onPress={() => {
            setPicture(undefined)
          }}
          name="close"
          size={35}
          color="white"
          className="absolute top-12 left-4 text-red-500 "
          // style={{ position: 'absolute', top: 50, left: 20 }}
        />
      </View>
    )
  }
  return (
    <View className="  ">
      <CameraView
        ref={cameraRef}
        facing={facing}
        style={{ width: '100%', height: '100%' }}
        className=" "
      >
        <View
          style={{ backgroundColor: '#00000099' }}
          className=" mt-auto p-4 px-8 pb-12 flex-row justify-between items-center bg-[#00000099]"
        >
          <View />
          <Pressable
            onPress={takePicture}
            className="w-12 h-12 rounded-full bg-white"
          />
          <MaterialIcons
            name="flip-camera-android"
            color={'white'}
            size={24}
            className=" "
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>
      <MaterialIcons
        name="close"
        color={'white'}
        size={30}
        className="absolute inset-0 w-full h-full top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 "
        onPress={() => router.back()}
      />
    </View>
  )
}
