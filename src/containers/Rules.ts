import { Container } from 'unstated'
import { RulesEngine } from '../utils/RulesEngine'
import { System } from '../models/SystemModel'
import { Rules } from '../models/RulesModel'

class RulesContainer extends Container<Rules> {
  private rulesEngine: RulesEngine = new RulesEngine()
  private emptyState = {
    rulesRun: [],
    ruleResults: {},
  }

  constructor() {
    super()
    this.state = this.emptyState
  }

  public checkComponentInPosition = (
    system: System['system'],
    partNum: string,
    bayNum: number,
    pinNum: number,
    draggedPart: null | string,
    draggedBay: null | number,
    draggedPin: null | number
  ): void => {
    if (this.checkRulesRun(bayNum, pinNum)) {
      return
    }
    this.rulesEngine
      .check(
        system,
        partNum,
        bayNum,
        pinNum,
        draggedPart,
        draggedBay,
        draggedPin
      )
      .then((events) => {
        let key: string = bayNum + '-' + pinNum
        let rulesRun: Rules['rulesRun'] = this.state.rulesRun.slice(0)
        rulesRun.push(key)

        if (events.length) {
          let ruleResults: Rules['ruleResults'] = { ...this.state.ruleResults }
          let type: 'errors' | 'warnings'
          let message: 'string'

          for (const event of events) {
            type = event.type
            message = event.params.message

            if (type === 'errors') {
              break
            }
          }

          ruleResults[key] = {
            type: type,
            message: message,
          }
          this.setState({ rulesRun: rulesRun, ruleResults: ruleResults })
        } else {
          this.setState({ rulesRun: rulesRun })
        }
      })
  }

  public clearRules = (): void => {
    this.setState(this.emptyState)
  }

  private checkRulesRun = (bayNum: number, pinNum: number): boolean => {
    for (let i: number = 0; i < this.state.rulesRun.length; i++) {
      if (this.state.rulesRun[i] === bayNum + '-' + pinNum) {
        return true
      }
    }

    return false
  }
}

export { RulesContainer }
