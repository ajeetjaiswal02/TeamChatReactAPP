import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";


const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageURL, setImageURL] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        });
    }, [navigation]);
    
    const register = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL : imageURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            });
        }) 
        .catch(( error ) => alert(error.message)); 

    };

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Text h4 style={{ marginBottom: 50}}>
              Create a Team Chat Account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                  placeholder="Full Name"
                  autofocus type='text'
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
                <Input 
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <Input 
                  placeholder="Password"
                  autofocus type='text'
                  value={password}
                  secureTextEntry
                  onChangeText={(text) => setPassword(text)}
                />
                <Input 
                  placeholder="Image Optional"
                  value={imageURL}
                  onChangeText={text => setImageURL(text)}
                  onSubmitEditing={register}
                /> 
                </View>

            <Button
               containerStyle={styles.button}
               raised 
               onPress={register}
               title="Register"
            />            
            

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer : {
        width: 300
    }
})