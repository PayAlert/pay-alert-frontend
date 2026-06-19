import { useClerk, useUser } from "@clerk/expo";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

export default function SettingsScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6">
        {/* Header */}

        <View className="mt-6">
          <Text className="text-4xl font-sans-extrabold text-primary">
            Settings
          </Text>

          <Text className="mt-2 text-base font-sans-medium text-muted-foreground">
            Manage your account and preferences.
          </Text>
        </View>

        {/* Profile Card */}

        <View className="mt-8 rounded-3xl border border-border bg-card p-6">
          <View className="flex-row items-center">
            <View className="size-16 items-center justify-center rounded-full bg-accent">
              <Text className="text-2xl font-sans-bold text-background">
                {user?.firstName?.[0] ??
                  user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ??
                  "P"}
              </Text>
            </View>

            <View className="ml-4 flex-1">
              <Text
                numberOfLines={1}
                className="text-xl font-sans-bold text-primary"
              >
                {user?.fullName || "PayAlert User"}
              </Text>

              <Text
                numberOfLines={1}
                className="mt-1 text-sm font-sans-medium text-muted-foreground"
              >
                {user?.primaryEmailAddress?.emailAddress}
              </Text>
            </View>
          </View>
        </View>

        {/* Account Section */}

        <View className="mt-5 rounded-3xl border border-border bg-card p-6">
          <Text className="mb-4 text-lg font-sans-bold text-primary">
            Account Information
          </Text>

          <View className="flex-row items-center justify-between py-3">
            <Text className="font-sans-medium text-muted-foreground">
              Name
            </Text>

            <Text
              numberOfLines={1}
              className="ml-4 flex-1 text-right text-sm font-sans-semibold text-primary"
            >
              {user?.fullName || "PayAlert User"}
            </Text>
          </View>

          <View className="h-px bg-border" />

          <View className="flex-row items-center justify-between py-3">
            <Text className="font-sans-medium text-muted-foreground">
              Email
            </Text>

            <Text
              numberOfLines={1}
              className="ml-4 flex-1 text-right text-sm font-sans-semibold text-primary"
            >
              {user?.primaryEmailAddress?.emailAddress}
            </Text>
          </View>
        </View>

        {/* Sign Out Button */}

        <Pressable
          onPress={() => signOut()}
          className="mt-6 items-center rounded-2xl bg-destructive py-4"
        >
          <Text className="text-base font-sans-bold text-white">
            Sign Out
          </Text>
        </Pressable>

        {/* Version */}

        <Text className="mt-6 text-center text-sm font-sans-medium text-muted-foreground">
          PayAlert v1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
}