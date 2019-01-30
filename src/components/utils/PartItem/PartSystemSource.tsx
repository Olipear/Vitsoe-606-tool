import * as React from 'react'
import { DragSource } from 'react-dnd'
import PartLayer from './PartLayer'
import { getEmptyImage } from 'react-dnd-html5-backend'

interface PartItemSystemProps {
  pxRatio?: number
  systemData?: any
  initialData?: any
  updateDraggedComponentSystem?: any
  draggedPartSystem?: any
  draggedPartnoSystem?: any
  topStyles?: any
  e_trackID?: any
  pinID: any
  snappedStateTarget?: any
  rulesData: any
  updateHoveredPartState?: any

  isDragging?: Function
  connectDragSource?: Function
  connectDragPreview?: Function
  canDrag?: Function
  itemPartno?: string
  item?: any
  disabled?: boolean
}

const PartSourceSystemSpec = {
  beginDrag(props, monitor, component) {
    setTimeout(() => {
      if (monitor.isDragging) {
        props.updateDraggedComponentSystem(
          props.item,
          props.itemPartno,
          props.pinID,
          props.e_trackID + 1
        )
      }
    }, 0)

    return props.item
  },

  canDrag(props, monitor) {
    return true
  },

  endDrag(props, monitor, component) {
    props.updateDraggedComponentSystem()
    props.rulesData.clearRules()
    if (!monitor.didDrop()) {
      props.systemData.removeComponentFromBay(props.e_trackID + 1, props.pinID)
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

class PartSystemSource extends React.Component<PartItemSystemProps, any> {
  constructor(props) {
    super(props)
    this.state = { attachedEv: false }
  }

  componentDidMount() {
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      })
    }
    if (this.props.pinID != null && this.props.e_trackID != null) {
      let PartSourceElement
      setTimeout(() => {
        PartSourceElement = document.getElementById(
          'draggable-part-system-' +
            this.props.pinID +
            '-' +
            this.props.e_trackID
        )
        if (PartSourceElement && !this.state.attachedEv) {
          PartSourceElement.addEventListener('mouseenter', () => {
            this.props.updateHoveredPartState(
              this.props.pinID,
              this.props.e_trackID
            )
          })
          PartSourceElement.addEventListener('mouseleave', () => {
            this.props.updateHoveredPartState()
          })
          this.setState({ attachedEv: true })
        }
      }, 0)
    } else {
      this.setState({ attachedEv: false })
    }
  }

  render() {
    const { isDragging, connectDragSource, canDrag } = this.props

    let widthStyle =
      (this.props.systemData.state.system.etracks[this.props.e_trackID + 1].x -
        this.props.systemData.state.system.etracks[this.props.e_trackID].x) *
      this.props.pxRatio

    let heightStyle =
      this.props.initialData.state.constants.ETRACK_DISTANCE_BETWEEN_PINS_CM *
      this.props.initialData.state.shelves[this.props.itemPartno]
        .pins_occupied *
      this.props.pxRatio

    return connectDragSource(
      <div
        id={
          'draggable-part-system-' +
          this.props.pinID +
          '-' +
          this.props.e_trackID
        }
        className={'draggable-part-system ' + (isDragging ? 'dragging' : '')}
        style={{
          position: 'absolute',
          left: this.props.initialData.state.constants
            .ETRACK_DISTANCE_FROM_EDGE_TO_SHELF,
          top: this.props.topStyles,
          width: widthStyle,
          height: heightStyle,
          zIndex: 200 * (this.props.e_trackID + 1) + this.props.pinID,
        }}
      >
        {isDragging &&
        this.props.draggedPartSystem != null &&
        !this.props.snappedStateTarget ? (
          <PartLayer
            pxRatio={this.props.pxRatio}
            itemPart={this.props.draggedPartSystem}
            initialData={this.props.initialData}
            systemData={this.props.systemData}
            itemPartno={this.props.draggedPartnoSystem}
            snappedState={this.props.snappedStateTarget}
          />
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default DragSource('part', PartSourceSystemSpec, collect)(
  PartSystemSource
)
