import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Send OTP" }} />
      <Stack.Screen name="verify-otp" options={{ title: "Verify OTP" }} />
    </Stack>
  );
}
