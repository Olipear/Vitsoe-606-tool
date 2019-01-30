import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../../containers/System'
import { convertMeasurementIncludingUnits } from '../../../utils/converters'

export const SystemHeight = () => {
  return (
    <Subscribe to={[SystemContainer]}>
      {(systems: SystemContainer) => {
        return (
          <span>
            {convertMeasurementIncludingUnits(
              systems.state.system.dimensions.height,
              systems.state.lengthSystem
            )}
          </span>
        )
      }}
    </Subscribe>
  )
}
