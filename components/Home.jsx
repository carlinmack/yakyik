import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import { updateTodos, getTodos } from "../actions/Todo";
import * as SecureStore from "expo-secure-store";

import * as firebase from "firebase";
import "firebase/firestore";
import store from "../actions/store";

var firebaseConfig = {
    apiKey: "AIzaSyCiORa1Aum5CUWIE_ht7hHpWb8J_iRHLmU",
    authDomain: "https://mobile-app-dev-4afcb.firebaseapp.com/__/auth/handler",
    databaseURL: "https://mobile-app-dev-4afcb.firebaseio.com",
    projectId: "mobile-app-dev-4afcb",
    storageBucket: "mobile-app-dev-4afcb.appspot.com",
    messagingSenderId: "455001591583",
    appId: "1:455001591583:web:837973671dc17f3603ea2a",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export function Home(props) {
    // setTimeout(() => {
    //     checkForToken(props);
    // }, 2000);

    //

    console.log("run Home");

    return (
        <View style={styles.container}>
            <Text style={styles.header}>YakYik</Text>
            <TodoList></TodoList>
            <TodoInput></TodoInput>
        </View>
    );
}

//Check Async Storage if token is available
//If it is available set loading state to false
// async function checkForToken(props) {
//     let token = await SecureStore.getItemAsync('token');

//     props.login(token)
// }

function mapStateToProps(state) {
    return {
        todos: state.todos,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTodos: () => dispatch(getTodos()),
        updateTodos: (newTodos) => dispatch(updateTodos(newTodos)),
        login: () => dispatch({ type: "LOGIN_FACEBOOK" }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

store.dispatch(getTodos());

var db = firebase.firestore();

db.collection("users")
    .doc("A4vrp1H3bETPYQfpXkURdDEdBo93")
    .collection("todos")
    .where("deleted", "==", false)
    .onSnapshot((newTodos) => {
        store.dispatch(updateTodos(newTodos));
    });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#e8e6e3",
    },
    header: {
        marginTop: "15%",
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 10,
    },
});
