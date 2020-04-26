import * as firebase from "firebase";
import "firebase/firestore";
import { Animated, StatusBar } from "react-native";
import { convertDistance, getDistance } from "geolib";
var firebaseConfig = {
    apiKey: "AIzaSyCiORa1Aum5CUWIE_ht7hHpWb8J_iRHLmU",
    authDomain: "mobile-app-dev-4afcb.firebaseapp.com",
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

var db = firebase.firestore();

export function getTodos() {
    // console.log("getTodos prior");
    return (dispatch) => {
        let user = db.collection("users").doc("A4vrp1H3bETPYQfpXkURdDEdBo93");

        let counter = 0;
        user.get()
            .then((doc) => {
                // console.log("doc", doc.data());
                if (doc.exists) {
                    dispatch({ type: "GET_COUNTER", counter: doc.data().counter });

                    let todos = doc
                        .data()
                        .todos.filter((item) => item["deleted"] === false)
                        .sort(function (a, b) {
                            return b.timestamp - a.timestamp;
                        });

                    dispatch({ type: "GET_TODOS", todos: todos });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    };
}

export function updateTodos(newTodos, { latitude, longitude }) {
    // console.log("updTodos");
    return (dispatch, getState) => {
        let todos = newTodos
            .filter((item) => item["deleted"] === false)
            .sort(function (a, b) {
                return b.timestamp - a.timestamp;
            })
            .map((item) => {
                item.distance = Math.round(
                    convertDistance(
                        getDistance(
                            { latitude: item.latitude, longitude: item.longitude },
                            { latitude: latitude, longitude: longitude }
                        ),
                        "ft"
                    )
                );
                return item;
            });
        dispatch({ type: "GET_TODOS", todos: todos });
    };
}

export function addTodo({ latitude, longitude }) {
    return (dispatch, getState) => {
        let user = db.collection("users").doc("A4vrp1H3bETPYQfpXkURdDEdBo93");
        let text = getState().currentText;
        // console.log(latitude, longitude);
        if (text.length > 0) {
            if (getState().username) {
                user.update({
                    todos: firebase.firestore.FieldValue.arrayUnion({
                        text: text,
                        deleted: false,
                        index: getState().counter,
                        likes: 0,
                        username: getState().username,
                        timestamp: firebase.firestore.Timestamp.now().seconds,
                        latitude: latitude,
                        longitude: longitude,
                    }),
                    counter: firebase.firestore.FieldValue.increment(1),
                }).then(() => {
                    dispatch({ type: "ADD_TODO" });
                });
            } else {
                alert("Please log out and log in again");
            }
        }
    };
}

export function setChecked(text, key) {
    return (dispatch, getState) => {
        let todo = db
            .collection("users")
            .doc("A4vrp1H3bETPYQfpXkURdDEdBo93")
            .collection("todos")
            .doc(key.toString());

        todo.get()
            .then((doc) => {
                if (doc.exists) {
                    todo.update({
                        checked: !doc.data().checked,
                    })
                        .then(() => {})
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    };
}

export function deleteTodo(text, key) {
    return (dispatch, getState) => {
        let todo = db
            .collection("users")
            .doc("A4vrp1H3bETPYQfpXkURdDEdBo93")
            .collection("todos")
            .doc(key.toString());

        todo.update({
            deleted: true,
        })
            .then(function (docRef) {})
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
    };
}

export function like(key) {
    return (dispatch, getState) => {
        // console.log("hello", key);
        const user = db.collection("users").doc("A4vrp1H3bETPYQfpXkURdDEdBo93");

        dispatch({ type: "LIKE", key: key });

        user.get()
            .then((doc) => {
                if (doc.exists) {
                    let likedTodo = doc.data().todos[key];
                    likedTodo["likes"]++;

                    const todos = [
                        ...doc.data().todos.slice(0, key),
                        likedTodo,
                        ...doc.data().todos.slice(key + 1),
                    ];

                    user.update({
                        todos: todos,
                    })
                        .then(function (docRef) {})
                        .catch(function (error) {
                            console.error("Error removing document: ", error);
                        });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    };
}

export function setUsername() {
    return async (dispatch, getState) => {
        if (getState().currentUsername.length > 0) {
            let users = db.collection("users");
            console.log("signing in 1");
            try {
                users
                    .doc(getState().currentUsername)
                    .get()
                    .then(async (doc) => {
                        // console.log("doc", doc.data());
                        if (doc.exists) {
                            if (doc.data().password) {
                                console.log("show input");
                                dispatch({ type: "SHOW_PASSWORD_ENTER" });
                            }
                        } else {
                            await firebase.auth().signInAnonymously();
                            dispatch({ type: "LOGIN" });
                        }
                    });
            } catch (e) {
                switch (e.code) {
                    case "auth/operation-not-allowed":
                        console.log("Enable anonymous in your firebase console.");
                        break;
                    default:
                        console.error(e);
                        break;
                }
            }
            return "done";
        } else {
            alert("Please enter a username");
        }
    };
}

export function setPassword() {
    return async (dispatch, getState) => {
        if (getState().currentPassword.length > 0) {
            try {
                let users = db.collection("users");
                users.doc(getState().username).set({
                    password: getState().currentPassword,
                });
                dispatch({ type: "SET_PASSWORD" });
            } catch (e) {
                switch (e.code) {
                    case "auth/operation-not-allowed":
                        console.log("Enable anonymous in your firebase console.");
                        break;
                    default:
                        console.log("heheheeheh");
                        console.error(e);
                        break;
                }
            }
            return "done";
        } else {
            alert("Please enter a password");
        }
    };
}

export function checkPassword() {
    return async (dispatch, getState) => {
        if (getState().currentPassword.length > 0) {
            let users = db.collection("users");
            try {
                users
                    .doc(getState().currentUsername)
                    .get()
                    .then(async (doc) => {
                        // console.log("doc", doc.data());
                        if (doc.exists && doc.data().password) {
                            if (getState().currentPassword == doc.data().password) {
                                await firebase.auth().signInAnonymously();
                                dispatch({ type: "LOGIN" });
                            }
                        } else {
                            await firebase.auth().signInAnonymously();
                            dispatch({ type: "LOGIN" });
                        }
                    });
            } catch (e) {
                switch (e.code) {
                    case "auth/operation-not-allowed":
                        console.log("Enable anonymous in your firebase console.");
                        break;
                    default:
                        console.log("heheheeheh");
                        console.error(e);
                        break;
                }
            }
            return "done";
        } else {
            alert("Please enter a password");
        }
    };
}

export function toggleColorScheme() {
    return (dispatch, getState) => {
        if (getState().colorScheme == "dark") {
            StatusBar.setBarStyle("dark-content");
            Animated.timing(getState().colorState, {
                toValue: 1,
                duration: 750,
            }).start();
        } else {
            StatusBar.setBarStyle("light-content");
            Animated.timing(getState().colorState, {
                toValue: 0,
                duration: 750,
            }).start();
        }
        dispatch({ type: "TOGGLE_COLOR_SCHEME" });
    };
}
