import * as React from 'react'

export interface ArrowProps {
  axis: 'x' | 'y'
  label: string
}

export const Arrow = (props: ArrowProps) => {
  return (
    <div className={'arrow-label-' + props.axis}>
      <div className={'arrow-' + (props.axis == 'x' ? 'left' : 'up')} />
      <p>{props.label}</p>
      <div className={'arrow-' + (props.axis == 'x' ? 'right' : 'down')} />
    </div>
  )
}
