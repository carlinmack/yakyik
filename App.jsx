import React, { useState, useEffect, createContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Picker } from "react-native";
import { createStore, applyMiddleware, getState } from "redux";
import Icon from "react-native-vector-icons/Feather";
import { Provider } from "react-redux";

import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Profile from "./components/Profile";

import * as Facebook from "expo-facebook";
import * as SecureStore from "expo-secure-store";

import * as firebase from "firebase";
import "firebase/firestore";

import reducer from "./actions/reducer";
import store from "./actions/store";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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

const Stack = createStackNavigator();

export const AuthContext = createContext(null);

function ProfileButton() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{
                justifyContent: "center",
                alignItems: "center",
                width: 50,
            }}
            onPress={() => navigation.push("Profile")}
        >
            <Icon name="user" size={20} color="black" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
    );
}

function HeaderRight() {
    async function logOut() {
        // console.log("signing out");
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.error(e);
        }
    }

    const [selectedSort, setSelectedSort] = useState("new");

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Picker
                selectedValue={selectedSort}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => {
                    store.dispatch({ type: "SET_SORT", sort: itemValue });
                    setSelectedSort(itemValue);
                }}
                mode="dropdown"
            >
                <Picker.Item label="Hot" value="hot" />
                <Picker.Item label="New" value="new" />
            </Picker>
            <TouchableOpacity onPress={logOut}>
                <Icon
                    name="log-out"
                    size={20}
                    color="black"
                    style={{ marginRight: 15 }}
                />
            </TouchableOpacity>
        </View>
    );
}

function BackButton() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{
                justifyContent: "center",
                alignItems: "center",
                width: 50,
            }}
            onPress={() => {
                navigation.pop();
                store.dispatch({ type: "RESET_PROFILE" });
            }}
        >
            <Icon
                name="corner-up-left"
                size={20}
                color="black"
                style={{ marginLeft: 15 }}
            />
        </TouchableOpacity>
    );
}

export default function AuthNavigator() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    // Handle user state changes
    function onAuthStateChanged(result) {
        // console.log("auth State", result);
        if (result) {
            setUser(result.uid);
        } else {
            setUser(null);
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const authSubscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

        // unsubscribe on unmount
        return authSubscriber;
    }, []);

    if (initializing) {
        return null;
    }

    return user ? (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="YakYik"
                        component={Home}
                        options={{
                            headerStyle: {
                                backgroundColor: "#f4f3f1",
                            },
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
                            headerTitleAlign: "center",
                            headerRight: () => <HeaderRight />,
                            headerLeft: () => <ProfileButton />,
                        }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    ) : (
        <Provider store={store}>
            <AuthContext.Provider value={user}>
                <LogIn />
            </AuthContext.Provider>
        </Provider>
    );
}
