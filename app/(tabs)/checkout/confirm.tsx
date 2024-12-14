import CustomButton from '@/components/CustomButton'
import { Link, router, Stack } from 'expo-router'
import { Text, View } from 'react-native'

type Props = {}

function ConfirmForm({}: Props) {
  const onNext = () => {
    //validate

    //submit data

    //router next
    // router.push('/checkout')
    router.dismissAll()
    // router.back()
  }
  return (
    <View className="w-full h-full flex p-10">
      <Text className="text-white">Confirm form</Text>
      <CustomButton onPress={onNext} title="Submit" className="mt-auto mb-6" />
    </View>
  )
}

export default ConfirmForm
