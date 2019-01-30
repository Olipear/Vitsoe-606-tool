import * as React from 'react'

export interface HeadlineProps {
  counter: string
  cost?: string
  showcost: boolean
}

export class Headline extends React.Component<HeadlineProps> {
  render() {
    return (
      <div className='headline'>
        <span>{this.props.counter}</span>
        <h2>{this.props.children}</h2>

        <span className='cost'>
          {this.props.showcost ? (
            <p style={{ display: 'inline' }}>
              Cost estimate excluding taxes: {'   '}
            </p>
          ) : (
            ''
          )}

          {this.props.cost}
        </span>
      </div>
    )
  }
}
