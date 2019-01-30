import * as React from 'react'
import { SystemDepth } from '../../../utils/SystemDimensionsDisplayInfo/SystemDepth'
import { SystemHeight } from '../../../utils/SystemDimensionsDisplayInfo/SystemHeight'
import { SystemWidth } from '../../../utils/SystemDimensionsDisplayInfo/SystemWidth'

export const EndSystemDimensions = () => {
  return (
    <div className='container'>
      <div className='label'>System dimensions</div>
      <div className='text'>
        <div className='system-dimensions'>
          <span className='system-dimensions-labels'>Width</span>
          <span className='system-dimensions-text'>
            <SystemWidth />
          </span>
        </div>
        <div className='system-dimensions'>
          <span className='system-dimensions-labels'>Height</span>
          <span className='system-dimensions-text'>
            <SystemHeight />
          </span>
        </div>
        <div className='system-dimensions'>
          <span className='system-dimensions-labels'>Depth</span>
          <span className='system-dimensions-text'>
            <SystemDepth />
          </span>
        </div>
      </div>
    </div>
  )
}
