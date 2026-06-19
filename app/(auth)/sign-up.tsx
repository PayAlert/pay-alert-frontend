import { useAuth, useSignUp } from "@clerk/expo";
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
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleSubmit = async () => {
    const { error } = await signUp.password({
      firstName,
      lastName,
      emailAddress,
      password,
    });

    if (error) {
      console.log(error);
      return;
    }

    await signUp.verifications.sendEmailCode();
  };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return;

          const url = decorateUrl("/");

          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    }
  };

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  const isVerificationStep =
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0;

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

          <Text className="mt-1 font-sans-semibold text-muted-foreground uppercase">
            Smart Subscription Tracking
          </Text>
        </View>

        {!isVerificationStep ? (
          <>
            <View className="mt-12">
              <Text className="text-4xl font-sans-bold text-primary">
                Create Account
              </Text>

              <Text className="mt-3 text-base font-sans-medium text-muted-foreground">
                Start tracking subscriptions and never miss a payment again.
              </Text>
            </View>

            <View className="mt-8 rounded-[32px] border border-border bg-card p-5">
              <View className="gap-5">
                <View>
                  <Text className="mb-2 font-sans-semibold text-primary">
                    First Name
                  </Text>

                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Nakul"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    className="rounded-2xl border border-border bg-background text-primary"
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 16,
                    }}
                  />
                </View>

                <View>
                  <Text className="mb-2 font-sans-semibold text-primary">
                    Last Name
                  </Text>

                  <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Singh"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    className="rounded-2xl border border-border bg-background text-primary"
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 16,
                    }}
                  />
                </View>

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

                  {errors.fields.emailAddress && (
                    <Text className="mt-2 text-sm text-destructive">
                      {errors.fields.emailAddress.message}
                    </Text>
                  )}
                </View>

                <View>
                  <Text className="mb-2 font-sans-semibold text-primary">
                    Password
                  </Text>

                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Create a password"
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
                    !firstName ||
                    !lastName ||
                    !emailAddress ||
                    !password ||
                    fetchStatus === "fetching"
                  }
                  className={`items-center rounded-2xl py-4 ${!firstName ||
                    !lastName ||
                    !emailAddress ||
                    !password ||
                    fetchStatus === "fetching"
                    ? "bg-accent/40"
                    : "bg-accent"
                    }`}
                >
                  <Text className="font-sans-bold text-background">
                    {fetchStatus === "fetching"
                      ? "Creating..."
                      : "Create Account"}
                  </Text>
                </Pressable>
              </View>

              <View className="mt-6 flex-row justify-center">
                <Text className="font-sans-medium text-muted-foreground">
                  Already have an account?
                </Text>

                <Link href="/sign-in" className="ml-1">
                  <Text className="font-sans-bold text-accent">
                    Sign In
                  </Text>
                </Link>
              </View>
            </View>
          </>
        ) : (
          <>
            <View className="mt-12">
              <Text className="text-4xl font-sans-bold text-primary">
                Verify Email
              </Text>

              <Text className="mt-3 text-base font-sans-medium text-muted-foreground">
                We've sent a verification code to your email.
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
                className="mt-5 items-center rounded-2xl bg-accent py-4"
              >
                <Text className="font-sans-bold text-background">
                  Verify Email
                </Text>
              </Pressable>

              <Pressable
                onPress={() => signUp.verifications.sendEmailCode()}
                className="mt-4 items-center"
              >
                <Text className="font-sans-semibold text-accent">
                  Resend Code
                </Text>
              </Pressable>
            </View>
          </>
        )}

        <View nativeID="clerk-captcha" />
      </ScrollView>
    </SafeAreaView>
  );
}

