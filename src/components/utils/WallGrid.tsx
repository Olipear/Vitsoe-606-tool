import * as React from 'react'

export interface WallProps {
  width: number
  height: number
  children?: any
}

export const Wall = (props: WallProps) => {
  return (
    <div
      className='wall-grid'
      style={{
        height: props.height,
        width: props.width,
      }}
    >
      {props.children}
    </div>
  )
}
