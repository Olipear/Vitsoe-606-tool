import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../../containers/System'
import { TutorialContainer } from '../../../containers/Tutorial'
import { capitalize } from 'lodash'

function onChange(systems, newValue, id, tutorial) {
  let valuePassed = Number(newValue)
  if (id == 'height' && Number(newValue) > 267.5) {
    valuePassed = 267.5
  }
  systems.updateEnvironment(id, valuePassed)
  tutorial.updateStep('add' + capitalize(id), true)

  newValue == ''
    ? tutorial.updateStep('add' + capitalize(id), false)
    : tutorial.updateStep('add' + capitalize(id), true)
}

export const InputCMs = (props) => {
  return (
    <Subscribe to={[SystemContainer, TutorialContainer]}>
      {(systems: SystemContainer, tutorial: TutorialContainer) => {
        let measurement = props.measurement
        if (!parseFloat(measurement)) {
          measurement = ''
        }
        return (
          <div className='input-dimension cms'>
            <input
              type='number'
              name={props.id + '-cm'}
              id={props.id + '-cm'}
              placeholder={props.placeholder}
              value={measurement}
              onChange={(e) => {
                onChange(systems, Number(e.target.value), props.id, tutorial)
              }}
              min={0}
            />
            <div>cm</div>
          </div>
        )
      }}
    </Subscribe>
  )
}
