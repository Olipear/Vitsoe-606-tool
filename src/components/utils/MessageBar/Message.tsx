import * as React from 'react'
import * as Base from '../../Base'

export interface MessageProps {
  children?: string
  type: string
  // available types: warning, error, tutorial
}

export const Message = (props: MessageProps) => {
  if (props.children) {
    return (
      <div className='msgbar-message'>
        <Base.Image
          src='img/icons/hand_pointing_right.svg'
          alt='Vitsœ'
          className='msgbar-message-icon'
        />
        <p>{props.children}</p>
      </div>
    )
  } else {
    return null
  }
}
