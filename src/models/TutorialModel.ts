export interface Tutorial {
  stage1: {
    addSpaceName: boolean
    addHeight: boolean
    addWidth: boolean
  }
  stage2: {
    addTrack: boolean
  }
  stage3: {
    addComponent: boolean
  }
  completed: {
    stage1: boolean
    stage2: boolean
    stage3: boolean
  }
  currentStageIndex: number
  currentStageName: string
}
