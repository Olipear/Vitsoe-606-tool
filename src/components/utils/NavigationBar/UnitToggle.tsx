import * as React from 'react'
import Dropdown from 'react-dropdown'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../../containers/System'

export const UnitToggle = (props) => {
  const unitOptions = [
    { value: 'imperial', label: 'Inches' },
    { value: 'metric', label: 'Centimeters' },
  ]
  return (
    <Subscribe to={[SystemContainer]}>
      {(systems: SystemContainer) => {
        let areWeAtDimensionsStage = false
        if (props.currentIndex == 1) {
          areWeAtDimensionsStage = true
        }
        return (
          <Dropdown
            placeholder='Select a unit'
            options={unitOptions}
            className='dropdown dropdown-units'
            onChange={(e) =>
              systems.changeUnitsParts(e, areWeAtDimensionsStage)
            }
            value={systems.state.lengthSystem}
          />
        )
      }}
    </Subscribe>
  )
}
