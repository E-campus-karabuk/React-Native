import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
// Add the missing import statement

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
  const [topic, setTopic] = useState(null);
  const [token, setToken] = useState(null);
  const [showTopics, setShowTopics] = useState(false);
  const [disableTopic, setDisableTopic] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState(null);
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setShowTopics(true);
    }, 1000); // 4-second delay

    return () => clearTimeout(delayTimer);
  }, []); // Run once on component mount

  const handleTopicChange = (topic) => {
    setTopic(topic);

    setTimeout(() => {
      setDisableTopic(true);
      addBotMessage(`You selected ${topic}`);
    }, 1000);
  };

  useLayoutEffect(() => {
    const fetchAndSendMessage = async () => {
      try {
        const token = await getToken();
        setIsLoading(true);
        setToken(token); // Store token in state

        if (token) {
          const { data } = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/api/bot/newChat`,
            {
              topic: topic,
              prompt: prompt,
            }
          );
          // console.log({data});
          setResponse(data);
          addBotMessage(data.answer);
          setIsLoading(false);
          setIsFinished(false);
        }
      } catch (error) {
        console.log({ error: error.message });
      }
    };

    if (isFinished) {
      fetchAndSendMessage();
    }
  }, [isFinished]);
  console.log({ response });

  const handleMessageChange = (text) => {
    setMessage(text);
    setPrompt(text);
    console.log({ prompt });
  };

  const sendMessage = () => {
    addUserMessage(message);
    setIsFinished(true);
    setMessage("");
  };

  const addUserMessage = (message) => {
    setChatMessages([...chatMessages, { message, isUser: true }]);
  };

  const addBotMessage = (message) => {
    setChatMessages([...chatMessages, { message, isUser: false }]);
  };

  console.log({ topic });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Messages */}
        <View style={styles.messageContainer}>
          <View style={styles.messageBubble}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AI</Text>
            </View>
            <View style={styles.messageContent}>
              <Text>Hi, Which topic do you wanna chat about?</Text>
            </View>
          </View>
        </View>
        {/* Add more message containers as needed */}
        {showTopics && !disableTopic && (
          <View style={styles.topicsContainer}>
            {topics.map((topic, index) => (
              <Text
                key={index}
                style={styles.topicButton}
                onPress={() => handleTopicChange(Object.keys(topic)[0])}
              >
                {Object.keys(topic)[0]}
              </Text>
            ))}
          </View>
        )}
        {chatMessages.map((chatMessage, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              chatMessage.isUser ? styles.userMessage : styles.botMessage,
            ]}
          >
            <View
              style={chatMessage.isUser ? styles.avatarUser : styles.avatar}
            >
              <Text style={styles.avatarText}>
                {chatMessage.isUser ? "Me" : "AI"}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={chatMessage.isUser ? styles.messageText : ""}>
                {chatMessage.message}
              </Text>
            </View>
          </View>
        ))}
        {isLoading && (
          <View style={[styles.messageBubble, styles.botMessage]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AI</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>Typing...</Text>
            </View>
          </View>
        )}
      </ScrollView>
      {/* Input field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type something"
          value={message}
          onChangeText={handleMessageChange}
          editable={topic !== null && !isFinished} // Disable input if topic is empty
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
  topicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8, // mb-2
  },

  topicButton: {
    backgroundColor: "#223F76", // bg-blue-500
    color: "#FFFFFF", // text-white
    paddingVertical: 8, // py-2
    paddingHorizontal: 16, // px-4
    marginLeft: 8, // ml-2
    marginTop: 8, // mt-2
    display: "inline-block",
    borderRadius: 20,
  },
  messageText: {
    color: "#FFFFFF",
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
    backgroundColor: "white",
    // bg-white
    // Wrap the text within the container
  },
  userMessage: {
    backgroundColor: "#3B82F6", // bg-blue-500
    // ml-auto
    marginRight: 0,
    marginLeft: 40, // mr-0
    color: "#FFFFFF", // text-white
    marginTop: 2,
    marginBottom: 2,
  },
  botMessage: {
    marginLeft: "2", // ml-auto
    marginRight: 30, // mr-0

    marginTop: 2,
    marginBottom: 2,
  },
  avatar: {
    width: 40, // h-10, w-10
    height: 40,
    borderRadius: 20, // rounded-full
    backgroundColor: "#223F76", // bg-indigo-500
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12, // ml-3
  },
  avatarUser: {
    width: 40, // h-10, w-10
    height: 40,
    borderRadius: 20, // rounded-full
    backgroundColor: "#2B46C1", // bg-indigo-500
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
    backgroundColor: "#223F76",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bgBlue500: {
    backgroundColor: "#3B82F6",
  },
  textWhite: {
    color: "white",
  },
  roundedLg: {
    borderRadius: 12,
  },
  py2: {
    paddingVertical: 8,
  },
  px4: {
    paddingHorizontal: 16,
  },
  ml2: {
    marginLeft: 8,
  },
  mt2: {
    marginTop: 8,
  },
  inlineBlock: {
    display: "inline-block",
  },
});

export default Chat;
