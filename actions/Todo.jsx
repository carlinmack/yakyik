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
        let user = db.collection("users").doc('A4vrp1H3bETPYQfpXkURdDEdBo93')
        let todo = user.collection('todos').where("deleted", "==", false)
        let counter = 0
        user.get().then((doc) => {
            if (doc.exists) {
                counter = doc.data().counter
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        todo.get().then((docs) => {
            let todos = []
            let index = 0
            docs.forEach((doc) => {
                todos.push({ ...doc.data(), index: index, key: index })
                index = index + 1
            });
            console.log(todos)

            dispatch({ type: 'GET_TODOS', todos: todos, counter: counter })

        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}

export function updateTodos(newTodos) {
    return (dispatch, getState) => {
        let todos = []
        let index = 0
        newTodos.forEach((doc) => {
            todos.push({ ...doc.data(), index: index, key: index })
            index = index + 1
        });

        dispatch({ type: 'GET_TODOS', todos: todos, counter: getState().counter + 1 })
    }
}


export function addTodo() {
    return (dispatch, getState) => {
        let user = db.collection("users").doc('A4vrp1H3bETPYQfpXkURdDEdBo93')
        let userRef = user.collection('todos')
        let text = getState().currentText

        if (text.length > 0) {
            userRef.doc(getState().counter.toString()).set({
                text: getState().currentText,
                checked: false,
                deleted: false,
            }).then(function (docRef) {
                dispatch({ type: 'ADD_TODO' })

                user.update({
                    counter: getState().counter + 1
                })
                    .then(function () {
                        console.log("Document successfully updated!");
                    })
                    .catch(function (error) {
                        console.error("Error updating document: ", error);
                    });
            }).catch(function (error) {
                console.error("Error flipping adding document: ", error);
            });
        }
    }
}


export function setChecked(text, key) {
    console.log(text)
    console.log(key)
    return (dispatch, getState) => {
        let todo = db.collection("users").doc('A4vrp1H3bETPYQfpXkURdDEdBo93').collection('todos').doc(key.toString())

        todo.get().then((doc) => {
            if (doc.exists) {
                todo.update({
                    "checked": !doc.data().checked
                }).then(() => {
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
        let todo = db.collection("users").doc('A4vrp1H3bETPYQfpXkURdDEdBo93').collection('todos').doc(key.toString())

        todo.update({
            "deleted": true
        }).then(function (docRef) {
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

    }
}

export function loginFacebook(token, user) {
    return (dispatch) => {
        console.log(token, user)

        dispatch({
            type: 'LOGIN_FACEBOOK', token: token,
            loading: false,
        })

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

    }
}

