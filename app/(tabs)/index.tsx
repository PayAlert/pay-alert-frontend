import "@/global.css"
import { Text, View } from "react-native";
import {Link} from "expo-router";
import {styled} from 'nativewind'
import { SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView)

export default function App() {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-background">
            <Text className="text-5xl font-bold text-primary">Home</Text>
            <Text className="text-5xl font-sans-bold text-teal-700">Home</Text>
            <Link href="/onboarding" className="mt-4 px-3 py-3 bg-black text-white rounded-md" >Go to Onboarding</Link>
            <Link href="/(auth)/sign-in" className="mt-4 px-3 py-3 bg-black text-white rounded-md" >Go to Sign In</Link>
            <Link href="/(auth)/sign-up" className="mt-4 px-3 py-3 bg-black text-white rounded-md" >Go to Sign Up</Link>

            <Link href="/subscriptions/spotify" className="mt-4 px-3 py-3 bg-black text-white rounded-md">Spotify</Link>

            <Link href={
                {
                    pathname: '/subscriptions/[id]',
                    params: {id: 'claude'}
                }
            } className="mt-4 px-3 py-3 bg-black text-white rounded-md">Claude</Link>
        </SafeAreaView>
    );
}