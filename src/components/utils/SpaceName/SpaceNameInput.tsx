import * as React from 'react'
import { Subscribe } from 'unstated'
import { SystemContainer } from '../../../containers/System'
import { TutorialContainer } from '../../../containers/Tutorial'
import { capitalize } from 'lodash'

function onChange(systems, tutorial, e) {
  systems.updateSpaceName(e)

  e.target.value == ''
    ? tutorial.updateStep('addSpaceName', false)
    : tutorial.updateStep('addSpaceName', true)
}

export const SpaceNameInput = () => {
  return (
    <Subscribe to={[SystemContainer, TutorialContainer]}>
      {(systems: SystemContainer, tutorial: TutorialContainer) => {
        const value = systems.state.spaceName ? systems.state.spaceName : ''
        return (
          <input
            autoFocus
            type='text'
            name='space-name'
            id='space-name'
            placeholder='e.g. living room'
            value={value}
            onChange={(e) => {
              onChange(systems, tutorial, e)
            }}
          />
        )
      }}
    </Subscribe>
  )
}
