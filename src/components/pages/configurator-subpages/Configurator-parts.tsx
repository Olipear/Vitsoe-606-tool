import * as React from 'react'
import * as Base from '../../Base'

import { Navbar } from '../../utils/NavigationBar/Navbar'
import { Messagebar } from '../../utils/MessageBar/Messagebar'

import * as WallCont from '../../utils/WallGrid'

import { VisibleLayerStructure } from '../../utils/VisibleLayerStructure'
import PartSource from '../../utils/PartItem/PartSource'
import { Redirect, Link } from 'react-router-dom'

import { Subscribe } from 'unstated'
import { InitialDataContainer } from '../../../containers/InitialData'
import { SystemContainer } from '../../../containers/System'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Part } from '../../parts/Part'
import { PartBucket } from '../../utils/PartBucket'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { Headerbar } from '../../utils/Headerbar'
import { Message } from '../../utils/MessageBar/Message'
import { hasBasename } from 'history/PathUtils'
import { StructureContainer } from '../../utils/StructureContainer'
import { TutorialContainer } from '../../../containers/Tutorial'
import { PartsFinishMessage } from './parts/PartsFinishMessage'
import { RulesContainer } from '../../../containers/Rules'

interface PartsProps {
  width: number
  height: number
  pxRatio: number
  setPxRatio: Function
  setFinish: Function
  changeUnitsParts: (type: any) => void
  changeCurrency: (type: any) => void
}
interface PartsState {
  rendered: boolean
  draggedPart: any
  draggedPartno: any
  unAvailablePins: any
  snappedStatePartSource: any
  filter: string
}

const unitOptions = [
  { value: 'imperial', label: 'Inches' },
  { value: 'metric', label: 'CM' },
]

const currentStageIndex = 3

class ConfiguratorParts extends React.Component<PartsProps, PartsState> {
  constructor(props) {
    super(props)
    this.state = {
      rendered: false,
      draggedPart: null,
      draggedPartno: null,
      snappedStatePartSource: null,
      unAvailablePins: {},
      filter: 'all',
    }
  }

  updateDraggedComponent = (item = null, partno = null) => {
    this.setState({ draggedPart: item, draggedPartno: partno })
  }

  updateSnappedStateForPartSource = (state = null) => {
    this.setState({ snappedStatePartSource: state })
  }

  onChangeFinish = (e) => {
    this.props.setFinish(e.value)
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
          RulesContainer,
          TutorialContainer,
        ]}
      >
        {(
          initialData: InitialDataContainer,
          systems: SystemContainer,
          rules: RulesContainer,
          tutorial: TutorialContainer
        ) => {
          tutorial.setCurrentStageIndex(currentStageIndex)
          let headerbarMessage = tutorial.getNextMessage()

          if (!headerbarMessage && systems.state.system.components.length) {
            headerbarMessage = <PartsFinishMessage />
          }

          if (systems.state.system.etracks.length < 2) {
            return <Redirect to='/configurator/structure' />
          }
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
                  updateDraggedComponent={this.updateDraggedComponent}
                  pxRatio={this.props.pxRatio}
                  draggedPart={this.state.draggedPart}
                  draggedPartno={this.state.draggedPartno}
                  snappedStatePartSource={this.state.snappedStatePartSource}
                  systems={systems}
                  type='shelves'
                  rules={rules}
                />
                <StructureContainer
                  setPxRatio={this.props.setPxRatio}
                  wallHeight={this.props.height}
                  wallWidth={this.props.width}
                  lengthSystem={systems.state.lengthSystem}
                  pxRatio={this.props.pxRatio}
                >
                  <VisibleLayerStructure
                    draggedETrack={null}
                    pxRatio={this.props.pxRatio}
                    systemData={systems}
                    structureMode={false}
                    draggedPart={this.state.draggedPart}
                    draggedPartno={this.state.draggedPartno}
                    snappedStatePartSource={this.state.snappedStatePartSource}
                    updateSnappedStateForPartSource={
                      this.updateSnappedStateForPartSource
                    }
                    styleProp={{
                      width: this.props.width * this.props.pxRatio,
                      height:
                        (this.props.height -
                          initialData.state.constants
                            .ETRACK_DISTANCE_FROM_FLOOR) *
                        this.props.pxRatio,
                    }}
                  />
                </StructureContainer>
              </div>
            </div>
          )
        }}
      </Subscribe>
    )
  }
}

export default DragDropContext(HTML5Backend)(ConfiguratorParts)
