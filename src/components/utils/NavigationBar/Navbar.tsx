import * as React from 'react'
import * as Base from '../../Base'
import { Breadcrumbs } from './Breadcrumbs'
import { UnitToggle } from './UnitToggle'
import { CurrencyToggle } from './CurrencyToggle'

export interface NavProps {
  stageIndex: number
  currentIndex: number
}

export const Navbar = (props: NavProps) => {
  let left = (
    <Base.Image src='img/Vitsoe.svg' alt='Vitsœ' className='navbar-logo' />
  )
  let right = []
  if (props.currentIndex != 0) {
    if (props.currentIndex != 4) {
      left = (
        <Breadcrumbs
          stageIndex={props.stageIndex}
          currentIndex={props.currentIndex}
        />
      )
    }
    if (props.currentIndex == 3 || props.currentIndex == 4) {
      right.push(<CurrencyToggle key='currency-toggle' />)
    }
    right.push(
      <UnitToggle key='unit-toggle' currentIndex={props.currentIndex} />
    )
  }

  return (
    <div className='navbar-container'>
      <div className='navbar-content'>
        <div className='navbar-left'>{left}</div>
        <div className='navbar-right'>
          {right.map(function(elem, index) {
            return elem
          })}
        </div>
      </div>
    </div>
  )
}
