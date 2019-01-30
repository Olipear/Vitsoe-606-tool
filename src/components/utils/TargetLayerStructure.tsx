import * as React from 'react'
import { DropTarget } from 'react-dnd'

interface TargetProps {
  styleProp: {
    width: number
    height: number
    top: number
    left: number
  }
  snappedState: any
  pxRatio: any
  systemData: any
  initialData: any
  draggedETrack: any
  updateSnappedStateForETrackSource: any

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
  drop(props, monitor, component) {
    props.tutorialUpdateStep('addTrack', true)
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

class TargetLayerStructure extends React.Component<TargetProps> {
  componentWillReceiveProps(nextProps) {
    if (this.props.canDrop) {
      if (nextProps.hovered != this.props.hovered) {
        this.props.updateSnappedStateForETrackSource(nextProps.hovered)
      }
    }
  }
  render() {
    const { connectDropTarget, hovered, canDrop, styleProp } = this.props

    return connectDropTarget(
      <div
        id='droppable-area'
        style={{
          position: 'absolute',
          width: styleProp.width,
          height: styleProp.height,
          padding: '0 20px',
          paddingRight: 20 + styleProp.width / 2,
          zIndex: canDrop ? 500 : 0,
          left: styleProp.left - styleProp.width - 20,
          top: styleProp.top,
        }}
      >
        <div
          className={
            'etrack-droppable etrack-droppable-area ' +
            (canDrop && hovered ? 'is-hovering' : '')
          }
          style={{
            width: styleProp.width,
            height: '100%',
          }}
        >
          {hovered && canDrop ? (
            this.props.systemData.state.system.etracks.length > 0 ? (
              this.props.systemData.state.system.etracks.map((elem, index) => {
                return (
                  <div
                    key={index + 'e-track-structure-taget'}
                    className='etrack'
                    style={{
                      height:
                        Number(
                          this.props.initialData.state.etracks[elem.part_number]
                            .length_cm
                        ) * this.props.pxRatio,
                      width:
                        this.props.initialData.state.constants.ETRACK_WIDTH *
                        this.props.pxRatio,
                      left:
                        index == 0
                          ? 20 + styleProp.width / 2
                          : (this.props.systemData.state.system.etracks[index]
                              .x -
                              this.props.systemData.state.system.etracks[0].x) *
                            this.props.pxRatio,
                    }}
                  />
                )
              })
            ) : (
              <div
                className='etrack'
                style={{
                  height:
                    Number(
                      this.props.initialData.state.etracks[
                        this.props.draggedETrack
                      ].length_cm
                    ) * this.props.pxRatio,
                  width:
                    this.props.initialData.state.constants.ETRACK_WIDTH *
                    this.props.pxRatio,
                  left: 20 + styleProp.width / 2,
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

export default DropTarget('e-track', targetSpec, collect)(TargetLayerStructure)
