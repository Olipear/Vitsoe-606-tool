import * as React from 'react'
import { Etrack } from '../parts/Etrack'

interface TargetProps {
  styleProp: {
    width: number
    height: number
  }
  systemData?: any
  pxRatio: number
  draggedETrack: any
  structureMode: boolean
  draggedPart?: any
  draggedPartno?: any
  updateDraggedEtrackIdTargetLayer?: any
  updateSnappedStateForETrackSource?: any
  snappedStateEtrackSource?: any
  updateSnappedStateForPartSource?: any
  snappedStatePartSource?: any
}

export class VisibleLayerStructure extends React.Component<TargetProps, any> {
  constructor(props) {
    super(props)

    this.state = {
      draggedETrackStructure: null,
      draggedETrackStructureId: null,
      draggedPartSystem: null,
      draggedPartnoSystem: null,
      pinIdDraggedPartSystem: null,
      bayIdDraggedPartSystem: null,
      snappedStateTarget: null,
      snappedToEtrackTarget: null,
      snappedToPinTarget: null,
      hoveredEtrackID: null,
    }
  }

  updateDraggedComponentSystem = (
    item = null,
    partno = null,
    pinID = null,
    bayID = null
  ) => {
    this.setState({
      draggedPartSystem: item,
      draggedPartnoSystem: partno,
      pinIdDraggedPartSystem: pinID,
      bayIdDraggedPartSystem: bayID,
    })
  }

  updateDraggedETrackStructure = (item = null, id = null) => {
    this.props.updateDraggedEtrackIdTargetLayer(id)
    this.setState({
      draggedETrackStructure: item,
      draggedETrackStructureId: id,
    })
  }

  updateSnappedState = (
    snappedState = null,
    snappedToEtrack = null,
    snappedToPin = null
  ) => {
    if (
      this.state.draggedETrackStructure != null ||
      this.props.draggedETrack != null
    ) {
      this.props.updateSnappedStateForETrackSource(snappedState)
    } else {
      if (!this.props.structureMode && this.props.draggedPart) {
        this.props.updateSnappedStateForPartSource(snappedState)
      }
    }
    this.setState({
      snappedStateTarget: snappedState,
      snappedToEtrackTarget: snappedToEtrack,
      snappedToPinTarget: snappedToPin,
    })
  }

  updateHoveredEtrack = (e_trackID = null) => {
    this.setState({ hoveredEtrackID: e_trackID })
  }

  render() {
    let tmpThis = this

    let snappedStateTargetCallBack
    if (
      this.state.draggedETrackStructure != null &&
      this.state.draggedETrackStructureId == 0
    ) {
      snappedStateTargetCallBack = this.props.snappedStateEtrackSource
    } else {
      snappedStateTargetCallBack = this.state.snappedStateTarget
    }
    return (
      <div
        id='visible-area'
        style={{
          width: this.props.styleProp.width,
          height: this.props.styleProp.height,
          position: 'relative',
        }}
      >
        {this.props.systemData.state.system.etracks.map(function(elem, index) {
          return (
            <Etrack
              key={index + 'etracksonvisible'}
              e_trackID={index}
              partno={elem.part_number}
              pxRatio={tmpThis.props.pxRatio}
              draggedETrack={tmpThis.props.draggedETrack}
              draggedPart={tmpThis.props.draggedPart}
              draggedPartno={tmpThis.props.draggedPartno}
              structureMode={tmpThis.props.structureMode}
              updateDraggedComponentSystem={
                tmpThis.updateDraggedComponentSystem
              }
              draggedPartSystem={tmpThis.state.draggedPartSystem}
              draggedPartnoSystem={tmpThis.state.draggedPartnoSystem}
              pinIdDraggedPartSystem={tmpThis.state.pinIdDraggedPartSystem}
              bayIdDraggedPartSystem={tmpThis.state.bayIdDraggedPartSystem}
              updateDraggedETrackStructure={
                tmpThis.updateDraggedETrackStructure
              }
              draggedETrackStructure={tmpThis.state.draggedETrackStructure}
              draggedETrackStructureId={tmpThis.state.draggedETrackStructureId}
              snappedStateTarget={snappedStateTargetCallBack}
              updateSnappedState={tmpThis.updateSnappedState}
              snappedToEtrackTarget={tmpThis.state.snappedToEtrackTarget}
              snappedToPinTarget={tmpThis.state.snappedToPinTarget}
              updateHoveredEtrack={tmpThis.updateHoveredEtrack}
              hoveredEtrackID={tmpThis.state.hoveredEtrackID}
            />
          )
        })}
      </div>
    )
  }
}
