import * as React from 'react'
import { Subscribe } from 'unstated'
import { InitialDataContainer } from '../../containers/InitialData'
import { SystemContainer } from '../../containers/System'
import { ETrackDragDrop } from '../utils/ETrackItem/ETrackDragDrop'
import { PartDragDrop } from '../utils/PartItem/PartDragDrop'
import { Part } from './Part'
import PartSystemSource from '../utils/PartItem/PartSystemSource'
import ETrackStructureSource from '../utils/ETrackItem/ETrackStructureSource'
import { TutorialContainer } from '../../containers/Tutorial'
import { RulesContainer } from '../../containers/Rules'

export interface EtrackProps {
  partno: any
  pxRatio: number
  e_trackID: number
  draggedETrack: any
  draggedPart: any
  draggedPartno: any
  structureMode: boolean
  updateDraggedComponentSystem: any
  draggedPartSystem: any
  draggedPartnoSystem: any
  pinIdDraggedPartSystem: any
  bayIdDraggedPartSystem: any
  updateDraggedETrackStructure: any
  draggedETrackStructure: any
  draggedETrackStructureId: any
  snappedStateTarget: any
  updateSnappedState: any
  snappedToEtrackTarget: any
  snappedToPinTarget: any
  updateHoveredEtrack: any
  hoveredEtrackID: number
}

export class Etrack extends React.Component<EtrackProps, any> {
  constructor(props) {
    super(props)
    this.state = {
      attachedEv: false,
      hoveredPartPin: null,
      hoveredPartEtrackID: null,
    }
  }

