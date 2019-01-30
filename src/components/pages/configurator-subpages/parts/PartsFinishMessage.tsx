import * as React from 'react'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'
import { TutorialContainer } from '../../../../containers/Tutorial'
import { SystemContainer } from '../../../../containers/System'

export interface EndFinishMessageProps {
  message?: string
}

export class PartsFinishMessage extends React.Component<EndFinishMessageProps> {
  getExtraMessage = () => {
    if (this.props.message) {
      return <span style={{ display: 'block' }}>{this.props.message}</span>
    }
    return null
  }

  render() {
    return (
      <Subscribe to={[TutorialContainer]}>
        {(tutorial: TutorialContainer) => {
          const extraMessage = this.getExtraMessage()
          return (
            <span>
              {extraMessage}
              <div>
                <span>To view a summary and then send to a planner click:</span>
                <div className='finish-button-last'>
                  <Link
                    to={'/configurator/end'}
                    onClick={() => tutorial.markStageAsComplete()}
                  >
                    Finish
                  </Link>
                </div>
              </div>
            </span>
          )
        }}
      </Subscribe>
    )
  }
}
