export interface Rules {
  rulesRun: string[]
  ruleResults: {
    [key: string]: {
      type: string
      message: string
    }
  }
}
