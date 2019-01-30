import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../containers/System'

export const CurrencyCurrent = () => {
  return (
    <Subscribe to={[SystemContainer]}>
      {(systems: SystemContainer) => {
        return <span>{systems.state.currency}</span>
      }}
    </Subscribe>
  )
}
