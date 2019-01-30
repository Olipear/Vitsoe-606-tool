import * as React from 'react'
import { SpaceNameDisplayCurrent } from '../../../utils/SpaceName/SpaceNameDisplayCurrent'

export const EndSpaceName = () => {
  return (
    <div className='container'>
      <div className='label'>Your space name</div>
      <div className='text'>
        <SpaceNameDisplayCurrent />
      </div>
    </div>
  )
}
