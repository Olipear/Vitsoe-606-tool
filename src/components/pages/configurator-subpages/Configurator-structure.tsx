import * as React from 'react'
import * as Base from '../../Base'

import * as WallCont from '../../utils/WallGrid'
import ETrackSource from '../../utils/ETrackItem/ETrackSource'
import TargetLayerStructure from '../../utils/TargetLayerStructure'
import { Redirect, Link } from 'react-router-dom'
import { convertMeasurementIncludingUnits } from '../../../utils/converters'

import { Subscribe } from 'unstated'
import { InitialDataContainer } from '../../../containers/InitialData'
import { SystemContainer } from '../../../containers/System'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { VisibleLayerStructure } from '../../utils/VisibleLayerStructure'
import { Headerbar } from '../../utils/Headerbar'
import { TutorialContainer } from '../../../containers/Tutorial'
import { Message } from '../../utils/MessageBar/Message'
import { StructureContainer } from '../../utils/StructureContainer'
import { PartBucket } from '../../utils/PartBucket'
import { RulesContainer } from '../../../containers/Rules'
import { Rules } from '../../../models/RulesModel'

interface StructureProps {
  width: number
  height: number
  pxRatio: number
  setPxRatio: Function
}

interface StructureState {
  rendered: boolean
  draggedETrack: any
  draggedETrackId: any
  snappedStateEtrackSource: any
}

const currentStageIndex = 2

class ConfiguratorStructure extends React.Component<
  StructureProps,
  StructureState
> {
  constructor(props) {
    super(props)
    this.state = {
      rendered: false,
      draggedETrack: null,
      draggedETrackId: null,
      snappedStateEtrackSource: null,
    }
  }

  updateDraggedEtrack = (item = null) => {
    this.setState({ draggedETrack: item })
  }

  updateDraggedEtrackIdTargetLayer = (id = null) => {
    this.setState({ draggedETrackId: id })
  }

  updateSnappedStateForETrackSource = (state = null) => {
    this.setState({ snappedStateEtrackSource: state })
  }

  render() {
    if (!this.props.width || !this.props.height) {
      return <Redirect to='/configurator/dimensions' />
    }
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
          tutorial.setCurrentStageIndex(currentStageIndex)
          const headerbarMessage = tutorial.getNextMessage()

          return (
            <div className='pagewrapper'>
              <Headerbar
                currentIndex={currentStageIndex}
                message={
                  headerbarMessage ? (
                    <Message type='tutorial'>{headerbarMessage}</Message>
                  ) : null
                }
              />
              <div className='page-content fullwidth'>
                <PartBucket
                  initialData={initialData}
                  updateDraggedComponent={this.updateDraggedEtrack}
                  pxRatio={this.props.pxRatio}
                  snappedStatePartSource={this.state.snappedStateEtrackSource}
                  systems={systems}
                  type='etrack'
                  rules={rules}
                />
                <StructureContainer
                  pxRatio={this.props.pxRatio}
                  setPxRatio={this.props.setPxRatio}
                  wallHeight={this.props.height}
                  wallWidth={this.props.width}
                  lengthSystem={systems.state.lengthSystem}
                >
                  {systems.state.system.etracks.length > 0 ? (
                    <VisibleLayerStructure
                      draggedETrack={this.state.draggedETrack}
                      updateDraggedEtrackIdTargetLayer={
                        this.updateDraggedEtrackIdTargetLayer
                      }
                      updateSnappedStateForETrackSource={
                        this.updateSnappedStateForETrackSource
                      }
                      snappedStateEtrackSource={
                        this.state.snappedStateEtrackSource
                      }
                      pxRatio={this.props.pxRatio}
                      structureMode={true}
                      systemData={systems}
                      styleProp={{
                        width: this.props.width * this.props.pxRatio,
                        height:
                          (this.props.height -
                            initialData.state.constants
                              .ETRACK_DISTANCE_FROM_FLOOR) *
                          this.props.pxRatio,
                      }}
                    />
                  ) : (
                    ''
                  )}
                  {(this.state.draggedETrack != null &&
                    systems.state.system.etracks.length <= 0) ||
                  (this.state.draggedETrackId != null &&
                    this.state.draggedETrackId == 0) ? (
                    <TargetLayerStructure
                      systemData={systems}
                      updateSnappedStateForETrackSource={
                        this.updateSnappedStateForETrackSource
                      }
                      pxRatio={this.props.pxRatio}
                      draggedETrack={this.state.draggedETrack}
                      initialData={initialData}
                      snappedState={this.state.snappedStateEtrackSource}
                      styleProp={{
                        width:
                          initialData.state.constants.ETRACK_WIDTH *
                          this.props.pxRatio,
                        height:
                          initialData.state.etracks[
                            this.state.draggedETrack != null
                              ? this.state.draggedETrack
                              : systems.state.system.etracks[
                                  this.state.draggedETrackId
                                ].part_number
                          ].length_cm * this.props.pxRatio,
                        top:
                          (this.props.height -
                            initialData.state.constants
                              .ETRACK_DISTANCE_FROM_FLOOR -
                            initialData.state.etracks[
                              this.state.draggedETrack != null
                                ? this.state.draggedETrack
                                : systems.state.system.etracks[
                                    this.state.draggedETrackId
                                  ].part_number
                            ].length_cm) *
                          this.props.pxRatio,
                        left: (this.props.width / 2) * this.props.pxRatio,
                      }}
                      tutorialUpdateStep={tutorial.updateStep}
                    />
                  ) : (
                    ''
                  )}
                </StructureContainer>
              </div>
              {tutorial.areStepsComplete('stage2') &&
              !tutorial.isCurrentStageComplete() &&
              systems.state.system.etracks.length > 1 ? (
                <div className='continue-button'>
                  <Link
                    to={'/configurator/parts'}
                    onClick={() => {
                      tutorial.markStageAsComplete()
                    }}
                  >
                    <Base.Image
                      src='img/icons/arrow-right-blue.svg'
                      alt='Continue'
                      className='continue-icon'
                    />
                  </Link>
                </div>
              ) : (
                ''
              )}
            </div>
          )
        }}
      </Subscribe>
    )
  }
}

export default DragDropContext(HTML5Backend)(ConfiguratorStructure)
