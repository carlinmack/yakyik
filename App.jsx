import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import { createStore, applyMiddleware, getState } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { getTodos, updateTodos, loginFacebook } from "./actions/Todo";

import Icon from 'react-native-vector-icons/Feather';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';

import * as firebase from 'firebase';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyCiORa1Aum5CUWIE_ht7hHpWb8J_iRHLmU",
    authDomain: "https://mobile-app-dev-4afcb.firebaseapp.com/__/auth/handler",
    databaseURL: "https://mobile-app-dev-4afcb.firebaseio.com",
    projectId: "mobile-app-dev-4afcb",
    storageBucket: "mobile-app-dev-4afcb.appspot.com",
    messagingSenderId: "455001591583",
    appId: "1:455001591583:web:837973671dc17f3603ea2a"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const initialState = {
    currentText: "",
    todos: [],
    token: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return {
                ...state,
                todos: action.todos,
                counter: action.counter
            }

        case 'ADD_TODO':
            if (state.currentText.length > 0) {
                let newState = {
                    ...state,
                    currentText: "",
                }

                return newState
            }
            return state
        case 'UPDATE_TODO':
            return { ...state, currentText: action.text }
        case 'CHECK_TODO':
            let newTodos = state.todos.map((item, index) => {
                if (item.text !== action.text) {
                    return item
                }

                return {
                    ...item,
                    checked: !item.checked,
                }
            })

            return { ...state, todos: newTodos }
        case 'REMOVE_TODO':
            let removeTodos = state.todos.filter((item, index) => item.text !== action.text)

            return { ...state, todos: removeTodos }
        case 'LOGIN_FACEBOOK':
            return {
                ...state,
                token: action.token,
                loading: action.loading
            }
    }
    return state
}

const store = createStore(reducer,
    applyMiddleware(thunk))


setTimeout(() => {
    checkForToken();
}, 2000);

checkForFirebaseCredential();
// Listen for authentication state to change.
firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
        store.dispatch(loginFacebook(user))
    }
});

export default function App() {
    console.log('3')
    console.log(store.getState().token)
    if (store.getState().token === null) {
        return (
            <View style={styles.container}>
                <Button title="Login With Facebook" onPress={() => logIn()} />
            </View>
        );
    } else {
        var db = firebase.firestore();

        store.dispatch(getTodos())

        db.collection("users")
            .doc('A4vrp1H3bETPYQfpXkURdDEdBo93')
            .collection("todos")
            .where("deleted", "==", false)
            .onSnapshot((newTodos) => {
                store.dispatch(updateTodos(newTodos))
            });

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Text style={styles.header}>To Do</Text>
                    <TodoInput></TodoInput>
                    <TodoList></TodoList>
                </View>
            </Provider >
        );
    }
}

//Check Async Storage if token is available
//If it is available set loading state to false
async function checkForToken() {
    let token = await SecureStore.getItemAsync('token');

    store.dispatch({
        type: 'LOGIN_FACEBOOK',
        token: token,
        loading: false,
    })
}

async function checkForFirebaseCredential() {
    let credential = await SecureStore.getItemAsync('firebaseCredential');
    if (credential) {
        firebase
            .auth()
            .signInWithCredential(credential)
            .catch(error => {
                console.log('Auth failed and here the error' + JSON.stringify(error));
            });
    }
}

//Write token to secure storage and firebase credital.
async function saveTokenToSecureStorage(token, credential) {
    SecureStore.setItemAsync('token', token);
    //Save Firebase credential
    SecureStore.setItemAsync('firebaseCredential', credential);
}

async function logIn() {
    try {
        //Seed documentation on course site at mobileappdev.teachable.com
        //For default user names and passwords.
        await Facebook.initializeAsync('238123923880467');
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}`
            );
            let credential = firebase.auth.FacebookAuthProvider.credential(
                token
            );
            firebase
                .auth()
                .signInWithCredential(credential)
                .catch(error => {
                    console.log(
                        'Auth failed and here is the error ' + JSON.stringify(error)
                    );
                });
            saveTokenToSecureStorage(token, credential);
        } else {
            // type === 'cancel'
        }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8e6e3',
    },
    header: {
        marginTop: '15%',
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        borderColor: 'black',
        borderBottomWidth: 1,
        paddingRight: 10,
        paddingBottom: 10,
    },
    textInput: {
        flex: 1,
        height: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        paddingLeft: 10,
        minHeight: '3%',
    },
});