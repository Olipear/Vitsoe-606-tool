import * as React from 'react'
import { Subscribe } from 'unstated'
import { InitialDataContainer } from '../../containers/InitialData'
import { CheckEnvironment } from './CheckEnvironment'

interface CheckEnvironmentWrapperProps {
  checkOn: 'tooNarrow' | 'invalidMsg' | 'isInvalid'
  returnOnTrue: any
  returnOnFalse: any
  pxRatio?: number
}

class CheckEnvironmentWrapper extends React.Component<
  CheckEnvironmentWrapperProps
> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Subscribe to={[InitialDataContainer]}>
        {(initialData: InitialDataContainer) => {
          return (
            <CheckEnvironment
              initialData={initialData}
              checkOn={this.props.checkOn}
              returnOnFalse={this.props.returnOnFalse}
              returnOnTrue={this.props.returnOnTrue}
              pxRatio={this.props.pxRatio}
            />
          )
        }}
      </Subscribe>
    )
  }
}

export { CheckEnvironmentWrapper }
