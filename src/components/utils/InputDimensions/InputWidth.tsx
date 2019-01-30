import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../../containers/System'
import { InputCMs } from './InputCMs'
import { InputFeetAndInches } from './InputFeetAndInches'

export const InputWidth = (props) => {
  return (
    <Subscribe to={[SystemContainer]}>
      {(systems) => {
        let component = null
        if (systems.state.lengthSystem == 'imperial') {
          return (
            <InputFeetAndInches
              id='width'
              placeholder='Width'
              label={props.label}
              measurement={systems.state.environment.width}
            />
          )
        } else {
          return (
            <InputCMs
              id='width'
              placeholder='Width'
              label={props.label}
              measurement={systems.state.environment.width}
            />
          )
        }
      }}
    </Subscribe>
  )
}
