import * as React from 'react'

export interface PartProps {
  pxRatio: number
  // give it the part from the intital data object ie.
  systemFinish?: any
  partObj: any
  unscaled?: boolean
  snappedState?: any
  initialData?: any
  itemPart?: any
  onSystem?: boolean
  beingHovered?: boolean
  warningLayer?: boolean
}

// sin(30) = .5, depth scale is 0.4, therefore multiplier is 0.2.
export const Part = (props) => {
  let style = {}

  let usedPart = null

  if (props.initialData && props.itemPart) {
    let keysArray = Object.keys(props.initialData.state.shelves)
    for (let i = 0; i < keysArray.length; i++) {
      if (
        props.initialData.state.shelves[keysArray[i]].finish_code ==
          props.initialData.state.shelves[props.itemPart].finish_code &&
        props.initialData.state.shelves[keysArray[i]].bay_width == 65.5 &&
        props.initialData.state.shelves[keysArray[i]].shelf_depth ==
          props.initialData.state.shelves[props.itemPart].shelf_depth &&
        props.initialData.state.shelves[keysArray[i]].shelf_type ==
          props.initialData.state.shelves[props.itemPart].shelf_type
      ) {
        usedPart = props.initialData.state.shelves[keysArray[i]]
        break
      }
    }
  }

  if (!props.unscaled) {
    style = {
      width:
        props.pxRatio *
        (usedPart
          ? usedPart.bay_width + usedPart.shelf_depth * 0.865 * 0.4
          : props.partObj.bay_width + props.partObj.shelf_depth * 0.865 * 0.4),
      height: 'auto',
      maxWidth: 'none',
      position: 'relative' as 'relative', // Typescript thing - see https://tinyurl.com/ydhxv64q
      left:
        props.pxRatio *
        (usedPart
          ? -usedPart.shelf_depth * 0.865 * 0.4
          : -props.partObj.shelf_depth * 0.865 * 0.4),
    }
  } else {
    style = {}
  }

  return (
    <img
      style={style}
      draggable={false}
      src={
        'img/parts/' +
        (props.beingHovered
          ? 'select'
          : props.warningLayer
          ? 'warning'
          : props.onSystem || props.unscaled
          ? props.systemFinish
          : 'delete') +
        '/' +
        props.partObj.shelf_type +
        '-' +
        props.partObj.shelf_depth +
        '-' +
        (usedPart ? usedPart.bay_width : props.partObj.bay_width) +
        '.svg'
      }
    />
  )
}
