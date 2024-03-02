import { View, Text } from "react-native";
import React, { useEffect, useReducer, useState, useCallback } from "react";
import { useRoute } from "@react-navigation/native";
import { GiftedChat } from "react-native-gifted-chat";
import GlobalAPI from "../Services/GlobalAPI";
import getBardApi from "../Services/GlobalAPI";

export default function ChatScreen() {
  const param = useRoute().params;

  const [messages, setMessages] = useState([]);
  const [selectedFace, setSelectedFace] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedFace(param.selectedFace);
    setMessages([
      {
        _id: 1,
        text: `Hello ${param.selectedFace.name}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: param.selectedFace.image,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    setLoading(true);
    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  const getBardResp = (msg) => {
    getBardApi(msg).then((res) => {
      if (res) {
        const chatAPIResp = {
          _id: Math.random() * 9999999 - 1,
          text: res,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: param.selectedFace.image,
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, chatAPIResp)
        );
        setLoading(false);
      } else {
        setLoading(false);
        const chatAPIResp = {
          _id: Math.random() * 9999999 - 1,
          text: "Sorry I can't help you with it!!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: param.selectedFace.image,
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, chatAPIResp)
        );
      }
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        marginTop: 50,
        borderRadius: 30,
      }}
    >
      <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}
