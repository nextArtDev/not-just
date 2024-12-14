import CustomButton from '@/components/CustomButton'
import CustomTextInput from '@/components/CustomTextInput'
import { Link, router, Stack } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

type Props = {}

function PersonalDetails({}: Props) {
  const [fullName, setFullName] = useState('')
  const onNext = () => {
    console.log({ fullName })
    //validate

    //router next
    router.push('/checkout/payment')
  }
  return (
    <View className="w-full h-full flex gap-4">
      <Text className="text-white w-full text-center text-xl font-semibold ">
        Personal Details
      </Text>
      <CustomTextInput name="" label="Full Name" placeholder="" />
      <CustomTextInput name="" label="Address" placeholder="" />
      <View className="flex flex-row gap-2 items-center justify-between">
        <CustomTextInput name="" label="" placeholder="City" />
        <CustomTextInput name="" label="" placeholder="Post Code" />
      </View>
      <CustomTextInput
        name=""
        inputMode="tel"
        label="Phone Number"
        placeholder=""
      />

      <CustomButton
        onPress={onNext}
        title="Next"
        className="mt-auto mb-6 max-w-[90vw] mx-auto"
      />
    </View>
  )
}

export default PersonalDetails
