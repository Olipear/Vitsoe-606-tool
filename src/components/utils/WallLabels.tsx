import * as React from 'react'
import { Arrow } from './Arrow'
import { convertMeasurementIncludingUnits } from '../../utils/converters'
import { CheckEnvironmentWrapper } from './CheckEnvironmentWrapper'

export interface WallLabelProps {
  showmeasurements: boolean
  showdeskheight: boolean
  width: number
  height: number
  pxRatio: number
  lengthSystem: 'metric' | 'imperial'
}

export const WallLabels = (props: WallLabelProps) => {
  const maxHeight = 267.5
  return (
    <div id='wall-labels'>
      <CheckEnvironmentWrapper
        pxRatio={props.pxRatio}
        checkOn='tooNarrow'
        returnOnFalse={
          <div id='wall-label-x'>
            <Arrow
              axis='x'
              label={convertMeasurementIncludingUnits(
                props.width,
                props.lengthSystem
              )}
            />
          </div>
        }
        returnOnTrue={''}
      />

      <div
        id='wall-label-maxHeight'
        style={{
          height: Math.max(0, props.height - maxHeight) * props.pxRatio,
        }}
      />

      <CheckEnvironmentWrapper
        pxRatio={props.pxRatio}
        checkOn='invalidMsg'
        returnOnTrue={null}
        returnOnFalse={
          <div id='wall-label-mid'>
            <p>Your wallspace</p>
          </div>
        }
      />

      <div id='wall-label-y'>
        <Arrow
          axis='y'
          label={convertMeasurementIncludingUnits(
            props.height,
            props.lengthSystem
          )}
        />
      </div>
    </div>
  )
}
