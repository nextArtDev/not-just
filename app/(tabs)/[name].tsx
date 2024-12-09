import { Link, useLocalSearchParams, Stack, router } from 'expo-router'
import { View, Image } from 'react-native'
import * as FileSystem from 'expo-file-system'
import { MaterialIcons } from '@expo/vector-icons'
// import { name } from '@/babel.config'
// import { getMediaType } from '../utils/media';
// import { ResizeMode, Video } from 'expo-av';
// import { VideoView, useVideoPlayer } from 'expo-video';
// import * as MediaLibrary from 'expo-media-library';

export default function ImageScreen() {
  const { name } = useLocalSearchParams<{ name: string }>()
  // const [permissionResponse, requestPermissions] =
  //   MediaLibrary.usePermissions();

  const fullUri = (FileSystem.documentDirectory || '') + (name || '')
  // const type = getMediaType(fullUri);

  // const player = useVideoPlayer(fullUri, (player) => {
  //   player.loop = true;
  //   player.play();
  // });

  const onDelete = async () => {
    await FileSystem.deleteAsync(fullUri)
    router.back()
  }

  // const onSave = async () => {
  //   // save to media library
  //   if (permissionResponse?.status !== 'granted') {
  //     await requestPermissions();
  //   }
  //   const asset = await MediaLibrary.createAssetAsync(fullUri);
  // };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: 'Media',
          headerRight: () => (
            <View
              style={{
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
                // onPress={onSave}
                name="save"
                size={26}
                color="dimgray"
              />
            </View>
          ),
        }}
      />

      <Image
        source={{ uri: fullUri }}
        style={{ width: '100%', height: '100%' }}
      />
      <MaterialIcons
        onPress={onDelete}
        name="delete"
        size={34}
        color="crimson"
        className="  p-1 absolute bottom-10 left-10"
      />

      {/* {type === 'video' && (
        
        <VideoView
          player={player}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
      )} */}
    </View>
  )
}
