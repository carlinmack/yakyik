import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Text,
} from 'react-native';

import { connect } from 'react-redux';
import Todo from './Todo';

export function LogIn(props) {
    // console.log(props.todos)
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Yik{props.token}Yik</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Add Task"
                    placeholderTextColor="#abbabb"
                />
                <TouchableOpacity onPress={props.login}>
                    <Text style={styles.header}>Select Username</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: () => dispatch({ type: 'LOGIN_FACEBOOK' }),
        updateTodo: (text) => dispatch({ type: 'UPDATE_TODO', text: text })
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogIn);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
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