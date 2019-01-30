import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../../containers/System'
import {
  inToFtOnly,
  inToInRemainingAfterFeet,
  inToCm,
  cmToIn,
  cmToInRemainingAfterFeet,
  cmToFtOnly,
} from '../../../utils/converters'
import { TutorialContainer } from '../../../containers/Tutorial'
import { capitalize } from 'lodash'

let measurement: {
  feet: any
  inches: any
}

function onChangeFeet(systems, newValue, id, tutorial) {
  newValue = newValue == '' ? 0 : newValue

  const currentTotalInches = systems.state.environment[id]
    ? cmToIn(systems.state.environment[id])
    : 0
  const currentInches = inToInRemainingAfterFeet(currentTotalInches)
  const newTotalInches = parseFloat(newValue) * 12 + currentInches
  let newTotalCms = inToCm(newTotalInches)

  if (id == 'height' && newTotalCms > 267.5) {
    newTotalCms = 267.5
  }

  newValue == ''
    ? tutorial.updateStep('add' + capitalize(id), false)
    : tutorial.updateStep('add' + capitalize(id), true)

  systems.updateEnvironment(id, newTotalCms)
}

function onChangeInches(systems, newValue, id, tutorial) {
  newValue = newValue == '' ? 0 : newValue

  const currentTotalInches = systems.state.environment[id]
    ? cmToIn(systems.state.environment[id])
    : 0
  const currentFeet = inToFtOnly(currentTotalInches)
  const newTotalInches = currentFeet * 12 + parseFloat(newValue)
  let newTotalCms = inToCm(newTotalInches)

  if (id == 'height' && newTotalCms > 267.5) {
    newTotalCms = 267.5
  }

  newValue == ''
    ? tutorial.updateStep('add' + capitalize(id), false)
    : tutorial.updateStep('add' + capitalize(id), true)

  systems.updateEnvironment(id, newTotalCms)
}

export const InputFeetAndInches = (props) => {
  return (
    <Subscribe to={[SystemContainer, TutorialContainer]}>
      {(systems: SystemContainer, tutorial: TutorialContainer) => {
        measurement = { feet: '', inches: '' }

        if (parseFloat(props.measurement)) {
          measurement.feet = cmToFtOnly(props.measurement)
          if (measurement.feet == 0) {
            measurement.feet = ''
          }

          measurement.inches = cmToInRemainingAfterFeet(props.measurement)
          if (measurement.inches == 0) {
            measurement.inches = ''
          }
        }

        return (
          <div className='input-dimension inch'>
            <input
              type='number'
              name={props.id + '-feet'}
              id={props.id + '-feet'}
              placeholder='feet'
              value={measurement.feet}
              onChange={(e) =>
                onChangeFeet(systems, e.target.value, props.id, tutorial)
              }
              min={0}
            />
            <div>'</div>
            <input
              type='number'
              name={props.id + '-inches'}
              id={props.id + '-inches'}
              placeholder='inches'
              value={measurement.inches}
              onChange={(e) =>
                onChangeInches(systems, e.target.value, props.id, tutorial)
              }
              min={0}
            />
            <div>"</div>
          </div>
        )
      }}
    </Subscribe>
  )
}
