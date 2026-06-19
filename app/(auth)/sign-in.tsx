import { useSignIn } from "@clerk/expo";
import { Link, useRouter, type Href } from "expo-router";
import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from 'nativewind'


const SafeAreaView = styled(RNSafeAreaView)

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleSubmit = async () => {
    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }

          const url = decorateUrl("/");

          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else if (signIn.status === "needs_second_factor") {
      console.log("Second factor required");
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code"
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({
      code,
    });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }

          const url = decorateUrl("/");

          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  if (signIn.status === "needs_client_trust") {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="grow px-5 pt-8 pb-10"
        >
          <View className="items-center mt-4">
            <View className="size-16 rounded-3xl bg-accent items-center justify-center">
              <Text className="text-3xl font-sans-extrabold text-background">
                P
              </Text>
            </View>

            <Text className="mt-4 text-4xl font-sans-extrabold text-primary">
              PayAlert
            </Text>

            <Text className="mt-1 font-sans-semibold uppercase text-muted-foreground">
              Smart Subscription Tracking
            </Text>
          </View>

          <View className="mt-12">
            <Text className="text-4xl font-sans-bold text-primary">
              Verify Email
            </Text>

            <Text className="mt-3 text-base font-sans-medium text-muted-foreground">
              Enter the verification code sent to your email.
            </Text>
          </View>

          <View className="mt-8 rounded-[32px] border border-border bg-card p-5">
            <Text className="mb-2 font-sans-semibold text-primary">
              Verification Code
            </Text>

            <TextInput
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              placeholder="Enter OTP"
              placeholderTextColor="rgba(0,0,0,0.5)"
              className="rounded-2xl border border-border bg-background text-primary"
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
              }}
            />

            {errors.fields.code && (
              <Text className="mt-2 text-sm text-destructive">
                {errors.fields.code.message}
              </Text>
            )}

            <Pressable
              onPress={handleVerify}
              disabled={fetchStatus === "fetching"}
              className="mt-5 items-center rounded-2xl bg-accent py-4"
            >
              <Text className="font-sans-bold text-background">
                Verify
              </Text>
            </Pressable>

            <Pressable
              onPress={() => signIn.mfa.sendEmailCode()}
              className="mt-4 items-center"
            >
              <Text className="font-sans-semibold text-accent">
                Resend Code
              </Text>
            </Pressable>

            <Pressable
              onPress={() => signIn.reset()}
              className="mt-4 items-center"
            >
              <Text className="font-sans-semibold text-primary">
                Start Over
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="grow px-5 pt-8 pb-10"
      >
        <View className="items-center mt-4">
          <View className="size-16 rounded-3xl bg-accent items-center justify-center">
            <Text className="text-3xl font-sans-extrabold text-background">
              P
            </Text>
          </View>

          <Text className="mt-4 text-4xl font-sans-extrabold text-primary">
            PayAlert
          </Text>

          <Text className="mt-1 font-sans-semibold uppercase text-muted-foreground">
            Smart Subscription Tracking
          </Text>
        </View>

        <View className="mt-12">
          <Text className="text-4xl font-sans-bold text-primary">
            Welcome Back
          </Text>

          <Text className="mt-3 text-base font-sans-medium text-muted-foreground">
            Sign in to continue managing your subscriptions.
          </Text>
        </View>

        <View className="mt-8 rounded-[32px] border border-border bg-card p-5">
          <View>
            <Text className="mb-2 font-sans-semibold text-primary">
              Email
            </Text>

            <TextInput
              value={emailAddress}
              onChangeText={setEmailAddress}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor="rgba(0,0,0,0.5)"
              className="rounded-2xl border border-border bg-background text-primary"
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
              }}
            />

            {errors.fields.identifier && (
              <Text className="mt-2 text-sm text-destructive">
                {errors.fields.identifier.message}
              </Text>
            )}
          </View>

          <View className="mt-5">
            <Text className="mb-2 font-sans-semibold text-primary">
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter your password"
              placeholderTextColor="rgba(0,0,0,0.5)"
              className="rounded-2xl border border-border bg-background text-primary"
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
              }}
            />

            {errors.fields.password && (
              <Text className="mt-2 text-sm text-destructive">
                {errors.fields.password.message}
              </Text>
            )}
          </View>

          <Pressable
            onPress={handleSubmit}
            disabled={
              !emailAddress ||
              !password ||
              fetchStatus === "fetching"
            }
            className={`mt-6 items-center rounded-2xl py-4 ${!emailAddress ||
                !password ||
                fetchStatus === "fetching"
                ? "bg-accent/40"
                : "bg-accent"
              }`}
          >
            <Text className="font-sans-bold text-background">
              {fetchStatus === "fetching"
                ? "Signing In..."
                : "Sign In"}
            </Text>
          </Pressable>

          <View className="mt-6 flex-row justify-center">
            <Text className="font-sans-medium text-muted-foreground">
              Don't have an account?
            </Text>

            <Link href="/sign-up" className="ml-1">
              <Text className="font-sans-bold text-accent">
                Sign Up
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
