import * as React from 'react'
import { PartsFinishMessage } from '../../components/pages/configurator-subpages/parts/PartsFinishMessage'

export const stageCompleteMessages = {
  stage1: 'Use the navigation above to move on to lay out your structure',
  stage2: 'Please create your structure then use the navigation to move on',
  stage3: <PartsFinishMessage message='Now build your system!' />,
}
