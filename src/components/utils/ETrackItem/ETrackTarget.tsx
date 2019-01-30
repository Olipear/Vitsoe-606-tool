import * as React from 'react'
import { DropTarget } from 'react-dnd'
import { Arrow } from '../Arrow'

interface TargetProps {
  width90Target: boolean
  systemData: any
  initialData?: any
  draggedETrack: any
  draggedETrackStructure?: any
  draggedETrackStructureId?: any
  updateSnappedState: any
  snappedStateTarget: any
  direction: string
  e_trackID: number
  spacing: number
  widthTargetStyle: number
  pxRatio: number

  connectDropTarget?: Function
  hovered?: Function
  hover?: Function
  canDrop?: Function
  drop?: Function
  itemMonitor?: any
  tutorialUpdateStep: Function
}

const targetSpec = {
  canDrop(props, monitor) {
    let bayWidths = Object.keys(props.initialData.state.bay_widths)
    if (props.draggedETrackStructureId == null) {
      if (props.width90Target) {
        if (
          props.systemData.state.system.etracks[0].x -
            Number(bayWidths[1]) / 2 <
          0
        ) {
          return false
        }
        if (
          props.systemData.state.system.etracks[
            props.systemData.state.system.etracks.length - 1
          ].x +
            Number(bayWidths[1]) / 2 >
          props.systemData.state.environment.width
        ) {
          return false
        }
      } else {
        if (
          props.systemData.state.system.etracks[0].x -
            Number(bayWidths[0]) / 2 <
          0
        ) {
          return false
        }
        if (
          props.systemData.state.system.etracks[
            props.systemData.state.system.etracks.length - 1
          ].x +
            Number(bayWidths[0]) / 2 >
          props.systemData.state.environment.width
        ) {
          return false
        }
      }
    } else {
      if (props.width90Target) {
        let systemWidth =
          props.systemData.state.system.etracks[
            props.systemData.state.system.etracks.length - 1
          ].x - props.systemData.state.system.etracks[0].x

        if (
          Number(bayWidths[1]) + systemWidth >
          props.systemData.state.environment.width
        ) {
          return false
        }
      }
    }
    return true
  },

  drop(props, monitor, component) {
    props.tutorialUpdateStep('addTrack', true)

    let bayWidths = Object.keys(props.initialData.state.bay_widths)
    if (props.draggedETrack != null) {
      if (props.width90Target) {
        props.systemData.addSystemEtrack(
          props.draggedETrack,
          Number(bayWidths[1]),
          0,
          props.direction
        )
      } else {
        props.systemData.addSystemEtrack(
          props.draggedETrack,
          Number(bayWidths[0]),
          0,
          props.direction
        )
      }
    } else {
      if (props.width90Target) {
        props.systemData.changeBayWidth(
          props.draggedETrackStructureId,
          Number(bayWidths[1]),
          props.initialData
        )
      } else {
        props.systemData.changeBayWidth(
          props.draggedETrackStructureId,
          Number(bayWidths[0]),
          props.initialData
        )
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

class ETrackTarget extends React.Component<TargetProps> {
  componentWillReceiveProps(nextProps) {
    if (this.props.canDrop) {
      if (nextProps.hovered != this.props.hovered) {
        if (nextProps.hovered == this.props.snappedStateTarget) {
          setTimeout(() => {
            this.props.updateSnappedState(nextProps.hovered)
          }, 0)
        } else {
          this.props.updateSnappedState(nextProps.hovered)
        }
      }
    }
  }
  render() {
    const { connectDropTarget, hovered, itemMonitor, canDrop } = this.props

    let paddingValue = 12.5 * this.props.pxRatio
    let bayWidths = Object.keys(this.props.initialData.state.bay_widths)

    return connectDropTarget(
      <div
        className='etrack-droppable-target'
        style={{
          width: this.props.widthTargetStyle,
          paddingLeft: paddingValue,
          paddingRight: paddingValue + this.props.widthTargetStyle / 2,
          opacity:
            this.props.draggedETrack != null ||
            this.props.draggedETrackStructure != null
              ? 1
              : 0,
          left:
            this.props.direction == 'right'
              ? this.props.spacing - this.props.widthTargetStyle * 2
              : '',
          right: this.props.direction == 'left' ? this.props.spacing : '',
          zIndex: canDrop ? 500 : 0,
        }}
      >
        <div
          className={
            (canDrop ? 'etrack-droppable etrack-droppable-area ' : '') +
            (canDrop && hovered ? 'is-hovering' : '')
          }
          style={{
            width: this.props.widthTargetStyle,
            height: '100%',
          }}
        >
          {hovered && canDrop ? (
            <div
              className='arrow-bay-width'
              style={{
                width:
                  this.props.spacing +
                  paddingValue -
                  10 -
                  this.props.widthTargetStyle,
                marginLeft:
                  this.props.direction == 'right'
                    ? -this.props.spacing -
                      paddingValue / 2 -
                      this.props.widthTargetStyle
                    : this.props.widthTargetStyle,
              }}
            >
              <Arrow
                axis='x'
                label={
                  this.props.width90Target
                    ? this.props.systemData.state.lengthSystem == 'metric'
                      ? Number(bayWidths[1]) + 'cm'
                      : this.props.initialData.state.bay_widths[bayWidths[1]] +
                        '"'
                    : this.props.systemData.state.lengthSystem == 'metric'
                    ? Number(bayWidths[0]) + 'cm'
                    : this.props.initialData.state.bay_widths[bayWidths[0]] +
                      '"'
                }
              />
            </div>
          ) : (
            ''
          )}

          {hovered && canDrop ? (
            this.props.draggedETrackStructureId != null ? (
              this.props.systemData.state.system.etracks.map((elem, index) => {
                if (index >= this.props.e_trackID + 1) {
                  return (
                    <div
                      key={index + 'e-track-structure-taget'}
                      className='etrack'
                      style={{
                        height:
                          Number(itemMonitor.length_cm) * this.props.pxRatio,
                        width:
                          this.props.initialData.state.constants.ETRACK_WIDTH *
                          this.props.pxRatio,
                        left:
                          index == this.props.e_trackID + 1
                            ? paddingValue + this.props.widthTargetStyle / 2
                            : paddingValue +
                              this.props.widthTargetStyle / 2 +
                              (this.props.systemData.state.system.etracks[index]
                                .x -
                                this.props.systemData.state.system.etracks[
                                  this.props.e_trackID + 1
                                ].x) *
                                this.props.pxRatio,
                      }}
                    />
                  )
                }
              })
            ) : (
              <div
                className='etrack'
                style={{
                  height: Number(itemMonitor.length_cm) * this.props.pxRatio,
                  width:
                    this.props.initialData.state.constants.ETRACK_WIDTH *
                    this.props.pxRatio,
                  left: paddingValue + this.props.widthTargetStyle / 2,
                }}
              />
            )
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

export default DropTarget('e-track', targetSpec, collect)(ETrackTarget)
