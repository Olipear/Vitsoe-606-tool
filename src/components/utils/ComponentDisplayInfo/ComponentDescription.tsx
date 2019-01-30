import * as React from 'react'
import { unitSymbol } from '../../../utils/converters'

export const ComponentDescription = (props) => {
  const part_no = props.part_no

  let shelf_depth =
    props.lengthSystem == 'imperial'
      ? props.initialDataShelves[part_no].shelf_depth_in +
        unitSymbol(props.lengthSystem)
      : props.initialDataShelves[part_no].shelf_depth +
        unitSymbol(props.lengthSystem)

  const bay_width =
    props.lengthSystem == 'imperial'
      ? props.initialDataShelves[part_no].bay_width_in +
        unitSymbol(props.lengthSystem)
      : props.initialDataShelves[part_no].bay_width +
        unitSymbol(props.lengthSystem)

  const type = props.shelf_types[props.initialDataShelves[part_no].shelf_type]

  if (type != 'Metal shelf') {
    return (
      <span key={props.part_no}>
        {type} - {bay_width}
      </span>
    )
  } else {
    return (
      <span key={props.part_no}>
        {type} - {shelf_depth} - {bay_width}
      </span>
    )
  }
}
