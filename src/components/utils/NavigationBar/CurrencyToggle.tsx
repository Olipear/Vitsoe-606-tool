import * as React from 'react'
import Dropdown from 'react-dropdown'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../../containers/System'
import { InitialDataContainer } from '../../../containers/InitialData'

export const CurrencyToggle = () => {
  function getCurrencyOptions(initialData) {
    let newArray = []

    Object.keys(initialData.state.currencies).map(function(key, index) {
      newArray.push({
        value: key,
        label: key,
      })
    })
    return newArray
  }

  return (
    <Subscribe to={[InitialDataContainer, SystemContainer]}>
      {(initialData: InitialDataContainer, systems: SystemContainer) => {
        return (
          <Dropdown
            placeholder='Select a currency'
            options={getCurrencyOptions(initialData)}
            className='dropdown dropdown-currency'
            onChange={systems.changeCurrency}
            value={systems.state.currency}
          />
        )
      }}
    </Subscribe>
  )
}
