import * as React from 'react'

export const Item = (props) => {
  return (
    <div
      className='flex-item'
      style={{
        flex: props.grow + ' ' + props.shrink + ' ' + props.basis,
        alignSelf: props.alignment,
      }}
    >
      {props.children}
    </div>
  )
}

Item.defaultProps = {
  grow: 0,
  shrink: 1,
  basis: 'auto',
  alignment: 'auto',
}

export const Container = (props) => {
  return (
    <div
      className='flex-container'
      style={{
        flexFlow: props.flow,
        justifyContent: props.justify,
        alignItems: props.alignitems,
        alignContent: props.aligncontent,
      }}
    >
      {props.children}
    </div>
  )
}

Container.defaultProps = {
  flow: 'row wrap',
  justify: 'space-between',
  alignitems: 'flex-start',
  aligncontent: 'flex-start',
}
