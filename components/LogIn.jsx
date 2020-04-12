import React from "react";
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from "react-native";
import * as firebase from "firebase";

import { connect } from "react-redux";
import Todo from "./Todo";
import { logIn } from "../actions/middleware";

export function LogIn(props) {
    // console.log(props.todos)
    return (
        <View style={styles.container}>
            <Text style={styles.header}>YakYik</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Add Task"
                    placeholderTextColor="#abbabb"
                    onChangeText={(value) => {
                        props.updateUsername(value);
                    }}
                />
                <TouchableOpacity onPress={props.logIn}>
                    <Text style={styles.buttonText}>Select Username</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logIn: () => dispatch(logIn()),
        updateUsername: (text) => dispatch({ type: "UPDATE_USERNAME", text: text }),
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
