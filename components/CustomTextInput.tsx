import { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native'

type CustomTextInput = {
  label?: string
  containerStyle?: StyleProp<ViewStyle>
  name: string
  className?: string
} & ComponentProps<typeof TextInput>

export default function CustomTextInput({
  label,
  containerStyle,
  name,
  className,
  ...textInputProps
}: CustomTextInput) {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name })

  return (
    <View className={className} style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...textInputProps}
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        style={[
          styles.input,
          // if we don't put it here, the style prop will be overwritten at first glans
          textInputProps.style,
          error ? styles.errorInput : {},
        ]}
      />
      <Text style={styles.error} numberOfLines={1}>
        {error?.message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 10,
    borderRadius: 5,

    marginTop: 4,
    marginBottom: 2,
  },
  errorInput: {
    borderColor: 'crimson',
  },
  label: {
    fontWeight: '600',
    color: 'dimgray',
  },
  error: {
    color: 'crimson',
    // it cause to not collapse the inputs when there is no error
    height: 17,
  },
})
