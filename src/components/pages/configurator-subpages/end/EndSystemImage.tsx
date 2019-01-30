import * as React from 'react'
import { SystemImage } from '../../../utils/SystemImage'

interface EndSystemImageProps {
  pxRatio: number
  setPxRatio: Function
}

export const EndSystemImage = (props: EndSystemImageProps) => {
  return <SystemImage pxRatio={props.pxRatio} setPxRatio={props.setPxRatio} />
}
