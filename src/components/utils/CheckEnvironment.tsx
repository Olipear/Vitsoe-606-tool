import * as React from 'react'
import { Subscribe } from 'unstated'
import { InitialDataContainer } from '../../containers/InitialData'
import { SystemContainer } from '../../containers/System'
import { convertMeasurementIncludingUnits } from '../../utils/converters'

interface CheckEnvironmentProps {
  checkOn: 'tooNarrow' | 'invalidMsg' | 'isInvalid'
  returnOnTrue: any
  returnOnFalse: any
  initialData: InitialDataContainer
  pxRatio: number
}

interface CheckEnvironmentState {
  maxSystemHeight: number
  minSystemHeight: number
  minSystemWidth: number
  loaded: boolean
  longestEtrack: number
  shortestEtrack: number
  gapFromFloor: number
}

class CheckEnvironment extends React.Component<
  CheckEnvironmentProps,
  CheckEnvironmentState
> {
  constructor(props) {
    super(props)
    this.state = {
      maxSystemHeight: null,
      minSystemHeight: null,
      minSystemWidth: null,
      loaded: false,
      longestEtrack: null,
      shortestEtrack: null,
      gapFromFloor: null,
    }
  }

  init = (initialData) => {
    if (!this.state.loaded) {
      const gapFromFloor =
        initialData.state.constants.ETRACK_DISTANCE_FROM_FLOOR

      let longestEtrack = 0
      for (let key in initialData.state.etracks) {
        if (initialData.state.etracks[key].length_cm > longestEtrack) {
          longestEtrack = initialData.state.etracks[key].length_cm
        }
      }

      let shortestEtrack = 0
      for (let key in initialData.state.etracks) {
        if (initialData.state.etracks[key].length_cm < shortestEtrack) {
          shortestEtrack = initialData.state.etracks[key].length_cm
        } else if (shortestEtrack === 0) {
          shortestEtrack = initialData.state.etracks[key].length_cm
        }
      }

      const safety = 5

      const maxSystemHeight = gapFromFloor + longestEtrack + safety // gap from floor + max e-track length + safety
      const minSystemHeight = gapFromFloor + shortestEtrack + safety // gap from floor + smallest e-track length + safety
      const minSystemWidth = 65.5 + 6 // smallest bay width + safety (inc e-tracks)

      this.setState({
        maxSystemHeight: maxSystemHeight,
        minSystemHeight: minSystemHeight,
        minSystemWidth: minSystemWidth,
        longestEtrack: longestEtrack,
        shortestEtrack: shortestEtrack,
        loaded: true,
        gapFromFloor: gapFromFloor,
      })
    }
  }

  checkTooNarrow = (systems) => {
    return systems.state.environment.width < this.state.minSystemWidth
  }

  checkTooShort = (systems) => {
    return systems.state.environment.height < this.state.minSystemHeight
  }

  checkInvalidMsg = (systems) => {
    const tooNarrowMsg =
      'You need to enter a larger width. The minimum is ' +
      convertMeasurementIncludingUnits(
        this.state.minSystemWidth,
        systems.state.lengthSystem
      ) +
      '. This is the smallest bay width (' +
      convertMeasurementIncludingUnits(65.5, systems.state.lengthSystem) +
      ' plus room for e-tracks and being able to place pins in to the tracks to mount the shelves.'

    const tooShortMsg =
      'You need to enter a larger height. The minimum is ' +
      convertMeasurementIncludingUnits(
        this.state.minSystemHeight,
        systems.state.lengthSystem
      ) +
      '. This includes the height required from the floor before the 1st e-track (' +
      convertMeasurementIncludingUnits(34.5, systems.state.lengthSystem) +
      ').'

    if (this.checkTooNarrow(systems)) {
      return tooNarrowMsg
    } else if (this.checkTooShort(systems)) {
      return tooShortMsg
    }
    return null
  }

  checkIsInvalid = (systems) => {
    return this.checkTooNarrow(systems) || this.checkTooShort(systems)
  }

  componentDidMount = () => {
    this.init(this.props.initialData)
  }

  render() {
    return (
      <Subscribe to={[SystemContainer]}>
        {(systems: SystemContainer) => {
          if (this.props.checkOn == 'tooNarrow') {
            if (this.checkTooNarrow(systems)) {
              return this.props.returnOnTrue
            } else {
              return this.props.returnOnFalse
            }
          } else if (this.props.checkOn == 'invalidMsg') {
            if (this.checkInvalidMsg(systems) !== null) {
              return (
                <div
                  id='wall-label-invalid'
                  style={{
                    maxHeight:
                      'calc( 100% - ' +
                      this.props.pxRatio *
                        (systems.state.environment.height - 267.5) +
                      'px )',
                  }}
                >
                  <p>{this.checkInvalidMsg(systems)}</p>
                </div>
              )
            } else {
              return this.props.returnOnFalse
            }
          } else if (this.props.checkOn == 'isInvalid') {
            if (this.checkIsInvalid(systems)) {
              return this.props.returnOnTrue
            } else {
              return this.props.returnOnFalse
            }
          }

          return null
        }}
      </Subscribe>
    )
  }
}

export { CheckEnvironment }
