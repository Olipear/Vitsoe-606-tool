import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../../containers/System'

export const SysPrice = () => {
  return (
    <Subscribe to={[SystemContainer]}>
      {(systems: SystemContainer) => {
        return (
          <span className='msgbar-price'>
            <p>Estimate excluding taxes</p>
            <h2>{systems.state.cost + ' ' + systems.state.currency}</h2>
          </span>
        )
      }}
    </Subscribe>
  )
}
