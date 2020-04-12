const initialState = {
    currentText: "",
    todos: [],
    token: null,
    counter: 0,
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
                let newState = {
                    ...state,
                    currentText: "",
                };

                return newState;
            }
            return state;
        case "UPDATE_TODO":
            console.log("updtod ");
            return { ...state, currentText: action.text };
        case "UPDATE_USERNAME":
            console.log("updusr ");
            return { ...state, currentUsername: action.text };
        case "UPDATE_COUNTER":
            console.log("updcou ");
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
        case "LOGIN":
            console.log("log ", state.currentUsername);
            return {
                ...state,
                username: state.currentUsername,
            };
        case "LIKE":
            const index = state.todos.findIndex((todo) => todo["index"] == action.key);

            let likedTodo = {
                ...state.todos[index],
                likes: state.todos[index]["likes"] + 1,
            };

            const todos = [
                ...state.todos.slice(0, index),
                likedTodo,
                ...state.todos.slice(index + 1),
            ];

            return {
                ...state,
                todos: todos,
            };
    }
    return state;
};

export default reducer;
