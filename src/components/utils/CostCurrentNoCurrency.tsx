import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../containers/System'

export const CostCurrentNoCurrency = () => {
  return (
    <Subscribe to={[SystemContainer]}>
      {(systems: SystemContainer) => {
        return <span>{systems.state.cost}</span>
      }}
    </Subscribe>
  )
}
