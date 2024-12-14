import CustomButton from '@/components/CustomButton'
import { Link, router, Stack } from 'expo-router'
import { Text, View } from 'react-native'

type Props = {}

function PaymentDetails({}: Props) {
  const onNext = () => {
    //validate

    //router next
    router.push('/checkout/confirm')
  }
  return (
    <View className="w-full h-full flex p-10">
      <Text className="text-white">Payment Details</Text>
      <CustomButton onPress={onNext} title="Next" className="mt-auto mb-6" />
    </View>
  )
}

export default PaymentDetails
