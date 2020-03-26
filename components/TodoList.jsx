import React from 'react';
import {
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import Todo from './Todo';

export function TodoList(props) {
    return (
        <ScrollView style={{ width: '100%' }}>
            {(props.todos) ?
                props.todos.map(item => (
                    <Todo
                        text={item.text}
                        key={item.key}
                        checked={item.checked}
                    />
                )) : <Todo />
            }
        </ScrollView>
    )
}


function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        increaseCounter: () => dispatch({ type: 'INCREASE_COUNTER' }),
        decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
        addTodo: () => dispatch({ type: 'ADD_TODO' }),
        updateTodo: (text) => dispatch({ type: 'UPDATE_TODO', text: text })
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);