import * as React from 'react'
import '../../assets/scss/FinishDropdown.scss'
import { InitialDataContainer } from '../../containers/InitialData'
import { SystemContainer } from '../../containers/System'
import Select from 'react-select'
import { components } from 'react-select'
import { Subscribe } from 'unstated'

const { Option } = components

function getImgUrl(finishKey, isSelected): string {
  const imgPaths = {
    W: {
      default: 'img/icons/finish_white_default.svg',
      selected: 'img/icons/finish_white_selected.svg',
    },
    M: {
      default: 'img/icons/finish_black_default.svg',
      selected: 'img/icons/finish_black_selected.svg',
    },
    S: {
      default: 'img/icons/finish_silver_default.svg',
      selected: 'img/icons/finish_silver_selected.svg',
    },
    BW: {
      default: 'img/icons/finish_beech_white_default.svg',
      selected: 'img/icons/finish_beech_white_selected.svg',
    },
    BM: {
      default: 'img/icons/finish_beech_black_default.svg',
      selected: 'img/icons/finish_beech_black_selected.svg',
    },
    BS: {
      default: 'img/icons/finish_beech_silver_default.svg',
      selected: 'img/icons/finish_beech_silver_selected.svg',
    },
  }

  const state = isSelected ? 'selected' : 'default'

  return imgPaths[finishKey][state]
}

const IconOption = (props) => (
  <Option {...props}>
    <img
      src={getImgUrl(props.value, props.isSelected)}
      style={{
        width: '24px',
        verticalAlign: 'bottom',
        paddingRight: '2px',
      }}
    />{' '}
    {props.label}
  </Option>
)

const ValueOption = (props) => (
  <components.SingleValue {...props}>
    <img
      src={getImgUrl(props.data.value, true)}
      style={{
        width: '24px',
        verticalAlign: 'bottom',
        paddingRight: '2px',
        marginLeft: '6px',
      }}
    />{' '}
    {props.children}
  </components.SingleValue>
)

export const FinishDropdown = () => {
  function getAllOptions(initialData) {
    return Object.keys(initialData.state.finishes).reduce((result, key) => {
      if (key != 'B') {
        result.push({
          value: key,
          label: initialData.state.finishes[key],
        })
      }
      return result
    }, [])
  }

  function getSelectedOption(systems, initialData) {
    return {
      value: systems.state.system.finish,
      label: initialData.state.finishes[systems.state.system.finish],
    }
  }

  function handleChange(e, systems) {
    systems.setFinish(e.value)
  }

  return (
    <Subscribe to={[InitialDataContainer, SystemContainer]}>
      {(initialData: InitialDataContainer, systems: SystemContainer) => {
        const selectedOption = getSelectedOption(systems, initialData)

        const allOptions = getAllOptions(initialData)

        return (
          <Select
            className='finish-dropdown'
            classNamePrefix='finish-dropdown'
            value={selectedOption}
            onChange={(e) => handleChange(e, systems)}
            options={allOptions}
            // defaultMenuIsOpen={true} // for debugging
            components={{ Option: IconOption, SingleValue: ValueOption }}
          />
        )
      }}
    </Subscribe>
  )
}
