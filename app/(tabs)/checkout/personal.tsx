import { Link, Stack } from 'expo-router'
import { Text, View } from 'react-native'

type Props = {}

function index({}: Props) {
  return (
    <View className="w-full h-full flex items-center justify-center">
      {/* <Stack.Screen title="Checkout" /> */}
      <Link
        href={'/checkout/personal'}
        className="text-white text-3xl border border-white/60 rounded-lg px-2 py-1"
      >
        Personal
      </Link>
    </View>
  )
}

export default index
