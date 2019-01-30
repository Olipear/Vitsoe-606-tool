import * as React from 'react'
import { unitSymbol } from '../../../utils/converters'

export const EtrackDescription = (props) => {
  const part_no = props.part_no

  let length =
    props.lengthSystem == 'imperial'
      ? props.initialDataEtracks[part_no].length_in +
        unitSymbol(props.lengthSystem)
      : props.initialDataEtracks[part_no].length_cm +
        unitSymbol(props.lengthSystem)

  return <span key={props.part_no}>Etrack: {length}</span>
}
