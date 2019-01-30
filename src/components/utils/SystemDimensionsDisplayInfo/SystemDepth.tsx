import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../../containers/System'
import { convertMeasurementIncludingUnits } from '../../../utils/converters'

export const SystemDepth = () => {
  return (
    <Subscribe to={[SystemContainer]}>
      {(systems: SystemContainer) => {
        return (
          <span>
            {convertMeasurementIncludingUnits(
              systems.state.system.dimensions.depth,
              systems.state.lengthSystem
            )}
          </span>
        )
      }}
    </Subscribe>
  )
}
