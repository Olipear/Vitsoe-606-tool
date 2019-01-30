import * as React from 'react'
import * as Base from '../Base'
import * as Types from '../Types'

import { Navbar } from '../utils/NavigationBar/Navbar'
import { Headerbar } from '../utils/Headerbar'

export class Introduction extends React.Component<Types.AppPage> {
  render() {
    return (
      <div className='pagewrapper'>
        <Headerbar currentIndex={0} />
        <div className='page-content fixedwidth'>
          <Base.Container flex-flow='column nowrap'>
            <Base.Container justify='flex-start'>
              <Base.Item basis='34%'>
                <h2>Plan your 606</h2>
              </Base.Item>
              <Base.Item alignment='flex-start' basis='40%'>
                <p>
                  Plan your own 606 system with our simple, easy-to-use tool.
                  Your planner will help you decide which track structure you
                  will require based on the surface to which the system will be
                  attached.
                </p>
              </Base.Item>
            </Base.Container>
            <div className='intro-steps'>
              <Base.Container justify='space-between'>
                <Base.Item basis='33%'>
                  <div className='intro-step'>
                    <h3>Your space</h3>
                    <p>Tell us about the space the system will be located.</p>
                  </div>
                </Base.Item>
                <Base.Item basis='32%'>
                  <div className='intro-step'>
                    <h3>Design your structure</h3>
                    <p>Lay out the E-Tracks to determine your layout.</p>
                  </div>
                </Base.Item>
                <Base.Item basis='33%'>
                  <div className='intro-step last'>
                    <h3>Hang your parts</h3>
                    <p>Choose what you’d like hang on your tracks.</p>
                  </div>
                </Base.Item>
              </Base.Container>
            </div>
            <div className='intro-happensnext'>
              <Base.Container>
                <Base.Item basis='30%'>
                  <h3> What happens next? </h3>
                  <p>
                    Once you’ve finished planning your system, you don’t have
                    submit it to your planner straight away - you can save it
                    for later, or share it with a friend.
                  </p>
                  <p>
                    This tool will give you a price estimate based on a
                    wall-mounted system. This does not take into account
                    additional components that may be required if you need a
                    compressed or semi-wall mounted system.
                  </p>
                  <Base.Button
                    link='/configurator/dimensions'
                    addClass='intro-start-button'
                  >
                    Get started!
                  </Base.Button>
                  <br />
                </Base.Item>
                <Base.Item basis='66%'>
                  <Base.Image
                    src='img/SystemIntro.png'
                    alt='alttexttest'
                    className={null}
                  />
                </Base.Item>
              </Base.Container>
            </div>
          </Base.Container>
        </div>
      </div>
    )
  }
}
