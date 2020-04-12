import React from "react";
import { ScrollView } from "react-native";

import { connect } from "react-redux";
import Todo from "./Todo";

export function TodoList(props) {
    // console.log(props.todos[0]);
    return (
        <ScrollView style={{ width: "100%" }}>
            {props.todos ? (
                props.todos.map((item) => (
                    <Todo
                        postUsername={item.username}
                        text={item.text}
                        index={item.index}
                        key={item.index}
                        checked={item.checked}
                        likes={item.likes}
                    />
                ))
            ) : (
                <Todo />
            )}
        </ScrollView>
    );
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: () => dispatch({ type: "ADD_TODO" }),
        updateTodo: (text) => dispatch({ type: "UPDATE_TODO", text: text }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
