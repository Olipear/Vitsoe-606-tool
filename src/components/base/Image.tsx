import * as React from 'react'

export const Image = (props) => {
  return (
    <div className={props.className}>
      <img src={props.src} alt={props.alt} style={{ width: '100%' }} />
    </div>
  )
}
