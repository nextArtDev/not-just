import { Link, useLocalSearchParams, Stack, router } from 'expo-router'
import { View, Image } from 'react-native'
import * as FileSystem from 'expo-file-system'
import { MaterialIcons } from '@expo/vector-icons'
import { getMediaType } from '@/utils/media'
import { ResizeMode, Video } from 'expo-av'
import { useVideoPlayer, VideoView } from 'expo-video'
// import { name } from '@/babel.config'
// import { getMediaType } from '../utils/media';
// import { ResizeMode, Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library'

export default function ImageScreen() {
  const { name } = useLocalSearchParams<{ name: string }>()
  const [permissionResponse, requestPermissions] = MediaLibrary.usePermissions()

  const fullUri = (FileSystem.documentDirectory || '') + (name || '')
  const type = getMediaType(fullUri)

  const player = useVideoPlayer(fullUri, (player) => {
    player.loop = true
    player.play()
  })

  const onDelete = async () => {
    await FileSystem.deleteAsync(fullUri)
    router.back()
  }

  const onSave = async () => {
    // save to media library
    if (permissionResponse?.status !== 'granted') {
      await requestPermissions()
    }
    const asset = await MediaLibrary.createAssetAsync(fullUri)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: 'Media',
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                gap: 5,
                backgroundColor: 'red',
              }}
            >
              <MaterialIcons
                onPress={onDelete}
                name="delete"
                size={26}
                color="crimson"
              />
              <MaterialIcons
                onPress={onSave}
                name="save"
                size={26}
                color="dimgray"
              />
            </View>
          ),
        }}
      />
      {type === 'image' && (
        <Image
          source={{ uri: fullUri }}
          style={{ width: '100%', height: '100%' }}
        />
      )}
      <View
        style={{ flexDirection: 'row' }}
        className="flex flex-1 flex-row items-center justify-center w-full"
      >
        <MaterialIcons
          onPress={onDelete}
          name="delete"
          size={34}
          color="crimson"
          className="  p-1 absolute bottom-10 left-10"
        />
        <MaterialIcons
          className=" bg-white/60 rounded-md p-1 absolute bottom-10 right-10"
          onPress={onSave}
          name="save"
          size={26}
          color="dimgray"
        />
      </View>
      {type === 'video' && (
        <VideoView
          player={player}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
        // <Video
        //   source={{ uri: fullUri }}
        //   style={{ width: '100%', height: '100%' }}
        //   resizeMode={ResizeMode.COVER}
        //   shouldPlay
        //   isLooping
        //   useNativeControls
        // />
      )}
    </View>
  )
}
