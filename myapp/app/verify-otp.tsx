import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

export default function VerifyOtpScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }
    try {
      await axios.post("http://YOUR_BACKEND_URL/otp/verify", {
        phone_number: phone,
        otp,
      });
      Alert.alert("Success", "OTP Verified!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Invalid OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter OTP for {phone}</Text>
      <TextInput
        style={styles.input}
        placeholder="123456"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />
      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  label: { fontSize: 18, marginBottom: 8 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
});
