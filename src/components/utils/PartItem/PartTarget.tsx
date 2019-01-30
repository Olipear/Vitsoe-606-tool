import * as React from 'react'
import { DropTarget } from 'react-dnd'

interface TargetProps {
  systemData: any
  initialData: any
  rulesData: any
  e_trackID: number
  pinID: number
  partno: any
  pxRatio: number
  draggedPart: any
  draggedPartno: any
  unAvailablePins: any
  pinsAvailable: any
  updateSnappedState: any
  snappedStateTarget: any
  snappedToEtrackTarget: any
  snappedToPinTarget: any
  draggedPartSystem: any
  draggedPartnoSystem: any
  pinIdDraggedPartSystem: any
  bayIdDraggedPartSystem: any
  toolTipMessage: any

  connectDropTarget?: Function
  hovered?: Function
  canDrop?: Function
  drop?: Function
  itemMonitor?: Function
  tutorialUpdateStep: Function
}

const targetSpec = {
  canDrop(props) {
    return true
  },

  hover(props, monitor, component) {
    if (
      (props.draggedPartSystem || props.draggedPartno) &&
      monitor.getClientOffset()
    ) {
      const componentRect = document
        .getElementById(
          'droppable-area-parts-' + props.pinID + '-' + props.e_trackID
        )
        .getBoundingClientRect()
      if (
        componentRect.left + componentRect.width >=
          monitor.getClientOffset().x &&
        componentRect.left <= monitor.getClientOffset().x &&
        componentRect.top + componentRect.height >=
          monitor.getClientOffset().y &&
        componentRect.top <= monitor.getClientOffset().y
      ) {
        if (
          props.snappedToPinTarget != props.pinID ||
          props.snappedToEtrackTarget != props.e_trackID
        ) {
          props.updateSnappedState(true, props.e_trackID, props.pinID)
        }
      }
    }
  },

  drop(props, monitor, component) {
    if (props.toolTipMessage == null || props.toolTipMessage.type != 'errors') {
      if (props.bayIdDraggedPartSystem && props.pinIdDraggedPartSystem) {
        props.systemData.removeComponentFromBay(
          props.bayIdDraggedPartSystem,
          props.pinIdDraggedPartSystem
        )
      }

      let bayWidth =
        props.systemData.state.system.etracks[props.e_trackID + 1].x -
        props.systemData.state.system.etracks[props.e_trackID].x

      let keysArray = Object.keys(props.initialData.state.shelves)

      let usedPart =
        props.draggedPartno != null
          ? props.draggedPartno
          : props.draggedPartnoSystem

      for (let i = 0; i < keysArray.length; i++) {
        if (
          props.initialData.state.shelves[keysArray[i]].finish_code ==
            props.initialData.state.shelves[usedPart].finish_code &&
          props.initialData.state.shelves[keysArray[i]].bay_width == bayWidth &&
          props.initialData.state.shelves[keysArray[i]].shelf_depth ==
            props.initialData.state.shelves[usedPart].shelf_depth &&
          props.initialData.state.shelves[keysArray[i]].shelf_type ==
            props.initialData.state.shelves[usedPart].shelf_type
        ) {
          props.tutorialUpdateStep('addComponent', true)
          props.systemData.addComponentToBay(
            keysArray[i],
            props.e_trackID + 1,
            props.pinID + 1
          )
          break
        }
      }
    }
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    itemMonitor: monitor.getItem(),
    canDrop: monitor.canDrop(),
  }
}

class PartTarget extends React.Component<TargetProps, any> {
  componentWillReceiveProps(nextProps) {
    if (this.props.canDrop) {
      if (nextProps.hovered !== this.props.hovered) {
        let usedPart =
          this.props.draggedPartno != null
            ? this.props.draggedPartno
            : this.props.draggedPartnoSystem

        if (nextProps.hovered) {
          this.props.rulesData.checkComponentInPosition(
            this.props.systemData.state.system,
            usedPart,
            this.props.e_trackID + 1,
            this.props.pinID + 1,
            this.props.draggedPartnoSystem,
            this.props.bayIdDraggedPartSystem,
            this.props.pinIdDraggedPartSystem
          )
        } else {
          this.props.updateSnappedState()
        }
      }
    }
  }
  render() {
    const { connectDropTarget, hovered, itemMonitor, canDrop } = this.props

    let paddingValue = 50
    let bayWidth =
      this.props.systemData.state.system.etracks[this.props.e_trackID + 1].x -
      this.props.systemData.state.system.etracks[this.props.e_trackID].x

    let widthStyle = bayWidth * this.props.pxRatio + paddingValue

    let heightStyle
    let bottomStyle
    let marginLeft = 0

    if (this.props.e_trackID == 0) {
      marginLeft = -paddingValue
    }

    bottomStyle =
      (this.props.pinID *
        this.props.initialData.state.constants.ETRACK_DISTANCE_BETWEEN_PINS_CM +
        this.props.initialData.state.constants.ETRACK_BOTTOM_TO_FIRST_PIN_CM *
          1.4 -
        this.props.initialData.state.constants
          .ETRACK_DISTANCE_BETWEEN_PINS_CM) *
      this.props.pxRatio
    heightStyle =
      this.props.initialData.state.constants.ETRACK_DISTANCE_BETWEEN_PINS_CM *
      this.props.pxRatio

    let isLowestPinAvailable =
      this.props.pinID == Math.min(...this.props.pinsAvailable)
    let isHighestPinAvailable =
      this.props.pinID == Math.max(...this.props.pinsAvailable)

    return connectDropTarget(
      <div
        id={
          'droppable-area-parts-' +
          this.props.pinID +
          '-' +
          this.props.e_trackID
        }
        style={{
          width:
            widthStyle -
            (this.props.e_trackID + 1 !=
              this.props.systemData.state.system.etracks.length - 1 &&
            this.props.e_trackID != 0
              ? paddingValue
              : 0) +
            (this.props.systemData.state.system.etracks.length == 2
              ? paddingValue
              : 0),
          height:
            isLowestPinAvailable || isHighestPinAvailable
              ? heightStyle + paddingValue
              : heightStyle,
          bottom: isLowestPinAvailable
            ? bottomStyle - paddingValue
            : bottomStyle,
          marginLeft: marginLeft,
          paddingTop: isHighestPinAvailable ? paddingValue : 0,
          paddingBottom: isLowestPinAvailable ? paddingValue : 0,
          paddingLeft: this.props.e_trackID == 0 ? paddingValue : 0,
          paddingRight:
            this.props.e_trackID + 1 ==
            this.props.systemData.state.system.etracks.length - 1
              ? paddingValue
              : 0,
          position: 'absolute',
          zIndex:
            canDrop &&
            (this.props.draggedPart || this.props.draggedPartSystem) != null
              ? 9000
              : 0,
        }}
      >
        {hovered &&
        canDrop &&
        (this.props.draggedPart || this.props.draggedPartSystem) &&
        this.props.toolTipMessage ? (
          <div className={`tooltip tooltip-${this.props.toolTipMessage.type}`}>
            {this.props.toolTipMessage.message}
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default DropTarget('part', targetSpec, collect)(PartTarget)
