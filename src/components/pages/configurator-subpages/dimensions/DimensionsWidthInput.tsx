import * as React from 'react'
import { InputWidth } from '../../../utils/InputDimensions/InputWidth'

export const DimensionsWidthInput = () => {
  return (
    <div className='input-wrapper dimensions-width'>
      <label>Available width</label>
      <InputWidth />
    </div>
  )
}
