import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
// will use clerk
const SignUp = () => {
  return (
    <View className='flex-1 items-center'>
      <Text>sign-up</Text>
      <Link href="/(auth)/sign-in"  className='mt-4 px-3 py-3 bg-success  text-white rounded-md' >Sign In</Link>
      <Link href="/" className='mt-4 px-3 py-3 bg-success  text-white rounded-md'>Go back</Link>
    </View>
  )
}

export default SignUp
