import * as React from 'react'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'
import { TutorialContainer } from '../../../containers/Tutorial'
import { CheckEnvironmentWrapper } from '../CheckEnvironmentWrapper'

export interface Crumbs {
  stageIndex: number
  currentIndex: number
}

export const Breadcrumbs = (props: Crumbs) => {
  return (
    <Subscribe to={[TutorialContainer]}>
      {(tutorial: TutorialContainer) => {
        return (
          <div className='navbar-breadcrumbs'>
            <div
              className={
                (props.currentIndex == 1 ? 'current' : '') +
                (props.stageIndex >= 1 ? ' activated' : '')
              }
            >
              {props.currentIndex != 1 ? (
                <Link
                  to={'/configurator/dimensions'}
                  onClick={() => {
                    tutorial.markStageAsComplete()
                  }}
                >
                  {' '}
                  Your space{' '}
                </Link>
              ) : (
                'Your space'
              )}
            </div>
            <div
              className={
                (props.currentIndex == 2 ? 'current' : '') +
                (props.stageIndex >= 2 ? ' activated' : '')
              }
            >
              {props.stageIndex >= 2 && props.currentIndex != 2 ? (
                <CheckEnvironmentWrapper
                  checkOn='isInvalid'
                  returnOnFalse={
                    <Link
                      to={'/configurator/structure'}
                      onClick={() => {
                        tutorial.markStageAsComplete()
                      }}
                    >
                      {' '}
                      Design your structure{' '}
                    </Link>
                  }
                  returnOnTrue={'Design your structure'}
                />
              ) : (
                'Design your structure'
              )}
            </div>
            <div
              className={
                (props.currentIndex == 3 ? 'current' : '') +
                (props.stageIndex >= 3 ? ' activated' : '')
              }
            >
              {props.stageIndex >= 3 && props.currentIndex != 3 ? (
                <Link
                  to={'/configurator/parts'}
                  onClick={() => {
                    tutorial.markStageAsComplete()
                  }}
                >
                  {' '}
                  Hang your parts{' '}
                </Link>
              ) : (
                'Hang your parts'
              )}
            </div>
          </div>
        )
      }}
    </Subscribe>
  )
}
