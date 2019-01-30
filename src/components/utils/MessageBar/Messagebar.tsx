import * as React from 'react'
import { Message } from './Message'
import { SysPrice } from './SysPrice'
import { FinishDropdown } from '../FinishDropdown'

export interface MsgProps {
  // need to type this to be a message object
  message?: object
  showcontrols: boolean
}

export const Messagebar = (props: MsgProps) => {
  return (
    <div
      className={
        'msgbar-container ' +
        (props.message || props.showcontrols ? 'active' : 'inactive')
      }
    >
      <div className='msgbar-content '>
        <div className={'msgbar-left'}>
          {props.message ? props.message : null}
        </div>
        <div className='msgbar-right'>
          {props.showcontrols ? (
            <div className='msgbar-finish-dropdown'>
              <p>System colour:</p>
              <FinishDropdown />
            </div>
          ) : null}
          {props.showcontrols ? <SysPrice /> : null}
        </div>
      </div>
    </div>
  )
}
