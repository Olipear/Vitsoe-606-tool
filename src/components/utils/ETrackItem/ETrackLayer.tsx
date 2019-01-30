import * as React from 'react'
import { DragLayer } from 'react-dnd'

interface ETrackLayerProps {
  draggedETrack?: any
  itemPassedType?: string
  pxRatio?: number
  item?: any
  e_trackID?: number
  initialData?: any
  systemData?: any
  isDragging?: Function
  initialOffset?: Function
  currentOffset?: Function
}

function getItemStyles(props) {
  const { currentOffset, initialOffset, diffOffset } = props

  let stabiliser = { x: 0, y: 0 }
  if (initialOffset != null && diffOffset != null) {
    stabiliser.x = diffOffset.x - initialOffset.x
    stabiliser.y = diffOffset.y - initialOffset.y
  }

  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  let lengthPX = (props.item.length_cm * props.pxRatio) / 2

  const { x, y } = currentOffset

  return {
    left: x + stabiliser.x,
    top: y + stabiliser.y - lengthPX,
  }
}

function collect(monitor) {
  return {
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    diffOffset: monitor.getInitialClientOffset(),
  }
}

const ETrackLayer: React.SFC<ETrackLayerProps> = (props) => {
  const { isDragging } = props
  function renderItem() {
    switch (props.itemPassedType) {
      case 'e-track':
        return (
          <div
            className='etrack remove-state'
            style={{
              height:
                Number(
                  props.initialData.state.etracks[props.draggedETrack].length_cm
                ) * props.pxRatio,
              width:
                props.initialData.state.constants.ETRACK_WIDTH * props.pxRatio,
            }}
          />
        )
      default:
        return null
    }
  }

  if (!isDragging) {
    return <div />
  }

  let positionOffset = getItemStyles(props)

  return (
    <div
      className='dragged-part'
      style={{
        left: positionOffset.left,
        top: positionOffset.top,
      }}
    >
      {props.itemPassedType == 'e-track-structure'
        ? props.systemData.state.system.etracks.map((elem, index) => {
            if (index >= props.e_trackID) {
              return (
                <div
                  key={index + 'e-track-structure'}
                  className='etrack remove-state'
                  style={{
                    position: 'absolute',
                    height:
                      Number(
                        props.initialData.state.etracks[props.draggedETrack]
                          .length_cm
                      ) * props.pxRatio,
                    width:
                      props.initialData.state.constants.ETRACK_WIDTH *
                      props.pxRatio,
                    left:
                      index == props.e_trackID
                        ? 0
                        : (props.systemData.state.system.etracks[index].x -
                            props.systemData.state.system.etracks[
                              props.e_trackID
                            ].x) *
                          props.pxRatio,
                  }}
                />
              )
            }
          })
        : renderItem()}
    </div>
  )
}

export default DragLayer<ETrackLayerProps>(collect)(ETrackLayer)
