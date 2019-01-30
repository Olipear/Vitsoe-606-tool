import * as React from 'react'
import { Wall } from '../utils/WallGrid'
import { convertMeasurementIncludingUnits } from '../../utils/converters'

export interface StructureContainerProps {
  children?: any
  wallWidth: number
  wallHeight: number
  setPxRatio: Function
  lengthSystem: 'metric' | 'imperial'
  pxRatio: number
}

export interface StructureContainerState {
  rendered: boolean
  containerWidth: number
  containerHeight: number
}

export class StructureContainer extends React.Component<
  StructureContainerProps,
  StructureContainerState
> {
  private wallcontainer: React.RefObject<HTMLDivElement>
  constructor(props) {
    super(props)
    this.state = {
      rendered: false,
      containerWidth: 0,
      containerHeight: 0,
    }
    this.wallcontainer = React.createRef()
  }

  componentDidMount() {
    this.setContainerSize()
    this.setState({ rendered: true })
    window.addEventListener('resize', this.setContainerSize)
  }

  setContainerSize = () => {
    this.setState({
      containerWidth: this.wallcontainer.current.clientHeight,
      containerHeight: this.wallcontainer.current.clientWidth,
    })
  }

  getRatio = () => {
    let arearatio =
      this.wallcontainer.current.clientHeight /
      this.wallcontainer.current.clientWidth
    let wallratio = this.props.wallHeight / this.props.wallWidth
    let pxratio
    if (wallratio > arearatio) {
      pxratio = this.wallcontainer.current.clientHeight / this.props.wallHeight
    } else {
      pxratio = this.wallcontainer.current.clientWidth / this.props.wallWidth
    }
    return pxratio
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setContainerSize)
  }

  componentDidUpdate() {
    if (this.getRatio() != this.props.pxRatio) {
      this.props.setPxRatio(this.getRatio())
    }
  }

  render() {
    if (this.state.rendered) {
      return (
        <div className='structure-container' ref={this.wallcontainer}>
          <Wall
            width={this.props.wallWidth * this.props.pxRatio}
            height={this.props.wallHeight * this.props.pxRatio}
          >
            {this.props.children}
            <div className='floor-container'>
              <p>Floor</p>
            </div>
          </Wall>
        </div>
      )
    } else {
      return (
        <div className='structure-container' ref={this.wallcontainer}>
          {this.props.children}
        </div>
      )
    }
  }
}
