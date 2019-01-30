import * as React from 'react'
import { SpaceNameInput } from '../../../utils/SpaceName/SpaceNameInput'

export const DimensionsSpaceNameInput = () => {
  return (
    <div className='input-wrapper dimensions-spacename'>
      <label>What do you call this space?</label>
      <SpaceNameInput />
    </div>
  )
}
