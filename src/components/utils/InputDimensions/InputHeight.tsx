import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../../containers/System'
import { InputCMs } from './InputCMs'
import { InputFeetAndInches } from './InputFeetAndInches'

export const InputHeight = (props) => {
  return (
    <Subscribe to={[SystemContainer]}>
      {(systems) => {
        if (systems.state.lengthSystem == 'imperial') {
          return (
            <InputFeetAndInches
              id='height'
              placeholder='Height'
              label={props.label}
              measurement={systems.state.environment.height}
            />
          )
        } else {
          return (
            <InputCMs
              id='height'
              placeholder='Height'
              label={props.label}
              measurement={systems.state.environment.height}
            />
          )
        }
      }}
    </Subscribe>
  )
}
