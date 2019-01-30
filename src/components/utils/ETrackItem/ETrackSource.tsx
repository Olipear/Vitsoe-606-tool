import * as React from 'react'
import { DragSource } from 'react-dnd'
import ETrackLayer from './ETrackLayer'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { convertMeasurement, unitSymbol } from '../../../utils/converters'

interface ETrackItemProps {
  pxRatio?: number
  systemData?: any
  initialData?: any
  updateDraggedETrack?: any
  snappedState?: any

  isDragging?: Function
  connectDragSource?: Function
  connectDragPreview?: Function
  canDrag?: Function
  itemPartno?: string
  item?: {
    length_cm: number
    length_in: number
    pins_available: number
    prices: Array<{
      GBP: string
      USD: string
      EUR: string
      JPY: string
    }>
  }
  disabled?: boolean
  lengthSystem?: 'metric' | 'imperial'
}

const ETrackSourceSpec = {
  beginDrag(props, monitor, component) {
    if (monitor.isDragging) {
      props.updateDraggedETrack(props.itemPartno)
    }
    return props.item
  },

  canDrag(props, monitor) {
    if (props.disabled) {
      return false
    }

    return true
  },

  endDrag(props, monitor, component) {
    props.updateDraggedETrack()
    if (!monitor.didDrop()) {
      return
    }

    if (props.systemData.state.system.etracks.length <= 0) {
      props.systemData.addSystemEtrack(
        props.itemPartno,
        props.systemData.state.environment.width / 2,
        0,
        'middle'
      )
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

class ETrackSource extends React.Component<ETrackItemProps> {
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
        {isDragging && !this.props.snappedState ? (
          <ETrackLayer
            itemPassedType={'e-track'}
            isDragging={isDragging}
            initialData={this.props.initialData}
            item={this.props.item}
            draggedETrack={this.props.itemPartno}
            pxRatio={this.props.pxRatio}
          />
        ) : (
          ''
        )}
        <div className='draggable-part-inner'>
          <div className='draggable-part-left'>
            <p>
              {this.props.lengthSystem === 'metric'
                ? this.props.item.length_cm
                : this.props.item.length_in}
              {unitSymbol(this.props.lengthSystem)}
              {this.props.item.length_cm != 11 &&
              this.props.item.length_cm != 39.5 ? (
                <br />
              ) : (
                ''
              )}
              <br />
              {this.props.item.length_cm == 11 ? '(floating shelves)' : ''}
              {this.props.item.length_cm == 39.5 ? '(floating cabinets)' : ''}
            </p>
            <hr
              style={{
                width: (100 / 228) * this.props.item.length_cm + '%',
              }}
            />
          </div>
          <div className='draggable-part-right'>
            <div className='draggable-part-img etrackicon'>
              <img draggable={false} src='img/parts/Etrack.svg' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DragSource('e-track', ETrackSourceSpec, collect)(ETrackSource)
