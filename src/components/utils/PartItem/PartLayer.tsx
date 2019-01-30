import * as React from 'react'
import { DragLayer } from 'react-dnd'
import { Part } from '../../parts/Part'

interface PartLayerProps {
  pxRatio?: number
  itemPart: any
  initialData?: any
  systemData?: any
  isDragging?: Function
  initialOffset?: Function
  currentOffset?: Function
  snappedState?: any
  itemType?: string
  itemPartno?: any
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

  let widthPX = (props.itemPart.bay_width * props.pxRatio) / 2
  const { x, y } = currentOffset

  return {
    left: x + stabiliser.x - widthPX,
    top:
      y +
      stabiliser.y -
      (props.initialData.state.constants.ETRACK_DISTANCE_BETWEEN_PINS_CM *
        props.pxRatio) /
        2,
  }
}

function collect(monitor) {
  return {
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    diffOffset: monitor.getInitialClientOffset(),
    isDragging: monitor.isDragging(),
  }
}

const PartLayer: React.SFC<PartLayerProps> = (props) => {
  const { itemType, isDragging } = props
  function renderItem() {
    switch (itemType) {
      case 'part':
        return (
          <Part
            pxRatio={props.pxRatio}
            itemPart={props.itemPartno}
            partObj={props.itemPart}
            systemFinish={props.systemData.state.system.finish}
            snappedState={props.snappedState}
            initialData={props.initialData}
          />
        )
      case 'part-system':
        return (
          <Part
            pxRatio={props.pxRatio}
            itemPart={props.itemPartno}
            partObj={props.itemPart}
            systemFinish={props.systemData.state.system.finish}
            snappedState={props.snappedState}
            initialData={props.initialData}
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
        zIndex: 900,
      }}
    >
      {renderItem()}
    </div>
  )
}

export default DragLayer<PartLayerProps>(collect)(PartLayer)
