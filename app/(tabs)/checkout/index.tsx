import CustomButton from '@/components/CustomButton'
import { Link, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function Checkout() {
  return (
    <View style={styles.container}>
      {/* <Stack.Screen options={{ title: 'Home' }} /> */}

      <Link href="/checkout" asChild>
        <CustomButton title="Checkout" />
      </Link>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
