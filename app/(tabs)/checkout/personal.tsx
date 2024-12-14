import CustomButton from '@/components/CustomButton'
import CustomTextInput from '@/components/CustomTextInput'
import KeyboardAwareScrollView from '@/components/KeyboardAwareScrollView'
import { Link, router, Stack } from 'expo-router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {}

function PersonalDetails({}: Props) {
  // const { setPersonalInfo, personalInfo } = useCheckoutForm()

  // const form = useForm<PersonalInfo>({
  //   resolver: zodResolver(PersonalInfoSchema),
  //   defaultValues: personalInfo,
  // })
  const form = useForm()

  const onNext = (data) => {
    console.log({data})
    //validate

    //router next
    router.push('/checkout/payment')
  }
  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <CustomTextInput name="fullName" label="Full Name" placeholder="" />
        <CustomTextInput name="address" label="Address" placeholder="" />
        <View className="flex flex-row gap-2 items-center justify-between">
          <CustomTextInput
            className="flex-1"
            name="city"
            label="City"
            placeholder="City"
          />
          <CustomTextInput
            className="flex-1"
            name="postcode"
            label="Post Code"
            placeholder="Post Code"
          />
        </View>
        {/* <CustomTextInput
        name="country"
        inputMode="tel"
        label="Phone Number"
        placeholder=""
      /> */}
        <CustomTextInput
          name="phone"
          inputMode="tel"
          label="Phone Number"
          placeholder=""
        />
        {/* <CustomTextInput name="birthdate" placeholder="birthdate" /> */}

        <CustomButton
          onPress={form.handleSubmit(onNext)}
          title="Next"
          className="mt-auto max-w-[90vw] mx-auto"
        />
      </FormProvider>
    </KeyboardAwareScrollView>
  )
}

export default PersonalDetails
