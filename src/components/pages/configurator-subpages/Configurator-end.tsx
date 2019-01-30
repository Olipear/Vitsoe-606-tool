import * as React from 'react'
import '../../../assets/scss/ConfiguratorEnd.scss'
import '../../../assets/scss/Headerbar.scss'
import { EndSpaceName } from './end/EndSpaceName'
import { ButtonLink } from '../../utils/ButtonLink'
import { EndSystemColour } from './end/EndSystemColour'
import { EndSystemDimensions } from './end/EndSystemDimensions'
import { EndSystemImage } from './end/EndSystemImage'
import { Headerbar } from '../../utils/Headerbar'
import { CostBreakdown } from '../../utils/CostBreakdown'
import { CurrencyCurrent } from '../../utils/CurrencyCurrent'
import { CostCurrentNoCurrency } from '../../utils/CostCurrentNoCurrency'

interface EndProps {
  pxRatio: number
  setPxRatio: Function
}

export const ConfiguratorEnd = (props: EndProps) => {
  return (
    <div>
      <Headerbar currentIndex={4} />
      <div className='end-page-container'>
        <div className='end-page-content'>
          <div className='column-1'>
            <h2 style={{ fontWeight: 'bold' }}>
              Your 606 Universal Shelving System
            </h2>

            <EndSpaceName />

            <div className='container'>
              <div className='label'>Estimate excluding taxes</div>
              <div className='text'>
                <CostCurrentNoCurrency /> <CurrencyCurrent />
              </div>
            </div>

            <EndSystemColour />

            <EndSystemDimensions />
          </div>

          <div className='column-2'>
            <EndSystemImage
              pxRatio={props.pxRatio}
              setPxRatio={props.setPxRatio}
            />

            <div className='summary-container'>
              <div className='column-split'>
                <ButtonLink
                  colour='blue'
                  href='/configurator/parts'
                  label='Edit system'
                  arrow='left'
                />
                <ButtonLink
                  colour='blue'
                  href='#'
                  label='Copy shareable link'
                  copyLink={true}
                />
              </div>

              <div className='column-split'>
                <div className='component-breakdown-container'>
                  <h4>Component breakdown</h4>
                  <CostBreakdown />
                </div>

                <div className='total-estimate-container'>
                  <div className='total-estimate-row'>
                    <h4>Total estimate</h4>
                    <CostCurrentNoCurrency />
                  </div>

                  <div className='total-estimate-disclaimer'>
                    <span>Estimate total disclaimer would go here...</span>
                  </div>
                </div>

                <div className='submit-enquiry'>
                  <ButtonLink colour='yellow' href='#' label='Submit inquiry' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
