import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return JSON.parse(token);
};

const topics = [
  { internship: "internship" },
  { training: "training" },
  { marks: "marks" },
  { credit: "credit" },
  { manners: "manners" },
];
const Chat = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [topic, setTopic] = useState("");
  const [token, setToken] = useState(null);

  useLayoutEffect(() => {
    const fetchAndSendMessage = async () => {
      try {
        const token = await getToken();

        setToken(token); // Store token in state

        if (token) {
          const { data } = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/api/bot/newChat`,
            {
              topic: topic,
              prompt: message,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log({data});
          setResponse(data);
        }
      } catch (error) {
        console.log({ error: error.message });
      }
    };

    fetchAndSendMessage();
  }, [token]);

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const sendMessage = () => {
    // Logic to send the message
    console.log("Message sent:", message);
    // You can add more functionality here, like sending the message to a server
    // or updating the state to clear the input field
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Messages */}
        <View style={styles.messageContainer}>
          <View style={styles.messageBubble}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View style={styles.messageContent}>
              <Text>Hey How are you today?</Text>
            </View>
          </View>
        </View>
        {/* Add more message containers as needed */}
      </ScrollView>
      {/* Input field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type something"
          value={message}
          onChangeText={handleMessageChange}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 4,
    backgroundColor: "#F3F4F6", // bg-gray-100
    borderRadius: 20, // rounded-2xl
  },
  messageContainer: {
    marginBottom: 4, // mb-4
  },
  messageBubble: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12, // p-3
    borderRadius: 12, // rounded-lg
    backgroundColor: "white", // bg-white
  },
  avatar: {
    width: 40, // h-10, w-10
    height: 40,
    borderRadius: 20, // rounded-full
    backgroundColor: "#6B46C1", // bg-indigo-500
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12, // ml-3
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
  },
  messageContent: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC", // border-gray-300
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "white",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#6B46C1",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Chat;
