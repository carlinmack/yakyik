import React from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import { addTodo } from "../actions/middleware";

export function TodoInput(props) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                multiline={true}
                placeholder="New Post"
                placeholderTextColor="#abbabb"
                onChangeText={(value) => {
                    props.updateTodo(value);
                }}
                value={props.currentText}
            />
            <TouchableOpacity onPress={props.addTodo}>
                <Icon
                    name="send"
                    size={30}
                    color="black"
                    style={{ marginRight: 10, marginLeft: 5 }}
                />
            </TouchableOpacity>
        </View>
    );
}

function mapStateToProps(state) {
    return {
        counter: state.counter,
        currentText: state.currentText,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: () => dispatch(addTodo()),
        updateTodo: (text) => dispatch({ type: "UPDATE_TODO", text: text }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 50,
        maxHeight: 150,
        width: "90%",
        borderRadius: 5,
        backgroundColor: "#f4f3f1",

        marginBottom: "5%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 3,
    },
    textInput: {
        flex: 1,
        // maxHeight: 80,
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        paddingLeft: 10,
    },
});
