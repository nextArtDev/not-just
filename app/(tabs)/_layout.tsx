import { Tabs } from 'expo-router'
import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import { dbName } from '@/db'
import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin'
import * as SQLite from 'expo-sqlite'
import { useWorkouts } from '@/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const db = SQLite.openDatabaseSync(dbName)

export default function TabLayout() {
  const colorScheme = useColorScheme()
  useDrizzleStudio(db)

  const loadWorkouts = useWorkouts((state) => state.loadWorkouts)

  useEffect(() => {
    loadWorkouts()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="checkout"
          options={{
            title: 'checkout',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  )
}
