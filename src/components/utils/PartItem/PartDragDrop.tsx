import * as React from 'react'
import { Subscribe } from 'unstated'
import { InitialDataContainer } from '../../../containers/InitialData'
import { SystemContainer } from '../../../containers/System'
import { RulesContainer } from '../../../containers/Rules'
import PartTarget from '../../utils/PartItem/PartTarget'
import { Part } from '../../parts/Part'
import { TutorialContainer } from '../../../containers/Tutorial'

export interface PartDragDropProps {
  partno: any
  pxRatio: number
  e_trackID: number
  draggedPart: any
  draggedPartno: any
  draggedPartSystem: any
  draggedPartnoSystem: any
  pinIdDraggedPartSystem: any
  bayIdDraggedPartSystem: any
  updateSnappedState: any
  snappedStateTarget: any
  snappedToEtrackTarget: any
  snappedToPinTarget: any
}

export const PartDragDrop = (props: PartDragDropProps) => {
  function willDrop() {
    if (props.draggedPart || props.draggedPartSystem) {
      return true
    }

    return false
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
        let toIterateInReturn = []

        const pinsAvailable =
          initialData.state.etracks[
            systems.state.system.etracks[props.e_trackID].part_number
          ].pins_available - 1

        for (let i = 0; i <= pinsAvailable; i++) {
          toIterateInReturn.push(i)
        }

        const eTrackLength =
          initialData.state.etracks[
            systems.state.system.etracks[props.e_trackID].part_number
          ].length_cm

        let bayWidth

        if (props.e_trackID < systems.state.system.etracks.length - 1) {
          bayWidth =
            systems.state.system.etracks[props.e_trackID + 1].x -
            systems.state.system.etracks[props.e_trackID].x
        }

        let matchBayPart
        if (
          props.snappedStateTarget &&
          (props.draggedPart || props.draggedPartSystem)
        ) {
          Object.keys(initialData.state.shelves).map((elem) => {
            if (
              initialData.state.shelves[
                props.draggedPartno != null
                  ? props.draggedPartno
                  : props.draggedPartnoSystem
              ].finish_code == initialData.state.shelves[elem].finish_code &&
              initialData.state.shelves[elem].bay_width == bayWidth &&
              initialData.state.shelves[
                props.draggedPartno != null
                  ? props.draggedPartno
                  : props.draggedPartnoSystem
              ].shelf_depth == initialData.state.shelves[elem].shelf_depth &&
              initialData.state.shelves[
                props.draggedPartno != null
                  ? props.draggedPartno
                  : props.draggedPartnoSystem
              ].shelf_type == initialData.state.shelves[elem].shelf_type
            ) {
              matchBayPart = initialData.state.shelves[elem]
            }
          })
        }

        let toolTipMessage

        if (
          props.snappedStateTarget &&
          props.e_trackID == props.snappedToEtrackTarget &&
          willDrop() &&
          matchBayPart
        ) {
          toolTipMessage =
            rules.state.ruleResults[
              props.snappedToEtrackTarget +
                1 +
                '-' +
                (props.snappedToPinTarget + 1)
            ]
        }

        return (
          <div>
            {props.snappedStateTarget &&
            props.e_trackID == props.snappedToEtrackTarget &&
            willDrop() &&
            matchBayPart ? (
              <div
                className='part-snapped'
                style={{
                  top:
                    -(
                      (props.snappedToPinTarget - pinsAvailable) *
                      initialData.state.constants
                        .ETRACK_DISTANCE_BETWEEN_PINS_CM
                    ) * props.pxRatio,
                }}
              >
                <Part
                  pxRatio={props.pxRatio}
                  partObj={matchBayPart}
                  systemFinish={systems.state.system.finish}
                  onSystem={
                    toolTipMessage != null && toolTipMessage.type == 'errors'
                      ? false
                      : true
                  }
                  warningLayer={
                    toolTipMessage != null && toolTipMessage.type == 'warnings'
                      ? true
                      : false
                  }
                />
              </div>
            ) : (
              ''
            )}
            <div
              style={{
                position: 'relative',
                bottom:
                  props.e_trackID < systems.state.system.etracks.length - 1
                    ? -eTrackLength * props.pxRatio
                    : '',
              }}
            >
              {props.e_trackID < systems.state.system.etracks.length - 1
                ? toIterateInReturn.map(function(index) {
                    return (
                      <div key={index + 'system-target-container'}>
                        <div
                          className={
                            'part-droppable-area-target ' +
                            (willDrop()
                              ? 'part-droppable-area ' +
                                (props.snappedStateTarget &&
                                index == props.snappedToPinTarget &&
                                props.e_trackID == props.snappedToEtrackTarget
                                  ? 'is-hovering'
                                  : '')
                              : '')
                          }
                          style={{
                            width: bayWidth * props.pxRatio,
                            height:
                              initialData.state.constants
                                .ETRACK_DISTANCE_BETWEEN_PINS_CM *
                              props.pxRatio,
                            bottom:
                              toIterateInReturn.length <= 1
                                ? (initialData.state.constants
                                    .ETRACK_BOTTOM_TO_FIRST_PIN_CM -
                                    initialData.state.constants
                                      .ETRACK_DISTANCE_BETWEEN_PINS_CM) *
                                  props.pxRatio
                                : toIterateInReturn.length > 5
                                ? (index *
                                    initialData.state.constants
                                      .ETRACK_DISTANCE_BETWEEN_PINS_CM +
                                    initialData.state.constants
                                      .ETRACK_BOTTOM_TO_FIRST_PIN_CM *
                                      1.4 -
                                    initialData.state.constants
                                      .ETRACK_DISTANCE_BETWEEN_PINS_CM) *
                                  props.pxRatio
                                : (index *
                                    initialData.state.constants
                                      .ETRACK_DISTANCE_BETWEEN_PINS_CM +
                                    initialData.state.constants
                                      .ETRACK_BOTTOM_TO_FIRST_PIN_CM -
                                    initialData.state.constants
                                      .ETRACK_DISTANCE_BETWEEN_PINS_CM) *
                                  props.pxRatio,
                          }}
                        />
                        <PartTarget
                          key={index + props.e_trackID + 'pin-target'}
                          pinID={index}
                          e_trackID={props.e_trackID}
                          systemData={systems}
                          updateSnappedState={props.updateSnappedState}
                          snappedStateTarget={props.snappedStateTarget}
                          draggedPartno={props.draggedPartno}
                          draggedPart={props.draggedPart}
                          pinsAvailable={toIterateInReturn}
                          initialData={initialData}
                          partno={props.partno}
                          pxRatio={props.pxRatio}
                          rulesData={rules}
                          draggedPartSystem={props.draggedPartSystem}
                          draggedPartnoSystem={props.draggedPartnoSystem}
                          pinIdDraggedPartSystem={props.pinIdDraggedPartSystem}
                          bayIdDraggedPartSystem={props.bayIdDraggedPartSystem}
                          tutorialUpdateStep={tutorial.updateStep}
                          snappedToEtrackTarget={props.snappedToEtrackTarget}
                          snappedToPinTarget={props.snappedToPinTarget}
                          toolTipMessage={toolTipMessage}
                        />
                      </div>
                    )
                  })
                : ''}
            </div>
          </div>
        )
      }}
    </Subscribe>
  )
}
