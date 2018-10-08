import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import { withRouter } from 'next/router'
import withRedux from 'next-redux-wrapper'
import 'isomorphic-fetch'

import initStore from '../utils/store'

@withRouter
@withRedux(initStore, {
  debug: typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
})
export default class AppContainer extends App {

  static async getInitialProps({Component, ctx}) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        // next-redux-wrapper需要返回页面的getInitialProps
        // 否则页面的getInitialProps不会执行
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    }
  }

  render() {
    const {Component, pageProps, store, router} = this.props
    const {pathname} = router;

    // components路径是页面组件，不能单独访问
    // common是公共组件，不能单独访问
    try {
      if (pathname.indexOf("components") > -1 || pathname.indexOf("common") > -1) {
        window.history.back();
        return null;
      }
    } catch ( err ) {}

    return (
      <Container>
        <Provider store={ store }>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

