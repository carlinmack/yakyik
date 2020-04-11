const initialState = {
    currentText: "",
    todos: [],
    token: null,
    counter: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            console.log('tod ')
            console.log(action.todos)
            return {
                ...state,
                todos: action.todos
            }
        case 'GET_COUNTER':
            console.log('cou ')

            return {
                ...state,
                counter: action.counter
            }

        case 'ADD_TODO':
            console.log('add ')
            if (state.currentText.length > 0) {
                let newState = {
                    ...state,
                    currentText: "",
                }

                return newState
            }
            return state
        case 'UPDATE_TODO':
            console.log('updtod ')
            return { ...state, currentText: action.text }
        case 'UPDATE_COUNTER':
            console.log('updcou ')
            return { ...state, counter: action.counter }
        case 'CHECK_TODO':
            console.log('che ')
            let newTodos = state.todos.map((item, index) => {
                if (item.text !== action.text) {
                    return item
                }

                return {
                    ...item,
                    checked: !item.checked,
                }
            })

            return { ...state, todos: newTodos }
        case 'LOGIN_FACEBOOK':
            console.log('log ')
            return {
                ...state,
                token: state.token + 1
            }
        case 'LIKE':
            console.log('lik ')
            console.log(action.key)

            const index = state.todos.findIndex((todo) => todo['key'] == action.key - 1)

            const todos = [
                ...state.todos.slice(0, index),
                state.todos[index]['likes'] + 1,
                ...state.todos.slice(index + 1)
            ]
            return {
                ...state,
                ...todos
            }
    }
    return state
}

export default reducer