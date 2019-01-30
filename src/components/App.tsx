import * as React from 'react'
import './../assets/scss/App.scss'
import { Route, Switch } from 'react-router-dom'
import { Subscribe } from 'unstated'
import { InitialDataContainer } from '../containers/InitialData'
import * as Pages from './Pages'

export default class App extends React.Component {
  render() {
    return (
      <Subscribe to={[InitialDataContainer]}>
        {(initialData: InitialDataContainer) => {
          return (
            <div className='app'>
              {!initialData.state.loaded ? (
                <p>Loading...</p>
              ) : (
                <Switch>
                  <Route exact path='/' component={Pages.Introduction} />
                  <Route path='/share/:id' component={Pages.Share} />
                  <Route path='/configurator' component={Pages.Configurator} />
                  <Route component={Pages.NotFound} />
                </Switch>
              )}
            </div>
          )
        }}
      </Subscribe>
    )
  }
}
