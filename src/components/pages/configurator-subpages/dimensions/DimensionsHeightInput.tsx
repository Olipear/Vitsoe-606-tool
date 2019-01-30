import * as React from 'react'
import { InputHeight } from '../../../utils/InputDimensions/InputHeight'

export const DimensionsHeightInput = () => {
  return (
    <div className='input-wrapper dimensions-height'>
      <label>Available height</label>
      <InputHeight />
    </div>
  )
}
