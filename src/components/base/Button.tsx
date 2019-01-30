import * as React from 'react'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'
import { TutorialContainer } from '../../containers/Tutorial'

export interface ButtonProps {
  link?: string
  action?: Function
  addClass?: string
  markTutorialStageAsComplete?: boolean
}

export class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    addClass: '',
  }

  handleButtonClick = (e, tutorial) => {
    this.props.action(e.target)

    if (this.props.markTutorialStageAsComplete) {
      tutorial.markStageAsComplete()
    }
  }

  handleLinkClick = (tutorial) => {
    if (this.props.markTutorialStageAsComplete) {
      tutorial.markStageAsComplete()
    }
  }

  render() {
    return (
      <Subscribe to={[TutorialContainer]}>
        {(tutorial: TutorialContainer) => {
          if (this.props.action != undefined) {
            return (
              <button
                className={'button button-action ' + this.props.addClass}
                onClick={(e) => {
                  this.handleButtonClick(e, tutorial)
                }}
              >
                {this.props.children}
              </button>
            )
          } else {
            return (
              <button className={'button button-link ' + this.props.addClass}>
                <Link
                  to={this.props.link}
                  onClick={(e) => {
                    this.handleLinkClick(tutorial)
                  }}
                >
                  {' '}
                  {this.props.children}{' '}
                </Link>
              </button>
            )
          }
        }}
      </Subscribe>
    )
  }
}
