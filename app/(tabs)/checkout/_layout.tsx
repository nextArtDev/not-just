import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import CheckoutFormProvider from '@/contexts/CheckoutFormProvider'
import CheckoutFormStepIndicator from '@/components/CheckoutFormStepIndicator'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <CheckoutFormProvider>
      <CheckoutFormStepIndicator />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="personal" options={{ title: 'Personal' }} />
        <Stack.Screen name="payment" options={{ title: 'Payment' }} />
        <Stack.Screen name="confirm" options={{ title: 'Confirm' }} />

        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
      <StatusBar style="auto" />
    </CheckoutFormProvider>
  )
}
