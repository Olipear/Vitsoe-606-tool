import * as React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'unstated'

const rootEl = document.getElementById('root')

render(
  <AppContainer>
    <Provider>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </AppContainer>,
  rootEl
)

// Hot Module Replacement API
declare let module: { hot: any }

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default

    render(
      <AppContainer>
        <Provider>
          <HashRouter>
            <NewApp />
          </HashRouter>
        </Provider>
      </AppContainer>,
      rootEl
    )
  })
}
