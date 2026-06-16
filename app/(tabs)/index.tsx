import "@/global.css"
import { Text, View } from "react-native";
import {Link} from "expo-router";
import {styled} from 'nativewind'
import { SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView)

export default function App() {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-background">

        </SafeAreaView>
    );
}