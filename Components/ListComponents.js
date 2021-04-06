import React, { useEffect, useState } from "react";
import { SnapshotViewIOS } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const ListComponents = ({ id, chatName, enterChat }) => {
    const [chatMessage, setChatMessage] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages').
        orderBy('timestamp','desc').onSnapshot((snapshot) => 
            setChatMessage(snapshot.docs.map(doc => doc.data()))
        )

        return unsubscribe;
    })
    return (
        <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
              rounded
              source={{
                  uri: chatMessage?.[0]?.photoURL || 
                  "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
              }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessage?.[0]?.displayName}: {chatMessage?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

export default ListComponents

const styles = StyleSheet.create({});