import * as React from 'react'
import * as Base from '../../Base'

import { cmToIn } from '../../../utils/converters'
import { Headerbar } from '../../utils/Headerbar'
import { DimensionsWidthInput } from './dimensions/DimensionsWidthInput'
import { DimensionsHeightInput } from './dimensions/DimensionsHeightInput'
import { DimensionsSpaceNameInput } from './dimensions/DimensionsSpaceNameInput'
import { Message } from '../../utils/MessageBar/Message'
import { Subscribe } from 'unstated'
import { TutorialContainer } from '../../../containers/Tutorial'
import { StructureContainer } from '../../utils/StructureContainer'
import { WallLabels } from '../../utils/WallLabels'
import { Link } from 'react-router-dom'
import { CheckEnvironmentWrapper } from '../../utils/CheckEnvironmentWrapper'

export interface ConfigDimProps {
  width: number
  height: number
  changeDimensions: (name: 'width' | 'height', value: number) => void
  lengthSystem: 'metric' | 'imperial'
  spaceName: string
  pxRatio: number
  setPxRatio: Function
}

const unitOptions = [
  { value: 'imperial', label: 'Inches' },
  { value: 'metric', label: 'CM' },
]

const currentStageIndex = 1

export class ConfiguratorDimensions extends React.Component<ConfigDimProps> {
  render() {
    return (
      <Subscribe to={[TutorialContainer]}>
        {(tutorial: TutorialContainer) => {
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
              <div className='page-content fixedwidth'>
                <div className='dimensions-configurator'>
                  <div className='dimensions-inputs'>
                    <DimensionsSpaceNameInput />
                    <DimensionsHeightInput />
                    <DimensionsWidthInput />
                  </div>
                  <div className='dimensions-preview'>
                    {this.props.width && this.props.height ? (
                      <StructureContainer
                        setPxRatio={this.props.setPxRatio}
                        wallHeight={this.props.height}
                        wallWidth={this.props.width}
                        lengthSystem={this.props.lengthSystem}
                        pxRatio={this.props.pxRatio}
                      >
                        <WallLabels
                          height={this.props.height}
                          width={this.props.width}
                          showmeasurements={true}
                          showdeskheight={false}
                          lengthSystem={this.props.lengthSystem}
                          pxRatio={this.props.pxRatio}
                        />
                      </StructureContainer>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
              {tutorial.areStepsComplete('stage1') &&
              !tutorial.isCurrentStageComplete() ? (
                <CheckEnvironmentWrapper
                  checkOn='isInvalid'
                  returnOnFalse={
                    <div className='continue-button'>
                      <Link
                        to={'/configurator/structure'}
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
                  }
                  returnOnTrue={''}
                />
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
