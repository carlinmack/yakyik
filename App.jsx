import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Icon from 'react-native-vector-icons/Feather';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

const initialState = {
    currentText: "",
    todos: [{ text: "Don't get Coronavirus", key: 0, checked: false },
    { text: "Buy Toilet paper", key: 1, checked: false }],
}
initialState.counter = initialState.todos.length;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREASE_COUNTER':
            return { counter: state.counter + 1 }
        case 'DECREASE_COUNTER':
            return { counter: state.counter - 1 }
        case 'ADD_TODO':
            if (state.currentText.length > 0) {
                // console.log(state)

                newState = {
                    ...state,
                    todos: [
                        { text: state.currentText, key: state.counter, checked: false }, ...state.todos
                    ],
                    counter: state.counter + 1,
                    currentText: "",
                }

                return newState
            }
            return state
        case 'UPDATE_TODO':
            return { ...state, currentText: action.text }
    }
    return state
}

const store = createStore(reducer)

export default function App() {
    console.log(store)

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
