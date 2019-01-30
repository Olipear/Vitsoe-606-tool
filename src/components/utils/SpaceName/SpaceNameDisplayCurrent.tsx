import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../../containers/System'

export const SpaceNameDisplayCurrent = () => {
  return (
    <Subscribe to={[SystemContainer]}>
      {(systems) => {
        return <span>{systems.state.spaceName}</span>
      }}
    </Subscribe>
  )
}
