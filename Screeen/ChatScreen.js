import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, StatusBar, KeyboardAvoidingView, TextInput } from 'react-native'
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native';
import { Platform } from 'react-native-web';
import { ScrollView } from 'react-native';
import { Keyboard } from 'react-native';
import { db, auth } from '../firebase';
import * as firebase from 'firebase'
import { set } from 'react-native-reanimated';


const ChatScreen = ({ navigation, route}) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                  style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: -25
                  }}
                >
                    <Avatar rounded source={{
                        uri:
                        messages[0]?.data.photoURL ||  
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                    }} 
                    />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700", fontSize: 17 }}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerRight: () => (
                <View 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 70,
                        marginRight: 20
                    }}    
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={22} color="white"/>
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation, messages]);

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input, 
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })

        setInput('')
    };

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));

        return unsubscribe;
    }, [route])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "white"
        }}>
            <StatusBar style="Light" />
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={65}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ padding: 15 }}>
                            {messages.map(({id, data}) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                        position="absolute"
                                        rounded
                                        // WEB
                                        containerStyle={{
                                            position:"absolute",
                                            bottom: -12,
                                            right: -5
                                        }}
                                        bottom={-12}
                                        right={-5}
                                        size={30}
                                         source={{
                                             uri: data.photoURL,
                                         }} 
                                        />

                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar
                                        position="absolute"
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            left: -5,
                                        }} 
                                        bottom={-15}
                                        left={-5}
                                        rounded
                                        size={30}
                                        source={{
                                            uri: data.photoURL,
                                        }}
                                        />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                              value={input}
                              onChangeText={(text) => setInput(text)}
                              onSubmitEditing={sendMessage} 
                              placeholder="Signal Message"
                              style={styles.textInput}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 10,
        backgroundColor: "#2B68E6",
        alignSelf: 'flex-start',
        borderRadius: 14,
        marginLeft: 15,
        marginBottom: 7,
        maxWidth: "70%",
        position: 'relative',
    },
    senderName: {
        left: 10,
        paddingLeft: 10,
        fontSize: 10,
        color: "white",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    recieverText: {
        color: "Black",
        fontWeight: "500",
        marginLeft: 10,
    }
});