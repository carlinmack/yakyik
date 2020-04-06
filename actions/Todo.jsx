import * as firebase from 'firebase';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyCiORa1Aum5CUWIE_ht7hHpWb8J_iRHLmU",
    authDomain: "mobile-app-dev-4afcb.firebaseapp.com",
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

var db = firebase.firestore();

export function getTodos() {
    return (dispatch) => {
        let todo = db.collection("users").doc('yPnxijlZ8DF7dB5GDoZz').collection('todos')

        todo.get().then((docs) => {
            let todos = []
            let index = 0
            docs.forEach((doc) => {
                todos.push({ ...doc.data(), index: index, key: index })
                index = index + 1
            });
            console.log(todos)

            dispatch({ type: 'GET_TODOS', todos: todos, counter: todos.length })

        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}


export function addTodo() {
    return (dispatch, getState) => {
        let userRef = db.collection("users").doc('yPnxijlZ8DF7dB5GDoZz').collection('todos')

        userRef.doc(getState().counter.toString()).set({
            text: getState().currentText,
            checked: false,
            deleted: false,
        }).then(function (docRef) {
            dispatch({ type: 'ADD_TODO' })
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });
    }
}


export function setChecked(text, key) {
    console.log(text)
    console.log(key)
    return (dispatch, getState) => {
        let todo = db.collection("users").doc('yPnxijlZ8DF7dB5GDoZz').collection('todos').doc(key.toString())

        todo.get().then((doc) => {
            if (doc.exists) {
                todo.update({
                    "checked": !doc.data().checked
                }).then(() => {
                    dispatch({ type: 'CHECK_TODO', text: text })
                }).catch((error) => {
                    console.error("Error adding document: ", error);
                });
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}


export function deleteTodo(text, key) {
    return (dispatch, getState) => {
        let todo = db.collection("users").doc('yPnxijlZ8DF7dB5GDoZz').collection('todos').doc(key.toString())

        todo.update({
            "deleted": true
        }).then(function (docRef) {
            console.log(getState().currentText)
            dispatch({ type: 'REMOVE_TODO', text: text })
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

    }
}

export function loginFacebook() {
    return (dispatch) => {
        let todo = db.collection("users").doc('yPnxijlZ8DF7dB5GDoZz').collection('todos').doc(key.toString())

        todo.update({
            "deleted": true
        }).then(function (docRef) {
            console.log(getState().currentText)
            dispatch({ type: 'REMOVE_TODO', text: text })
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

    }
}