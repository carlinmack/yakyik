import React from 'react';
import {
    StyleSheet, TouchableOpacity, View, TextInput, Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { addTodo } from '../actions/Todo';

export function TodoInput(props) {
    return (
        <View style={styles.textInputContainer}>
            <TextInput
                style={styles.textInput}
                multiline={true}
                placeholder="New Post"
                placeholderTextColor="#abbabb"
                onChangeText={(value) => { props.updateTodo(value) }}
                value={props.currentText}
            />
            <TouchableOpacity onPress={props.addTodo}>
                <Icon name="send" size={30} color="black" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
        </View>
    );
}

function mapStateToProps(state) {
    return {
        counter: state.counter,
        currentText: state.currentText
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: () => dispatch(addTodo()),
        updateTodo: (text) => dispatch({ type: 'UPDATE_TODO', text: text }),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoInput);


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
        color: 'red',
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