  updateHoveredPartState = (pinValue = null, etrackValue = null) => {
    this.setState({
      hoveredPartPin: pinValue,
      hoveredPartEtrackID: etrackValue,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.structureMode) {
      let etrackSourceElement
      setTimeout(() => {
        etrackSourceElement = document.getElementById(
          'e-track-structure-' + this.props.e_trackID
        )
        if (etrackSourceElement && !this.state.attachedEv) {
          etrackSourceElement.addEventListener('mouseenter', () => {
            this.props.updateHoveredEtrack(this.props.e_trackID)
          })
          etrackSourceElement.addEventListener('mouseleave', () => {
            this.props.updateHoveredEtrack()
          })
          this.setState({ attachedEv: true })
        }
      }, 0)
    } else {
      this.setState({ attachedEv: false })
    }
  }
  render() {
    return (
      <Subscribe
        to={[
          InitialDataContainer,
          SystemContainer,
          TutorialContainer,
          RulesContainer,
        ]}
      >
        {(
          initialData: InitialDataContainer,
          systems: SystemContainer,
          tutorial: TutorialContainer,
          rules: RulesContainer
        ) => {
          return (
            <div
              className={
                this.props.draggedETrackStructureId != null
                  ? this.props.e_trackID >= this.props.draggedETrackStructureId
                    ? 'etrack active'
                    : 'etrack'
                  : this.props.hoveredEtrackID != null &&
                    this.props.e_trackID >= this.props.hoveredEtrackID
                  ? 'etrack is-hovering'
                  : 'etrack'
              }
              style={{
                height:
                  Number(
                    initialData.state.etracks[this.props.partno].length_cm
                  ) * this.props.pxRatio,
                width:
                  initialData.state.constants.ETRACK_WIDTH * this.props.pxRatio,
                bottom:
                  systems.state.system.etracks[this.props.e_trackID].y *
                  this.props.pxRatio,
                left:
                  systems.state.system.etracks[this.props.e_trackID].x *
                  this.props.pxRatio,
              }}
            >
              {!this.props.structureMode ? (
                systems.state.system.components.map((elem, index) => {
                  if (this.props.e_trackID == elem.bay - 1) {
                    let topStyles =
                      (initialData.state.etracks[this.props.partno]
                        .pins_available -
                        elem.pin) *
                      initialData.state.constants
                        .ETRACK_DISTANCE_BETWEEN_PINS_CM *
                      this.props.pxRatio

                    const partObj = initialData.state.shelves[elem.part_number]
                    return (
                      <div key={elem.pin + 'partsystem-container' + index}>
                        <div
                          key={elem.bay + elem.pin + 'shelf-container' + index}
                          style={{
                            position: 'absolute',
                            top: topStyles,
                            opacity:
                              this.props.draggedPartSystem != null
                                ? elem.pin ==
                                    this.props.pinIdDraggedPartSystem &&
                                  elem.bay == this.props.bayIdDraggedPartSystem
                                  ? 0
                                  : 1
                                : 1,
                            zIndex: 50 * (this.props.e_trackID + 1) + elem.pin,
                          }}
                        >
                          <Part
                            key={elem.bay + elem.pin + 'shelf' + index}
                            partObj={partObj}
                            pxRatio={this.props.pxRatio}
                            systemFinish={systems.state.system.finish}
                            onSystem={true}
                            beingHovered={
                              this.state.hoveredPartPin == elem.pin &&
                              this.state.hoveredPartEtrackID == elem.bay - 1
                                ? true
                                : false
                            }
                          />
                        </div>

                        <PartSystemSource
                          key={elem.pin + 'partssystem' + index}
                          pxRatio={this.props.pxRatio}
                          e_trackID={this.props.e_trackID}
                          pinID={elem.pin}
                          systemData={systems}
                          initialData={initialData}
                          item={initialData.state.shelves[elem.part_number]}
                          snappedStateTarget={this.props.snappedStateTarget}
                          updateDraggedComponentSystem={
                            this.props.updateDraggedComponentSystem
                          }
                          draggedPartSystem={this.props.draggedPartSystem}
                          draggedPartnoSystem={this.props.draggedPartnoSystem}
                          itemPartno={elem.part_number}
                          topStyles={topStyles}
                          disabled={false}
                          rulesData={rules}
                          updateHoveredPartState={this.updateHoveredPartState}
                        />
                      </div>
                    )
                  }
                })
              ) : (
                <ETrackStructureSource
                  e_trackID={this.props.e_trackID}
                  draggedETrack={this.props.draggedETrack}
                  pxRatio={this.props.pxRatio}
                  partno={this.props.partno}
                  systemData={systems}
                  snappedStateTarget={this.props.snappedStateTarget}
                  initialData={initialData}
                  updateDraggedETrackStructure={
                    this.props.updateDraggedETrackStructure
                  }
                  tutorialUpdateStep={tutorial.updateStep}
                />
              )}

              {this.props.structureMode ? (
                <ETrackDragDrop
                  e_trackID={this.props.e_trackID}
                  draggedETrack={this.props.draggedETrack}
                  draggedETrackStructure={this.props.draggedETrackStructure}
                  draggedETrackStructureId={this.props.draggedETrackStructureId}
                  updateSnappedState={this.props.updateSnappedState}
                  snappedStateTarget={this.props.snappedStateTarget}
                  pxRatio={this.props.pxRatio}
                  partno={this.props.partno}
                />
              ) : (
                <PartDragDrop
                  e_trackID={this.props.e_trackID}
                  pxRatio={this.props.pxRatio}
                  partno={this.props.partno}
                  updateSnappedState={this.props.updateSnappedState}
                  snappedStateTarget={this.props.snappedStateTarget}
                  snappedToEtrackTarget={this.props.snappedToEtrackTarget}
                  snappedToPinTarget={this.props.snappedToPinTarget}
                  draggedPart={this.props.draggedPart}
                  draggedPartno={this.props.draggedPartno}
                  draggedPartSystem={this.props.draggedPartSystem}
                  draggedPartnoSystem={this.props.draggedPartnoSystem}
                  pinIdDraggedPartSystem={this.props.pinIdDraggedPartSystem}
                  bayIdDraggedPartSystem={this.props.bayIdDraggedPartSystem}
                />
              )}
            </div>
          )
        }}
      </Subscribe>
    )
  }
}
