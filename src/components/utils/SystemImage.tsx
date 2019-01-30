import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../containers/System'
import { VisibleLayerStructure } from '../utils/VisibleLayerStructure'
import { InitialDataContainer } from '../../containers/InitialData'
import { StructureContainer } from '../utils/StructureContainer'

interface SystemImageProps {
  pxRatio: number
  setPxRatio: Function
}

export const SystemImage = (props: SystemImageProps) => {
  return (
    <Subscribe to={[InitialDataContainer, SystemContainer]}>
      {(initialData: InitialDataContainer, systems: SystemContainer) => {
        return (
          <div className='system-image-container'>
            <StructureContainer
              pxRatio={props.pxRatio}
              setPxRatio={props.setPxRatio}
              wallHeight={systems.state.environment.height}
              wallWidth={systems.state.environment.width}
              lengthSystem={systems.state.lengthSystem}
            >
              <VisibleLayerStructure
                draggedETrack={null}
                pxRatio={props.pxRatio}
                systemData={systems}
                structureMode={false}
                styleProp={{
                  width: systems.state.environment.width * props.pxRatio,
                  height:
                    (systems.state.environment.height -
                      initialData.state.constants.ETRACK_DISTANCE_FROM_FLOOR) *
                    props.pxRatio,
                }}
              />
            </StructureContainer>
          </div>
        )
      }}
    </Subscribe>
  )
}
