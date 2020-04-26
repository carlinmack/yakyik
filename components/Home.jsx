import React, { useEffect, useState } from "react";
import { StyleSheet, View, Picker, TouchableOpacity } from "react-native";

import { connect } from "react-redux";

import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import { updateTodos, getTodos } from "../actions/middleware";

import * as firebase from "firebase";
import "firebase/firestore";
import store from "../actions/store";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import * as Location from "expo-location";

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
    const [selectedValue, setSelectedValue] = useState("java");
    // setTimeout(() => {
    //     checkForToken(props);
    // }, 2000);

    //
    let background_color = props.colorSchemes[props.colorScheme].background;
    let text_color = props.colorSchemes[props.colorScheme].text;
    props.navigation.setOptions({
        headerStyle: {
            backgroundColor: background_color,
        },
        headerTitleStyle: { color: text_color },
        headerRight: () => <HeaderRight color={text_color} />,
        headerLeft: () => <ProfileButton color={text_color} />,
    });

    async function logOut() {
        console.log("signing out");
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.error(e);
        }
    }

    console.log("run Home");

    var db = firebase.firestore();

    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            console.log("ask location");
            await Location.requestPermissionsAsync();

            console.log("granted location");
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log("got location");
            db.collection("users")
                .doc("A4vrp1H3bETPYQfpXkURdDEdBo93")
                .onSnapshot((doc) => {
                    store.dispatch(
                        updateTodos(doc.data().todos, {
                            longitude: location.coords.longitude,
                            latitude: location.coords.latitude,
                        })
                    );
                });
        })();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: background_color }]}>
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

function ProfileButton({ color }) {
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
            <Icon name="user" size={20} style={{ marginLeft: 15, color: color }} />
        </TouchableOpacity>
    );
}

function HeaderRight({ color }) {
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
                style={{ height: 50, width: 100, color: color }}
                onValueChange={(itemValue, itemIndex) => {
                    store.dispatch({ type: "SET_SORT", sort: itemValue });
                    setSelectedSort(itemValue);
                }}
                mode="dropdown"
            >
                <Picker.Item label="Hot" value="hot" />
                <Picker.Item label="New" value="new" />
                <Picker.Item label="Nearby" value="nearby" />
            </Picker>
            <TouchableOpacity onPress={logOut}>
                <Icon
                    name="log-out"
                    size={20}
                    style={{ marginRight: 15, color: color }}
                />
            </TouchableOpacity>
        </View>
    );
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        colorSchemes: state.colorSchemes,
        colorScheme: state.colorScheme,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTodos: () => dispatch(getTodos()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

store.dispatch(getTodos());

firebase
    .firestore()
    .collection("users")
    .doc("A4vrp1H3bETPYQfpXkURdDEdBo93")
    .onSnapshot((newCounter) => {
        store.dispatch({ type: "UPDATE_COUNTER", counter: newCounter.data().counter });
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
