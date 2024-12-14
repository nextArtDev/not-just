import CustomButton from '@/components/CustomButton'
import { Link, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function Checkout() {
  return (
    <View style={styles.container}>
      <Link href="/checkout/personal" asChild>
        <CustomButton title="Go Personal" />
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
    paddingHorizontal: 20,
  },
})
