import { useState } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import { Animated } from "react-native";

const initialState = {
    currentUsername: "",
    currentPassword: "",
    todos: [],
    token: null,
    counter: 0,
    showUserInput: false,
    showPasswordInput: false,
    showPasswordEnter: false,
    showPasswordInputButton: true,
    showUserInputButton: true,
    sort: "new",
    colorSchemes: {
        light: {
            background: "#e8e6e3",
            text: "#333",
            button: "#f4f3f1",
            todo_background: "#eeecea",
            todo_border: "#e2e0dc",
            description_color: "#888",
        },
        dark: {
            background: "#383633",
            text: "#fff",
            button: "#484643",
            todo_background: "#3e3c3a",
            todo_border: "#32302c",
            description_color: "#888",
        },
    },
    colorState: new Animated.Value(0),
    colorScheme: "light",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TODOS":
            console.log("tod ");
            // console.log(action.todos);
            return {
                ...state,
                todos: action.todos,
            };
        case "GET_COUNTER":
            console.log("cou ");
            // console.log(action.counter);

            return {
                ...state,
                counter: action.counter,
            };

        case "ADD_TODO":
            console.log("add ");
            if (state.currentText.length > 0) {
                return {
                    ...state,
                    currentText: "",
                };
            }
            return state;
        case "UPDATE_TODO":
            console.log("updtod ");
            return { ...state, currentText: action.text };
        case "UPDATE_USERNAME":
            console.log("updUSR ");
            return { ...state, currentUsername: action.text };
        case "UPDATE_PASSWORD":
            console.log("updPAS ");
            return { ...state, currentPassword: action.text };
        case "UPDATE_COUNTER":
            // console.log("updcou ");
            // console.log(action.counter);
            return { ...state, counter: action.counter };
        case "CHECK_TODO":
            console.log("che ");
            let newTodos = state.todos.map((item, index) => {
                if (item.text !== action.text) {
                    return item;
                }

                return {
                    ...item,
                    checked: !item.checked,
                };
            });

            return { ...state, todos: newTodos };
        case "SHOW_USER_INPUT":
            return {
                ...state,
                showUserInput: !state.showUserInput,
                showUserInputButton: !state.showUserInputButton,
                showPasswordInputButton: !state.showUserInputButton,
            };
        case "SHOW_PASSWORD_INPUT":
            return {
                ...state,
                showPasswordInput: !state.showPasswordInput,
                showPasswordInputButton: !state.showPasswordInputButton,
                showUserInputButton: !state.showPasswordInputButton,
            };
        case "SHOW_PASSWORD_ENTER":
            console.log("SHpasENT");
            return { ...state, showPasswordEnter: !state.showPasswordEnter };
        case "RESET_PROFILE":
            console.log("res");
            return {
                ...state,
                showUserInput: false,
                showPasswordInput: false,
                showPasswordEnter: false,
                showPasswordInputButton: true,
                showUserInputButton: true,
            };
        case "LOGIN":
            console.log("log ", state.currentUsername);
            return {
                ...state,
                username: state.currentUsername,
                currentUsername: "",
                showUserInput: false,
                showPasswordEnter: false,
                showPasswordInputButton: true,
                showUserInputButton: true,
            };
        case "SET_PASSWORD":
            console.log(action.text);
            return {
                ...state,
                token: action.token,
                currentPassword: "",
                showPasswordInput: false,
                showPasswordInputButton: true,
                showUserInputButton: true,
            };
        case "SET_SORT":
            let todos;
            // console.log(state.todos[1]);
            if (action.sort === "new") {
                todos = state.todos.slice().sort(function (a, b) {
                    return b.timestamp - a.timestamp;
                });
            } else if (action.sort === "hot") {
                // console.log("hello");
                todos = state.todos.slice().sort(function (a, b) {
                    let now = new Date().getTime();
                    str = now.toString();
                    str = str.slice(0, -3);
                    now = parseInt(str);

                    let bTime = now - b.timestamp - 900000;
                    let aTime = now - a.timestamp - 900000;
                    console.log(now, a.timestamp, aTime, Math.log(aTime));
                    let aRank;
                    let bRank;
                    if (a.likes) {
                        aRank = a.likes + Math.log(aTime);
                    } else {
                        aRank = aTime;
                    }
                    if (b.likes) {
                        bRank = b.likes + Math.log(bTime);
                    } else {
                        bRank = bTime;
                    }
                    return bRank - aRank;
                });
                // console.log(todos);
            } else if (action.sort === "nearby") {
                // console.log("hello");
                todos = state.todos.slice().sort(function (a, b) {
                    return a.distance - b.distance;
                });
                // console.log(todos);
            }
            // console.log(todos[1]);

            return {
                ...state,
                todos: todos,
            };
        case "LIKE":
            const index = state.todos.findIndex((todo) => todo["index"] == action.key);

            let likedTodo = {
                ...state.todos[index],
                likes: state.todos[index]["likes"] + 1,
            };

            let likedTodos = [
                ...state.todos.slice(0, index),
                likedTodo,
                ...state.todos.slice(index + 1),
            ];

            return {
                ...state,
                todos: likedTodos,
            };
        case "TOGGLE_COLOR_SCHEME":
            if (state.colorScheme == "dark") {
                return {
                    ...state,
                    colorScheme: "light",
                };
            }
            return {
                ...state,
                colorScheme: "dark",
            };
    }
    return state;
};

export default reducer;
