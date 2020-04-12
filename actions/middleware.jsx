import * as firebase from "firebase";
import "firebase/firestore";

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
    console.log("getTodos prior");
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
                        .todos.filter((item) => item["deleted"] === false);

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

export function updateTodos(newTodos) {
    return (dispatch, getState) => {
        let todos = newTodos.filter((item) => item["deleted"] === false);

        dispatch({ type: "GET_TODOS", todos: todos });
    };
}

export function addTodo() {
    return (dispatch, getState) => {
        let user = db.collection("users").doc("A4vrp1H3bETPYQfpXkURdDEdBo93");
        let userRef = user.collection("todos");
        let text = getState().currentText;

        if (text.length > 0) {
            user.update({
                todos: firebase.firestore.FieldValue.arrayUnion({
                    text: getState().currentText,
                    checked: false,
                    deleted: false,
                    index: getState().counter,
                    likes: 0,
                    username: getState().username,
                }),
                counter: firebase.firestore.FieldValue.increment(1),
            }).then(() => {
                console.log("harry ");
                dispatch({ type: "ADD_TODO" });
            });
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
        console.log("hello", key);
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

export function loginFacebook(token, user) {
    console.log("midlog");
    return (dispatch) => {
        console.log(token, user);

        dispatch({
            type: "LOGIN_FACEBOOK",
            token: token,
            loading: false,
        });

        // db.collection('users').doc(user.uid).get()
        //     .then(docSnapshot => {
        //         if (!docSnapshot.exists) {
        //             console.log('=== Wahey ===')
        //         }
        //     });

        // todo.update({
        //     "deleted": true
        // }).then(function (docRef) {
        // }).catch(function (error) {
        //     console.error("Error removing document: ", error);
        // });
    };
}

export function logIn() {
    console.log("signing in 1");
    return async (dispatch) => {
        console.log("signing in 2");
        try {
            await firebase.auth().signInAnonymously();
            dispatch({ type: "LOGIN" });
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
    };
}
