import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import CheckoutFormStepIndicator from '@/components/CheckoutFormStepIndicator'
import CheckoutFormProvider from '@/contexts/CheckoutFormProvider'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function FitnessLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="personal" options={{ title: 'Personal' }} />
        <Stack.Screen name="payment" options={{ title: 'Payment' }} />
        <Stack.Screen name="confirm" options={{ title: 'Confirm' }} />

        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}
