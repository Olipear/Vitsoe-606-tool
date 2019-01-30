import * as React from 'react'
import { Subscribe } from 'unstated'
import { InitialDataContainer } from '../../../containers/InitialData'
import { SystemContainer } from '../../../containers/System'
import ETrackTarget from '../../utils/ETrackItem/ETrackTarget'
import { TutorialContainer } from '../../../containers/Tutorial'

export const buttonStyles: React.CSSProperties = {
  position: 'absolute',
  backgroundColor: '#d02a00',
  border: '1px solid',
  borderColor: '#a32201',
  borderRadius: 8,
  color: 'white',
  padding: '2px 6px',
  top: -35,
  right: -10,
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  cursor: 'pointer',
}

export const targetStyles: React.CSSProperties = {
  display: 'flex',
  textAlign: 'center',
  position: 'absolute',
  width: '100%',
  height: '100%',
}

export interface EtrackDragDropProps {
  draggedETrackStructure: any
  draggedETrackStructureId: any
  partno: any
  pxRatio: number
  e_trackID: number
  draggedETrack: any
  snappedStateTarget: any
  updateSnappedState: any
}

export const ETrackDragDrop = (props: EtrackDragDropProps) => {
  return (
    <Subscribe to={[InitialDataContainer, SystemContainer, TutorialContainer]}>
      {(
        initialData: InitialDataContainer,
        systems: SystemContainer,
        tutorial: TutorialContainer
      ) => {
        let bayWidths = Object.keys(initialData.state.bay_widths)
        if (props.draggedETrackStructureId == null) {
          return (
            <div>
              {props.e_trackID == 0 ? (
                <div style={targetStyles}>
                  <ETrackTarget
                    width90Target={false}
                    pxRatio={props.pxRatio}
                    e_trackID={props.e_trackID}
                    initialData={initialData}
                    snappedStateTarget={props.snappedStateTarget}
                    updateSnappedState={props.updateSnappedState}
                    systemData={systems}
                    draggedETrack={props.draggedETrack}
                    direction={'left'}
                    spacing={Number(bayWidths[0]) * props.pxRatio}
                    widthTargetStyle={
                      initialData.state.constants.ETRACK_WIDTH * props.pxRatio
                    }
                    tutorialUpdateStep={tutorial.updateStep}
                  />
                  <ETrackTarget
                    width90Target={true}
                    pxRatio={props.pxRatio}
                    e_trackID={props.e_trackID}
                    initialData={initialData}
                    snappedStateTarget={props.snappedStateTarget}
                    updateSnappedState={props.updateSnappedState}
                    systemData={systems}
                    draggedETrack={props.draggedETrack}
                    direction={'left'}
                    spacing={Number(bayWidths[1]) * props.pxRatio}
                    widthTargetStyle={
                      initialData.state.constants.ETRACK_WIDTH * props.pxRatio
                    }
                    tutorialUpdateStep={tutorial.updateStep}
                  />
                </div>
              ) : (
                ''
              )}
              {props.e_trackID == systems.state.system.etracks.length - 1 ? (
                <div style={targetStyles}>
                  <ETrackTarget
                    width90Target={false}
                    pxRatio={props.pxRatio}
                    e_trackID={props.e_trackID}
                    initialData={initialData}
                    snappedStateTarget={props.snappedStateTarget}
                    updateSnappedState={props.updateSnappedState}
                    systemData={systems}
                    draggedETrack={props.draggedETrack}
                    direction={'right'}
                    spacing={Number(bayWidths[0]) * props.pxRatio}
                    widthTargetStyle={
                      initialData.state.constants.ETRACK_WIDTH * props.pxRatio
                    }
                    tutorialUpdateStep={tutorial.updateStep}
                  />
                  <ETrackTarget
                    width90Target={true}
                    pxRatio={props.pxRatio}
                    e_trackID={props.e_trackID}
                    snappedStateTarget={props.snappedStateTarget}
                    updateSnappedState={props.updateSnappedState}
                    initialData={initialData}
                    systemData={systems}
                    draggedETrack={props.draggedETrack}
                    direction={'right'}
                    spacing={Number(bayWidths[1]) * props.pxRatio}
                    widthTargetStyle={
                      initialData.state.constants.ETRACK_WIDTH * props.pxRatio
                    }
                    tutorialUpdateStep={tutorial.updateStep}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          )
        } else {
          if (props.e_trackID == props.draggedETrackStructureId - 1) {
            return (
              <div style={targetStyles}>
                <ETrackTarget
                  width90Target={false}
                  pxRatio={props.pxRatio}
                  e_trackID={props.e_trackID}
                  snappedStateTarget={props.snappedStateTarget}
                  updateSnappedState={props.updateSnappedState}
                  initialData={initialData}
                  systemData={systems}
                  draggedETrack={props.draggedETrack}
                  draggedETrackStructure={props.draggedETrackStructure}
                  draggedETrackStructureId={props.draggedETrackStructureId}
                  direction={'right'}
                  spacing={Number(bayWidths[0]) * props.pxRatio}
                  widthTargetStyle={
                    initialData.state.constants.ETRACK_WIDTH * props.pxRatio
                  }
                  tutorialUpdateStep={tutorial.updateStep}
                />
                <ETrackTarget
                  width90Target={true}
                  pxRatio={props.pxRatio}
                  e_trackID={props.e_trackID}
                  snappedStateTarget={props.snappedStateTarget}
                  updateSnappedState={props.updateSnappedState}
                  initialData={initialData}
                  systemData={systems}
                  draggedETrack={props.draggedETrack}
                  draggedETrackStructure={props.draggedETrackStructure}
                  draggedETrackStructureId={props.draggedETrackStructureId}
                  direction={'right'}
                  spacing={Number(bayWidths[1]) * props.pxRatio}
                  widthTargetStyle={
                    initialData.state.constants.ETRACK_WIDTH * props.pxRatio
                  }
                  tutorialUpdateStep={tutorial.updateStep}
                />
              </div>
            )
          } else {
            return ''
          }
        }
      }}
    </Subscribe>
  )
}
