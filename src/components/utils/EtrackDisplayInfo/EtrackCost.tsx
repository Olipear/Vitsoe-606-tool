import * as React from 'react'
import { Subscribe } from 'unstated'
import { InitialDataContainer } from '../../../containers/InitialData'
import { SystemContainer } from '../../../containers/System'
import { priceForDisplay } from '../../../utils/converters'

export const EtrackCost = (props) => {
  return (
    <Subscribe to={[InitialDataContainer, SystemContainer]}>
      {(initialData: InitialDataContainer, systems: SystemContainer) => {
        const prices = initialData.state.etracks[props.part_no].prices
        return <span>{priceForDisplay(prices[systems.state.currency])}</span>
      }}
    </Subscribe>
  )
}
