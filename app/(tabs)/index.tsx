import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  Pressable,
  FlatList,
} from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Link, useFocusEffect } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { useCallback, useEffect, useState } from 'react'
import * as FileSystem from 'expo-file-system'

type Media = {
  name: string
  uri: string
}

export default function HomeScreen() {
  const [images, setImages] = useState<Media[]>([])

  // useEffect(() => {
  //   loadFiles()
  // }, [])

  useFocusEffect(
    useCallback(() => {
      loadFiles()
    }, [])
  )
  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) return
    const res = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    )
    // console.log({ res })
    setImages(
      res.map((file) => ({
        name: file,
        uri: FileSystem.documentDirectory + file,
        //  type: getMediaType(file),
      }))
    )
  }
  // console.log(JSON.stringify(images, null, 2))
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={images}
        numColumns={3}
        contentContainerStyle={{ gap: 1 }}
        columnWrapperStyle={{ gap: 1 }}
        renderItem={({ item }) => (
          <Link href={`/${item.name}`} asChild>
            <Pressable style={{ flex: 1, maxWidth: '33.33%' }}>
              <Image
                source={{ uri: item.uri }}
                style={{ aspectRatio: 3 / 4, borderRadius: 5 }}
              />
            </Pressable>
          </Link>
        )}
      />
    </View>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText className="text-black" type="title">
    //       <Text className="text-black">Welcome!</Text>
    //     </ThemedText>
    //     <Link
    //       className="w-fit h-fit absolute button-10 right-4"
    //       asChild
    //       href={'/camera'}
    //     >
    //       <Pressable className="flex flex-col items-center justify-center  ">
    //         <MaterialIcons
    //           className=" rounded-full "
    //           name="camera"
    //           size={30}
    //           color={'white'}
    //         />
    //         <Text className="text-white">Camera</Text>
    //       </Pressable>
    //     </Link>
    //     {/* <View className="flex flex-row-reverse gap-2">
    //       <View className="flex items-center justify-center w-16 h-8  bg-green-500 rounded-full"></View>
    //       <View className="w-8 h-8 text-red-400 bg-red-500 rounded-full"></View>
    //       <View className="w-8 h-8 text-red-400 bg-yellow-500 rounded-full"></View>
    //     </View> */}
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit{' '}
    //       <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{' '}
    //       to see changes. Press{' '}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({
    //           ios: 'cmd + d',
    //           android: 'cmd + m',
    //           web: 'F12',
    //         })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       Tap the Explore tab to learn more about what's included in this
    //       starter app.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       When you're ready, run{' '}
    //       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{' '}
    //       to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{' '}
    //       directory. This will move the current{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
