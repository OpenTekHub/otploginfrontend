import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function PhoneInputScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const sendOtp = async () => {
    if (!phone) {
      Alert.alert("Error", "Please enter a phone number");
      return;
    }
    try {
      await axios.post((`http://127.0.0.1:8000/otp/send-otp?phone=${encodeURIComponent(phone)}`), {
        phone_number: phone,
      });
      Alert.alert("OTP Sent", "Check your phone for the code.");
      router.push({
        pathname: "/verify-otp",
        params: { phone },
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to send OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Send OTP" onPress={sendOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  label: { fontSize: 18, marginBottom: 8 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
});
