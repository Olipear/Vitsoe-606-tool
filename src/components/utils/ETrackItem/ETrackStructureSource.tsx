import * as React from 'react'
import { DragSource } from 'react-dnd'
import ETrackLayer from './ETrackLayer'
import { getEmptyImage } from 'react-dnd-html5-backend'

interface ETrackItemProps {
  pxRatio?: number
  systemData?: any
  initialData?: any
  partno: any
  e_trackID: number
  draggedETrack: any
  updateDraggedETrackStructure: any
  snappedStateTarget: any

  isDragging?: Function
  connectDragSource?: Function
  connectDragPreview?: Function
  canDrag?: Function
  tutorialUpdateStep: Function
}

const ETrackStructureSourceSpec = {
  beginDrag(props, monitor, component) {
    setTimeout(() => {
      if (monitor.isDragging) {
        props.updateDraggedETrackStructure(
          props.initialData.state.etracks[props.partno],
          props.e_trackID
        )
      }
    }, 0)
    return props.initialData.state.etracks[props.partno]
  },

  canDrag(props, monitor) {
    if (props.disabled) {
      return false
    }

    return true
  },

  endDrag(props, monitor, component) {
    props.updateDraggedETrackStructure()
    if (!monitor.didDrop()) {
      props.systemData.removeSystemEtrack(props.e_trackID)
      return
    }
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    canDrag: monitor.canDrag(),
  }
}

class ETrackStructureSource extends React.Component<ETrackItemProps> {
  componentDidMount() {
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      })
    }
  }

  render() {
    const { isDragging, connectDragSource } = this.props
    let paddingValue = 12.5 * this.props.pxRatio

    return connectDragSource(
      <div
        className='etrack-structure-source'
        id={'e-track-structure-' + this.props.e_trackID}
        style={{
          padding: paddingValue,
          marginLeft: -paddingValue,
        }}
      >
        {isDragging && !this.props.snappedStateTarget ? (
          <ETrackLayer
            itemPassedType={'e-track-structure'}
            isDragging={isDragging}
            initialData={this.props.initialData}
            item={this.props.initialData.state.etracks[this.props.partno]}
            systemData={this.props.systemData}
            e_trackID={this.props.e_trackID}
            draggedETrack={this.props.partno}
            pxRatio={this.props.pxRatio}
          />
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default DragSource('e-track', ETrackStructureSourceSpec, collect)(
  ETrackStructureSource
)
