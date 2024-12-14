import { Link, Stack } from 'expo-router'
import { Text, View } from 'react-native'

type Props = {}

function ConfirmForm({}: Props) {
  return (
    <View className="w-full h-full flex items-center justify-center">
      {/* <Stack.Screen title="Checkout" /> */}
      <Link
        href={'/checkout/personal'}
        className="text-white text-3xl border border-white/60 rounded-lg px-2 py-1"
      >
        Confirm
      </Link>
    </View>
  )
}

export default ConfirmForm
