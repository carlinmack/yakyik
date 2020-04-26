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

// setTimeout(() => {
//     checkForToken();
// }, 2000);

// checkForFirebaseCredential();
// // Listen for authentication state to change.
// firebase.auth().onAuthStateChanged(user => {
//     if (user != null) {
//         store.dispatch(loginFacebook(user))
//     }
// });
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
        console.log("signing out");
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

// export default function App() {
//     console.log("[APP");
//     console.log(store.getState().token);
//     console.log(store.token);
//     console.log("APP]");

//     return (
//         <Provider store={store}>
//             <NavigationContainer>
//                 <Stack.Navigator>
//                     {store.getState().token !== "dummy-auth-token" ? (
//                         <Stack.Screen
//                             name="LogIn"
//                             component={LogIn}
//                             options={{ headerShown: false }}
//                         />
//                     ) : (
//                         <Stack.Screen
//                             name="YakYik"
//                             component={Home}
//                             options={{
//                                 headerStyle: {
//                                     backgroundColor: "#f4f3f1",
//                                 },
//                                 headerTitleStyle: {
//                                     fontWeight: "bold",
//                                 },
//                                 headerTitleAlign: "center",
//                             }}
//                         />
//                     )}
//                 </Stack.Navigator>
//             </NavigationContainer>
//         </Provider>
//     );
// }

//Check Async Storage if token is available
//If it is available set loading state to false
// async function checkForToken() {
//     let token = await SecureStore.getItemAsync('token');

//     store.dispatch({
//         type: 'LOGIN_FACEBOOK',
//         token: token,
//         loading: false,
//     })
// }

// async function checkForFirebaseCredential() {
//     let credential = await SecureStore.getItemAsync('firebaseCredential');
//     if (credential) {
//         firebase
//             .auth()
//             .signInWithCredential(credential)
//             .catch(error => {
//                 console.log('Auth failed and here the error' + JSON.stringify(error));
//             });
//     }
// }

//Write token to secure storage and firebase credital.
// async function saveTokenToSecureStorage(token, credential) {
//     SecureStore.setItemAsync('token', token);
//     //Save Firebase credential
//     SecureStore.setItemAsync('firebaseCredential', credential);
// }

// async function logIn() {
//     try {
//         //Seed documentation on course site at mobileappdev.teachable.com
//         //For default user names and passwords.
//         await Facebook.initializeAsync('238123923880467');
//         const {
//             type,
//             token,
//             expires,
//             permissions,
//             declinedPermissions,
//         } = await Facebook.logInWithReadPermissionsAsync({
//             permissions: ['public_profile'],
//         });
//         if (type === 'success') {
//             // Get the user's name using Facebook's Graph API
//             const response = await fetch(
//                 `https://graph.facebook.com/me?access_token=${token}`
//             );
//             let credential = firebase.auth.FacebookAuthProvider.credential(
//                 token
//             );
//             firebase
//                 .auth()
//                 .signInWithCredential(credential)
//                 .catch(error => {
//                     console.log(
//                         'Auth failed and here is the error ' + JSON.stringify(error)
//                     );
//                 });
//             saveTokenToSecureStorage(token, credential);
//         } else {
//             // type === 'cancel'
//         }
//     } catch ({ message }) {
//         alert(`Facebook Login Error: ${message}`);
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#e8e6e3",
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        borderColor: "black",
        borderBottomWidth: 1,
        paddingRight: 10,
        paddingBottom: 10,
    },
    textInput: {
        flex: 1,
        height: 20,
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        paddingLeft: 10,
        minHeight: "3%",
    },
});
