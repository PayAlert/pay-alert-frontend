import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const SignIn = () => {
  return (
    <View className='flex-1 items-center'>
      <Text className='mt-4 font-extrabold'>sign-in</Text>
      <Link href="/(auth)/sign-up" className='mt-4 px-3 py-3 bg-success  text-white rounded-md'>Sign Up</Link>
      <Link href="/" className='mt-4 px-3 py-3 bg-success  text-white rounded-md'>Go back</Link>
    </View>
  )
}

export default SignIn