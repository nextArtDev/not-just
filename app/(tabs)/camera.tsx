import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  Button,
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
import { SafeAreaView } from 'react-native-safe-area-context'
import path from 'path'
import * as FileSystem from 'expo-file-system'
import { Video } from 'expo-av'
//https://notjust.notion.site/Camera-0e431cdfec744f8f8cd6483d529d3d26?p=f0bf37f91ba14b0bbf71f6e3f0a54475&pm=s

export default function CameraScreen() {
  const router = useRouter()
  const [permission, requestPermission] = useCameraPermissions()
  const [facing, setFacing] = useState<CameraType>('back')
  const [picture, setPicture] = useState<CameraCapturedPicture>()
  const [isRecording, setIsRecording] = useState(false)
  const [video, setVideo] = useState<string>()

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
  const onPress = () => {
    if (isRecording) {
      cameraRef.current?.stopRecording()
    } else {
      takePicture()
    }
  }
  const startRecording = async () => {
    setIsRecording(true)
    const res = await cameraRef.current?.recordAsync({ maxDuration: 60 })
    setVideo(res?.uri)
    console.log({ res })
    setIsRecording(false)
  }

  const saveFile = async (uri: string) => {
    const filename = path.parse(uri).base
    await FileSystem.copyAsync({
      from: uri,
      to: FileSystem.documentDirectory + filename,
    })
    setPicture(undefined)
    setVideo(undefined)
    router.back()
  }

  if (!permission?.granted) {
    return (
      <View className="  w-full h-full flex items-center justify-center  ">
        <ActivityIndicator size={70} />
      </View>
    )
  }

  if (picture || video) {
    return (
      <View className="flex-1">
        {picture && (
          <Image source={{ uri: picture.uri }} className="w-full flex-1" />
        )}
        {video && (
          <Video
            source={{ uri: video }}
            className="w-full flex-1"
            shouldPlay
            isLooping
          />
        )}
        <View className="p-2.5">
          <SafeAreaView edges={['bottom']}>
            <Button
              title="Save"
              onPress={() => saveFile(picture?.uri || video)}
            />
          </SafeAreaView>
        </View>
        <MaterialIcons
          onPress={() => {
            setPicture(undefined)
            setVideo(undefined)
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
        mode="video"
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
            onPress={onPress}
            onLongPress={startRecording}
            className="w-12 h-12 rounded-full bg-white"
            style={{ backgroundColor: isRecording ? 'crimson' : 'white' }}
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
