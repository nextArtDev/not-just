import { View, Text } from '@/components/fitness/general/Themed'
import WorkoutExerciseItem from '@/components/fitness/logger/WorkoutExerciseItem'
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native'

import { useHeaderHeight } from '@react-navigation/elements'
import { Redirect, Stack } from 'expo-router'
import CustomButton from '@/components/fitness/general/CustomButton'
import WorkoutHeader from '@/components/fitness/logger/WorkoutHeader'
import SelectExerciseModal from '@/components/fitness/logger/SelectExerciseModal'
import { useWorkouts } from '@/store'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CurrentWorkoutScreen() {
  const currentWorkout = useWorkouts((state) => state.currentWorkout)
  const finishWorkout = useWorkouts((state) => state.finishWorkout)
  const addExercise = useWorkouts((state) => state.addExercise)

  const headerHeight = useHeaderHeight()

  if (!currentWorkout) {
    return <Redirect href={'/'} />
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        gap: 10,
        padding: 10,
        backgroundColor: 'transparent',
      }}
    >
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              onPress={() => finishWorkout()}
              title="Finish"
              style={{ padding: 7, paddingHorizontal: 15, width: 'auto' }}
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        {/* <CustomButton
          onPress={() => finishWorkout()}
          title="Finish"
          style={{
            marginTop: 10,
            padding: 7,
            paddingHorizontal: 15,
            width: 'auto',
          }}
        /> */}
        <FlatList
          data={currentWorkout.exercises}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
          ListHeaderComponent={<WorkoutHeader />}
          ListFooterComponent={
            <SelectExerciseModal
              onSelectExercise={(name) => addExercise(name)}
            />
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
