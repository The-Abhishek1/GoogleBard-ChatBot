import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatFaceData from "../Services/ChatFaceData";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [chatFaceData, setChatFacedata] = useState();
  const [selectChatFaceData, setSelectChatFaceData] = useState();

  const navigation = useNavigation();
  useEffect(() => {
    setChatFacedata(ChatFaceData);
    setSelectChatFaceData(ChatFaceData[0]);
  }, []);

  const onChatFacePress = (id) => {
    setSelectChatFaceData(ChatFaceData[id - 1]);
  };

  return (
    <View style={{ alignItems: "center", paddingTop: 90 }}>
      <Text style={[{ color: selectChatFaceData.primary }, { fontSize: 30 }]}>
        Hello
      </Text>
      <Text
        style={[
          { color: selectChatFaceData.primary },
          { fontSize: 30, fontWeight: "bold" },
        ]}
      >
        I am {selectChatFaceData.name}
      </Text>
      <Image
        source={{ uri: selectChatFaceData.image }}
        style={{ width: 150, height: 150, marginTop: 20, borderRadius: 100 }}
      />
      <Text style={{ marginTop: 30, fontSize: 25 }}>How can I help you?</Text>
      <View
        style={{
          marginTop: 20,
          backgroundColor: "#F5F5F5",
          alignItems: "center",
          padding: 10,
          height: 140,
          borderRadius: 30,
        }}
      >
        <FlatList
          data={chatFaceData}
          horizontal={true}
          renderItem={({ item }) =>
            selectChatFaceData.id != item.id && (
              <TouchableOpacity
                style={{ margin: 13 }}
                onPress={() => {
                  onChatFacePress(item.id);
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 70, height: 70, borderRadius: 40 }}
                />
              </TouchableOpacity>
            )
          }
        />
        <Text style={{ marginTop: 5, fontSize: 17, color: "#808080" }}>
          Choose Your Fav ChatBuddy
        </Text>
      </View>
      <TouchableOpacity
        style={[
          { backgroundColor: selectChatFaceData.primary },
          {
            padding: 17,
            width: Dimensions.get("screen").width * 0.6,
            borderRadius: 100,
            alignItems: "center",
            marginTop: 40,
          },
        ]}
        onPress={() =>
          navigation.navigate("chat", { selectedFace: selectChatFaceData })
        }
      >
        <Text style={{ fontSize: 16, color: "#fff" }}>Let's Chat</Text>
      </TouchableOpacity>
    </View>
  );
}
