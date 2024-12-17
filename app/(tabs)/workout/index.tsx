import { Link, router } from 'expo-router'
import { View, Text } from '@/components/fitness/general/Themed'
import CustomButton from '@/components/fitness/general/CustomButton'
import WorkoutListItem from '@/components/fitness/workouts/WorkoutListItem'
import { FlatList } from 'react-native'
import { useWorkouts } from '@/store'
import dummyWorkouts from '@/data/dummyWorkouts'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const currentWorkout = useWorkouts((state) => state.currentWorkout)
  const startWorkout = useWorkouts((state) => state.startWorkout)
  const workouts = useWorkouts((state) => state.workouts)

  const onStartWorkout = () => {
    startWorkout()
    console.log(currentWorkout)
    router.push('/workout/current')
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
      {currentWorkout ? (
        <Link href="/workout/current" asChild>
          <CustomButton title="Resume workout" />
        </Link>
      ) : (
        <CustomButton title="Start new workout" onPress={onStartWorkout} />
      )}

      <FlatList
        // data={workouts}
        data={dummyWorkouts}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}
