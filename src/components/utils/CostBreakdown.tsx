import * as React from 'react'
import { Subscribe } from 'unstated'
import { InitialDataContainer } from '../../containers/InitialData'
import { SystemContainer } from '../../containers/System'
import { ComponentCost } from '../utils/ComponentDisplayInfo/ComponentCost'
import { ComponentDescription } from '../utils/ComponentDisplayInfo/ComponentDescription'
import { EtrackCost } from './EtrackDisplayInfo/EtrackCost'
import { EtrackDescription } from './EtrackDisplayInfo/EtrackDescription'

export const CostBreakdown = () => {
  return (
    <Subscribe to={[InitialDataContainer, SystemContainer]}>
      {(initialData: InitialDataContainer, systems: SystemContainer) => {
        return (
          <div className='component-breakdown-list'>
            {systems.state.system.components.map((component) => {
              return (
                <div
                  className='component-breakdown-item'
                  key={
                    component.part_number +
                    '-' +
                    component.bay +
                    '-' +
                    component.pin
                  }
                >
                  <ComponentDescription
                    part_no={component.part_number}
                    initialDataShelves={initialData.state.shelves}
                    lengthSystem={systems.state.lengthSystem}
                    shelf_types={initialData.state.shelf_types}
                  />

                  <ComponentCost part_no={component.part_number} />
                </div>
              )
            })}

            {systems.state.system.etracks.map((etrack) => {
              return (
                <div
                  className='component-breakdown-item'
                  key={etrack.part_number + '-' + etrack.x + '-' + etrack.y}
                >
                  <EtrackDescription
                    part_no={etrack.part_number}
                    initialDataEtracks={initialData.state.etracks}
                    lengthSystem={systems.state.lengthSystem}
                  />

                  <EtrackCost part_no={etrack.part_number} />
                </div>
              )
            })}
          </div>
        )
      }}
    </Subscribe>
  )
}
