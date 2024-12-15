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
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PersonalInfo,
  PersonalInfoSchema,
  useCheckoutForm,
} from '@/contexts/CheckoutFormProvider'
import CustomPicker from '@/components/CustomPicker'
import countries from '@/constants/countries.json'
import CustomDateTimePicker from '@/components/CustomDateTimePicker'
type Props = {}

function PersonalDetails({}: Props) {
  const { setPersonalInfo, personalInfo } = useCheckoutForm()

  const form = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: personalInfo,
  })
  // const form = useForm()

  const onNext = (data: unknown) => {
    // console.log({ data })
    setPersonalInfo(data)
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
        <CustomPicker
          name="country"
          placeholder={{ label: 'Select country' }}
          items={countries.map((country) => ({
            label: country.name,
            value: country.code,
          }))}
        />

        <CustomTextInput
          name="phone"
          inputMode="tel"
          label="Phone Number"
          placeholder=""
        />
        <CustomDateTimePicker name="birthdate" />

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
