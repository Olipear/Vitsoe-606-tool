import * as React from 'react'
import * as Types from '../Types'
import { Route, Redirect } from 'react-router-dom'
import { ConfiguratorDimensions } from './configurator-subpages/Configurator-dimensions'
import ConfiguratorStructure from './configurator-subpages/Configurator-structure'
import ConfiguratorParts from './configurator-subpages/Configurator-parts'
import { ConfiguratorEnd } from './configurator-subpages/Configurator-end'

import { Subscribe } from 'unstated'
import { SystemContainer } from '../../containers/System'
import { InitialDataContainer } from '../../containers/InitialData'

export class Configurator extends React.Component<Types.AppPage, any> {
  constructor(props) {
    super(props)
    this.state = {
      pxRatio: 0,
    }
  }

  setPxRatio = (ratio: number) => {
    this.setState({ pxRatio: ratio })
  }

  render() {
    return (
      <Subscribe to={[SystemContainer]}>
        {(systems: SystemContainer) => {
          return (
            <div>
              <Route
                exact
                path='/configurator/'
                render={() => <Redirect to='/configurator/dimensions' />}
              />
              <Route
                path='/configurator/dimensions'
                render={(props) => (
                  <ConfiguratorDimensions
                    width={systems.state.environment.width}
                    height={systems.state.environment.height}
                    changeDimensions={systems.updateEnvironment}
                    lengthSystem={systems.state.lengthSystem}
                    spaceName={systems.state.spaceName}
                    pxRatio={this.state.pxRatio}
                    setPxRatio={this.setPxRatio}
                  />
                )}
              />
              <Route
                path='/configurator/structure'
                render={(props) => (
                  <ConfiguratorStructure
                    width={systems.state.environment.width}
                    height={systems.state.environment.height}
                    pxRatio={this.state.pxRatio}
                    setPxRatio={this.setPxRatio}
                  />
                )}
              />
              <Route
                path='/configurator/parts'
                render={(props) => (
                  <ConfiguratorParts
                    width={systems.state.environment.width}
                    height={systems.state.environment.height}
                    pxRatio={this.state.pxRatio}
                    setPxRatio={this.setPxRatio}
                    setFinish={systems.setFinish}
                    changeUnitsParts={systems.changeUnitsParts}
                    changeCurrency={systems.changeCurrency}
                  />
                )}
              />
              <Route
                path='/configurator/end'
                render={(props) => (
                  <ConfiguratorEnd
                    pxRatio={this.state.pxRatio}
                    setPxRatio={this.setPxRatio}
                  />
                )}
              />
            </div>
          )
        }}
      </Subscribe>
    )
  }
}
