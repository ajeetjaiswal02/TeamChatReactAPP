import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const ListComponents = ({ id, chatName, enterChat }) => {
    return (
        <ListItem>
            <Avatar
              rounded
              source={{
                  uri:
                  "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
              }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800"}}>
                    YoutubeChat
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    This is the test Subtititle.
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

export default ListComponents

const styles = StyleSheet.create({});