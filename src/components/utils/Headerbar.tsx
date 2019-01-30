import * as React from 'react'

import { Navbar } from './NavigationBar/Navbar'
import { Messagebar } from './MessageBar/Messagebar'

import { Subscribe } from 'unstated'
import { SystemContainer } from '../../containers/System'
import { TutorialContainer } from '../../containers/Tutorial'

// stages
// 0 intro
// 1 dimensions
// 2 structure
// 3 components
// 4 finish

export interface HeaderProps {
  currentIndex: number
  message?: object
}

export const Headerbar = (props: HeaderProps) => {
  return (
    <Subscribe to={[SystemContainer, TutorialContainer]}>
      {(systems: SystemContainer, tutorial: TutorialContainer) => {
        return (
          <div className='headerbar'>
            <Navbar
              stageIndex={systems.getHighestStage(tutorial.areStepsComplete)}
              currentIndex={props.currentIndex}
            />
            <Messagebar
              showcontrols={props.currentIndex == 3}
              message={props.message}
            />
          </div>
        )
      }}
    </Subscribe>
  )
}
