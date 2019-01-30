import * as React from 'react'
import { DragSource } from 'react-dnd'
import PartLayer from './PartLayer'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { convertMeasurement, unitSymbol } from '../../../utils/converters'

interface PartItemProps {
  pxRatio?: number
  systemData?: any
  lengthSystem: 'metric' | 'imperial'
  initialData?: any
  filterWidth?: any
  updateDraggedPart?: any
  snappedStatePartSource?: any
  draggedPart?: any
  draggedPartno?: any
  rulesData: any

  isDragging?: Function
  connectDragSource?: Function
  connectDragPreview?: Function
  canDrag?: Function
  itemPartno?: string
  item?: any
  disabled?: boolean
}

const PartSourceSpec = {
  beginDrag(props, monitor, component) {
    setTimeout(() => {
      if (monitor.isDragging) {
        props.updateDraggedPart(props.item, props.itemPartno)
      }
    }, 0)

    return props.item
  },

  canDrag(props, monitor) {
    if (props.disabled) {
      return false
    }
    return true
  },

  endDrag(props, monitor, component) {
    props.updateDraggedPart()
    props.rulesData.clearRules()
    if (!monitor.didDrop()) {
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

class PartSource extends React.Component<PartItemProps> {
  componentDidMount() {
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      })
    }
  }

  render() {
    const { isDragging, connectDragSource, canDrag } = this.props

    return connectDragSource(
      <div
        className={
          'draggable-part ' +
          (!isDragging && !canDrag ? 'disabled ' : '') +
          (isDragging ? 'dragging' : '')
        }
      >
        {isDragging &&
        this.props.draggedPart != null &&
        !this.props.snappedStatePartSource ? (
          <PartLayer
            pxRatio={this.props.pxRatio}
            itemPart={this.props.draggedPart}
            initialData={this.props.initialData}
            systemData={this.props.systemData}
            snappedState={this.props.snappedStatePartSource}
            itemPartno={this.props.draggedPartno}
          />
        ) : (
          ''
        )}
        <div className='draggable-part-inner'>
          <div className='draggable-part-left'>
            <p>
              {
                this.props.initialData.state.shelf_types[
                  this.props.initialData.state.shelves[this.props.itemPartno]
                    .shelf_type
                ]
              }
              <br />
              {this.props.lengthSystem === 'metric'
                ? this.props.initialData.state.shelves[this.props.itemPartno]
                    .shelf_depth
                : this.props.initialData.state.shelves[this.props.itemPartno]
                    .shelf_depth_in}
              {unitSymbol(this.props.lengthSystem) + ' deep'}
            </p>
          </div>
          <div className='draggable-part-right'>
            <div className='draggable-part-img part'>{this.props.children}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default DragSource('part', PartSourceSpec, collect)(PartSource)
