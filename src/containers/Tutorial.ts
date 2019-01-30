import { Container } from 'unstated'
import { Tutorial } from '../models/TutorialModel'
import { stepMessages } from './Tutorial/stepMessages'
import { stageCompleteMessages } from './Tutorial/stageCompleteMessages'

class TutorialContainer extends Container<Tutorial> {
  constructor() {
    super()
    const localStorageTutorial: string = localStorage.getItem('tutorial')

    if (localStorageTutorial) {
      this.state = JSON.parse(localStorageTutorial)
    } else {
      this.state = {
        stage1: {
          addHeight: false,
          addSpaceName: false,
          addWidth: false,
        },
        stage2: {
          addTrack: false,
        },
        stage3: {
          addComponent: false,
        },
        completed: {
          stage1: false,
          stage2: false,
          stage3: false,
        },
        currentStageIndex: 1,
        currentStageName: 'stage1',
      }

      localStorage.setItem('tutorial', JSON.stringify(this.state))
    }
  }

  areStepsComplete = (stageName = null) => {
    stageName ? stageName : this.state.currentStageName
    // Used to show UI for continuing to next stage.
    // We do not mark the stage as complete until we move on to the next stage.
    let areStepsComplete = true

    for (
      let stepIndex = 0;
      stepIndex < stepMessages[stageName].length;
      stepIndex++
    ) {
      const step = stepMessages[stageName][stepIndex]
      if (this.state[stageName][step.stepId] == false) {
        areStepsComplete = false
        return
      }
    }

    return areStepsComplete
  }

  getNextMessage = () => {
    for (
      let stepIndex = 0;
      stepIndex < stepMessages[this.state.currentStageName].length;
      stepIndex++
    ) {
      const step = stepMessages[this.state.currentStageName][stepIndex]
      if (this.state[this.state.currentStageName][step.stepId] === false) {
        return stepMessages[this.state.currentStageName][stepIndex].stepMessage
      }
    }

    if (this.state.completed[this.state.currentStageName] === false) {
      // All the steps are complete but the stage is not marked as complete as we have not moved on yet
      return stageCompleteMessages[this.state.currentStageName]
    }
  }

  isCurrentStageComplete = () => {
    return this.state.completed[this.state.currentStageName]
  }

  markStageAsComplete = () => {
    // Triggered only when using the navigation to move on a stage, so we do not
    // show it when returning
    if (this.state.completed[this.state.currentStageName] !== true) {
      this.setState(
        {
          completed: {
            ...this.state.completed,
            [this.state.currentStageName]: true,
          },
        },
        () => {
          this.saveTutorial()
        }
      )
    }
  }

  saveTutorial = () => {
    localStorage.setItem('tutorial', JSON.stringify(this.state))
  }

  setCurrentStageIndex = (stageIndex) => {
    if (this.state.currentStageIndex !== stageIndex) {
      this.setState(
        {
          currentStageIndex: stageIndex,
          currentStageName: 'stage' + stageIndex,
        },
        () => {
          this.saveTutorial()
        }
      )
    }
  }

  updateStep = (step, value) => {
    if (
      this.state[this.state.currentStageName][step] !== value &&
      this.isCurrentStageComplete() == false
    ) {
      this.setState(
        {
          [this.state.currentStageName]: {
            ...this.state[this.state.currentStageName],
            [step]: value,
          },
        },
        () => {
          this.saveTutorial()
        }
      )
    }
  }
}

export { TutorialContainer }
