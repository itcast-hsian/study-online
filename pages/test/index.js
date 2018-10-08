import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Head from "../common/head"
import Banner from "./components/banner"

import { addTodo, addTodoAsync } from 'actions/todo'
import styles from "./index.less"

// 异步的action
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTodoAsync: addTodoAsync(dispatch)
//   }
// }

@connect(
  ({todos}) => ({
    todos
  }),
  {
    addTodo
  },
// 需要调用异步的action
//mapDispatchToProps
)
export default class Test extends React.Component {
  static async getInitialProps({store, ctx}) {
    const res = await fetch(
      'https://api.github.com/users'
    )
    const json = await res.json()

    return {
      users: json
    }
  }

  addTodos = e => {
    e.preventDefault()
    const {users, todos} = this.props;
    const len = todos.length;

    if (len > 30) {
      alert("已超出30条记录");
      return;
    }

    // 异步的action
    //this.props.addTodoAsync()
    this.props.addTodo(users.message || "not found")
  }

  render() {
    const {todos} = this.props;

    return (
      <div>
        <Head/>
        <Banner/>
        <button onClick={ this.addTodos }>
          添加用户
        </button>
        { todos.map(v => (
            <div
                 key={ v.id }
                 className={ styles.colorRed }>
              { v.text }
            </div>
          )) }
      </div>
    )
  }
}


