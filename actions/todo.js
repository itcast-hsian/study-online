import { ADD_TODO, REMOVE_TODO } from './'

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

// 异步action
export const addTodoAsync = (dispatch) => {
  return () => {
    const res = fetch(
      'https://api.github.com/users'
    )

    res.then(res => {
      console.log(res);
      dispatch({
        type: ADD_TODO,
        text: "what the hell"
      })
    })
  }
}
