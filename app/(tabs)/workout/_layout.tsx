import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import * as SQLite from 'expo-sqlite'
import CheckoutFormStepIndicator from '@/components/CheckoutFormStepIndicator'
import CheckoutFormProvider from '@/contexts/CheckoutFormProvider'
import { useWorkouts } from '@/store'
import { useEffect } from 'react'
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin'
import { dbName } from '@/db'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const db = SQLite.openDatabaseSync(dbName)
export default function FitnessLayout() {
  useDrizzleStudio(db)

  const loadWorkouts = useWorkouts((state) => state.loadWorkouts)

  useEffect(() => {
    loadWorkouts()
  }, [])

  return (
    <>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="workout/current" options={{ title: 'Workout' }} />
        <Stack.Screen name="workout/[id]" options={{ title: 'Workout' }} />

        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}
