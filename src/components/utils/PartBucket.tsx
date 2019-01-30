import * as React from 'react'
import PartSource from './PartItem/PartSource'
import { Part } from '../parts/Part'
import ETrackSource from './ETrackItem/ETrackSource'

export interface PartBucketProps {
  initialData: any
  updateDraggedComponent: Function
  pxRatio: Number
  draggedPart?: any
  draggedPartno?: any
  snappedStatePartSource: any
  systems: any
  type: 'etrack' | 'shelves'
  rules: any
}
export interface PartBucketState {
  filter: string
}

export class PartBucket extends React.Component<
  PartBucketProps,
  PartBucketState
> {
  constructor(props) {
    super(props)
    this.state = {
      filter: 'all',
    }
  }

  handleClick = (e) => {
    let parent = e.target.parentNode
    let selected = parent.getElementsByClassName('selected')

    if (selected.length > 0) {
      selected[0].classList.remove('selected')
    }
    if (this.state.filter == e.target.value) {
      this.setState({ filter: 'all' })
      e.target.classList.remove('selected')
    } else {
      this.setState({ filter: e.target.value })
      e.target.classList.add('selected')
    }
  }

  render() {
    let tmpthis = this
    if (this.props.type == 'shelves') {
      return (
        <div className='part-container filtered'>
          <div className='part-container-heading'>
            <h3>Choose your parts: </h3>
            {Object.keys(tmpthis.props.initialData.state.shelf_categories).map(
              function(elem, index) {
                return (
                  <button
                    key={index + 'button'}
                    onClick={tmpthis.handleClick}
                    value={elem}
                    className='filterbutton'
                  >
                    {tmpthis.props.initialData.state.shelf_categories[elem]}
                  </button>
                )
              }
            )}
          </div>
          <div className='part-container-list'>
            {Object.keys(tmpthis.props.initialData.state.shelves).map(
              (partno) => {
                let filtered = true
                // 1st filter by type
                if (
                  tmpthis.state.filter == 'all' ||
                  tmpthis.props.initialData.state.shelves[partno]
                    .shelf_category == tmpthis.state.filter
                ) {
                  // 2nd filter by color
                  let codeToCompare
                  if (tmpthis.props.systems.state.system.finish.length == 2) {
                    if (
                      tmpthis.props.initialData.state.shelves[partno]
                        .finish_code.length == 2
                    ) {
                      codeToCompare = tmpthis.props.systems.state.system.finish
                    } else {
                      if (
                        // if its a table / desk then ignore the code and always check if beech
                        tmpthis.props.initialData.state.shelves[partno]
                          .shelf_category == 'tablesdesks' ||
                        tmpthis.props.initialData.state.shelves[partno]
                          .shelf_category == 'cabinets'
                      ) {
                        codeToCompare =
                          tmpthis.props.systems.state.system.finish[0]
                      } else {
                        codeToCompare =
                          tmpthis.props.systems.state.system.finish[1]
                      }
                    }
                  } else {
                    codeToCompare = tmpthis.props.systems.state.system.finish
                  }
                  if (
                    codeToCompare ==
                    tmpthis.props.initialData.state.shelves[partno].finish_code
                  ) {
                    filtered = false
                  }
                }

                let bayWidths = Object.keys(
                  tmpthis.props.initialData.state.bay_widths
                )
                if (
                  tmpthis.props.initialData.state.shelves[partno].bay_width ==
                  Number(bayWidths[1])
                ) {
                  if (!filtered) {
                    return (
                      <PartSource
                        key={partno + 'parts'}
                        pxRatio={tmpthis.props.pxRatio}
                        systemData={tmpthis.props.systems}
                        lengthSystem={tmpthis.props.systems.state.lengthSystem}
                        initialData={tmpthis.props.initialData}
                        item={tmpthis.props.initialData.state.shelves[partno]}
                        updateDraggedPart={tmpthis.props.updateDraggedComponent}
                        draggedPart={tmpthis.props.draggedPart}
                        draggedPartno={tmpthis.props.draggedPartno}
                        itemPartno={partno}
                        filterWidth={Number(bayWidths[1])}
                        snappedStatePartSource={
                          tmpthis.props.snappedStatePartSource
                        }
                        disabled={false}
                        rulesData={tmpthis.props.rules}
                      >
                        <Part
                          pxRatio={tmpthis.props.pxRatio}
                          partObj={
                            tmpthis.props.initialData.state.shelves[partno]
                          }
                          systemFinish={
                            tmpthis.props.systems.state.system.finish
                          }
                          unscaled={true}
                        />
                      </PartSource>
                    )
                  }
                }
              }
            )}
          </div>
        </div>
      )
    }
    if (this.props.type == 'etrack') {
      return (
        <div className='part-container unfiltered'>
          <div className='part-container-heading'>
            <h3>Choose your E-Tracks</h3>
          </div>
          <div className='part-container-list'>
            {Object.keys(tmpthis.props.initialData.state.etracks).map(
              (partno) => {
                return (
                  <ETrackSource
                    key={partno + 'random'}
                    updateDraggedETrack={tmpthis.props.updateDraggedComponent}
                    systemData={tmpthis.props.systems}
                    lengthSystem={tmpthis.props.systems.state.lengthSystem}
                    snappedState={tmpthis.props.snappedStatePartSource}
                    initialData={tmpthis.props.initialData}
                    pxRatio={this.props.pxRatio}
                    itemPartno={partno}
                    item={tmpthis.props.initialData.state.etracks[partno]}
                    disabled={
                      (tmpthis.props.systems.state.environment.height <
                        Number(
                          tmpthis.props.initialData.state.etracks[partno]
                            .length_cm
                        ) +
                          tmpthis.props.initialData.state.constants
                            .ETRACK_DISTANCE_FROM_FLOOR &&
                        tmpthis.props.systems.state.system.etracks.length ==
                          0) ||
                      (tmpthis.props.systems.state.system.etracks.length > 0 &&
                        tmpthis.props.systems.state.system.etracks[0]
                          .part_number != partno)
                    }
                  />
                )
              }
            )}
          </div>
        </div>
      )
    }
  }
}
