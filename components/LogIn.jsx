import React from "react";
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from "react-native";
import * as firebase from "firebase";

import { connect } from "react-redux";
import Todo from "./Todo";
import { setUsername, checkPassword } from "../actions/middleware";

export function LogIn(props) {
    console.log(props.currentUsername);

    let background_color = props.colorSchemes[props.colorScheme].background;
    let text_color = props.colorSchemes[props.colorScheme].text;
    let input_background = props.colorSchemes[props.colorScheme].button;

    return (
        <View style={[styles.container, { backgroundColor: background_color }]}>
            <Text style={[styles.header, { color: text_color }]}>YakYik</Text>
            <View
                style={[
                    styles.textInputContainer,
                    { backgroundColor: input_background },
                ]}
            >
                <TextInput
                    style={[styles.textInput, { color: text_color }]}
                    placeholder="Username"
                    placeholderTextColor="#abbabb"
                    onChangeText={(value) => {
                        props.updateUsername(value);
                    }}
                />
                <TouchableOpacity onPress={props.setUsername}>
                    <Text style={[styles.buttonText, { color: text_color }]}>
                        Select
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={
                    props.showPasswordEnterBool
                        ? styles.textInputContainer
                        : { display: "none", backgroundColor: input_background }
                }
            >
                <TextInput
                    style={[styles.textInput, { color: text_color }]}
                    placeholder="Password"
                    placeholderTextColor="#abbabb"
                    value={props.currentPassword}
                    onChangeText={(value) => {
                        props.updatePassword(value);
                    }}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={props.checkPassword}>
                    <Text style={[styles.buttonText, { color: text_color }]}>
                        Enter
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function mapStateToProps(state) {
    return {
        username: state.username,
        password: state.password,
        showUserInputBool: state.showUserInput,
        showUserInputButton: state.showUserInputButton,
        showPasswordInputBool: state.showPasswordInput,
        showPasswordInputButton: state.showPasswordInputButton,
        showPasswordEnterBool: state.showPasswordEnter,
        currentUsername: state.currentUsername,
        colorSchemes: state.colorSchemes,
        colorScheme: state.colorScheme,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUsername: () => dispatch(setUsername()),
        setPassword: () => dispatch(setPassword()),
        checkPassword: () => dispatch(checkPassword()),
        showUserInput: () => dispatch({ type: "SHOW_USER_INPUT" }),
        showPasswordInput: () => dispatch({ type: "SHOW_PASSWORD_INPUT" }),
        updateUsername: (text) => dispatch({ type: "UPDATE_USERNAME", text: text }),
        updatePassword: (text) => dispatch({ type: "UPDATE_PASSWORD", text: text }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#e8e6e3",
    },
    header: {
        fontSize: 30,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 50,
        maxHeight: 150,
        width: "90%",
        borderRadius: 5,
        backgroundColor: "#f4f3f1",
        paddingRight: 10,

        marginBottom: "5%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 3,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        paddingLeft: 10,
    },
});
