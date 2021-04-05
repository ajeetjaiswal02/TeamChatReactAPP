import React, { useLayoutEffect } from "react";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { StyleSheet, ScrollView, Text } from 'react-native';
import { Avatar } from "react-native-elements";
import ListComponents from "../Components/ListComponents";
import { auth, db } from "../firebase";

const HomeScreen  = ({ navigation }) => {

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: {backgroundColor: "#fff"},
            headerTitleStyle: { color: "black"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{marginLeft: 15}}>
                    <TouchableOpacity onPress={signOutUser}  activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL}}/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, []);

    return(
        <SafeAreaView>
            <ScrollView>
                <ListComponents />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({})