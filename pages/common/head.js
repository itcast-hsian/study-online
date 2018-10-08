import React from 'react'
import { connect } from 'react-redux'


class Head extends React.Component {
  static getInitialProps({reduxStore, req}) {

    return {}
  }


  render() {
    return (
      <div>
        公共头部
      </div>
    )
  }
}

export default connect()(Head)
