import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../containers/System'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface ButtonLinkState {
  confirmationDisplayed: boolean
}

interface ButtonLinkProps {
  arrow?: string
  colour: string
  copyLink?: boolean
  href: string
  label: string
}

export class ButtonLink extends React.Component<
  ButtonLinkProps,
  ButtonLinkState
> {
  constructor(props) {
    super(props)
    this.state = {
      confirmationDisplayed: false,
    }
  }

  showConfirmation = () => {
    this.setState({ confirmationDisplayed: true })
  }

  render() {
    return (
      <Subscribe to={[SystemContainer]}>
        {(systems: SystemContainer) => {
          let className = 'btn ' + this.props.colour

          if (this.props.arrow && this.props.arrow == 'left') {
            className += ' arrow-before'
          } else if (this.props.arrow && this.props.arrow == 'right') {
            className += ' arrow-after'
          }

          if (this.props.copyLink) {
            return (
              <CopyToClipboard text={systems.getShareUrl()}>
                <div className='link-container share-link-container'>
                  <Link to={this.props.href}>
                    <button
                      className={className}
                      onClick={this.showConfirmation}
                    >
                      {this.props.label}
                    </button>
                  </Link>
                  <div
                    className='copy-link-confirmation'
                    style={
                      this.state.confirmationDisplayed
                        ? { display: 'block' }
                        : { display: 'none' }
                    }
                  >
                    Copied to clipboard:
                    <br />
                    {systems.getShareUrl()}
                  </div>
                </div>
              </CopyToClipboard>
            )
          } else {
            return (
              <div className='link-container'>
                <Link to={this.props.href}>
                  <button className={className}>{this.props.label}</button>
                </Link>
              </div>
            )
          }
        }}
      </Subscribe>
    )
  }
}
