import React from "react";
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from "react-native";
import * as firebase from "firebase";

import { connect } from "react-redux";
import { setUsername, setPassword, checkPassword } from "../actions/middleware";

export function Profile(props) {
    console.log("profile");
    console.log(props.showPasswordInputButton);
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{props.username}</Text>
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-evenly",
                }}
            >
                <TouchableOpacity
                    style={
                        props.showUserInputButton ? styles.button : { display: "none" }
                    }
                    onPress={props.showUserInput}
                >
                    <Text style={styles.buttonText}>Change Username</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={
                        props.showPasswordInputButton
                            ? styles.button
                            : { display: "none" }
                    }
                    onPress={props.showPasswordInput}
                >
                    <Text style={styles.buttonText}>Set Password</Text>
                </TouchableOpacity>
            </View>
            <View
                style={
                    props.showUserInputBool
                        ? styles.textInputContainer
                        : { display: "none" }
                }
            >
                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    placeholderTextColor="#abbabb"
                    value={props.currentUsername}
                    onChangeText={(value) => {
                        props.updateUsername(value);
                    }}
                />
                <TouchableOpacity style={styles.button} onPress={props.setUsername}>
                    <Text style={styles.buttonText}>Change</Text>
                </TouchableOpacity>
            </View>
            <View
                style={
                    props.showPasswordInputBool
                        ? styles.textInputContainer
                        : { display: "none" }
                }
            >
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#abbabb"
                    value={props.currentPassword}
                    onChangeText={(value) => {
                        props.updatePassword(value);
                    }}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={props.setPassword}>
                    <Text style={styles.buttonText}>Set</Text>
                </TouchableOpacity>
            </View>
            <View
                style={
                    props.showPasswordEnterBool
                        ? styles.textInputContainer
                        : { display: "none" }
                }
            >
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#abbabb"
                    value={props.currentPassword}
                    onChangeText={(value) => {
                        props.updatePassword(value);
                    }}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={props.checkPassword}>
                    <Text style={styles.buttonText}>Enter</Text>
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
        currentPassword: state.currentPassword,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

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
    button: {
        backgroundColor: "#f4f3f1",
        paddingTop: 7.5,
        paddingBottom: 7.5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 17.5,
        fontWeight: "bold",
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 50,
        maxHeight: 150,
        width: "90%",
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
