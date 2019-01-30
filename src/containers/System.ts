import { Container } from 'unstated'
import { System } from '../models/SystemModel'
import { api } from '../utils/api'
import { cmToIn, inToCm } from '../utils/converters'

import { AxiosResponse } from 'axios'
import { roundTo2Decimal } from '../utils/converters'

class SystemContainer extends Container<System> {
  private saving: boolean = false

  constructor() {
    super()
    const systemId: string = localStorage.getItem('systemId')
    const system: string = localStorage.getItem('system')

    if (system) {
      this.state = JSON.parse(system)
    } else {
      this.state = {
        type: '606-experience',
        version: '1.0',
        environment: {
          width: null,
          height: null,
        },
        system: {
          etracks: [],
          components: [],
          finish: 'W',
          dimensions: {
            width: null,
            height: null,
            depth: null,
          },
        },
        cost: '0',
        currency: 'GBP',
        lengthSystem: 'metric',
        spaceName: '',
      }
    }

    if (systemId) {
      if (!system) {
        api.get('/systems/' + systemId).then((response: AxiosResponse) => {
          this.setState(response.data.object)
          localStorage.setItem('system', JSON.stringify(response.data.object))
        })
      } else {
        this.setState(JSON.parse(system))
      }
    } else {
      api
        .post('/systems', {
          object: this.state,
        })
        .then((response: AxiosResponse) => {
          localStorage.setItem('system', JSON.stringify(response.data.object))
          localStorage.setItem('systemId', response.data.uuid)
        })
    }
  }

  updateEnvironment = (
    name: 'width' | 'height' | 'reset',
    value: number = null,
    updateEtracksAndComponents: boolean = true
  ): void => {
    let newEnvironment: System['environment'] = {
      ...this.state.environment,
    }

    if (name == 'reset') {
      newEnvironment.height = null
      newEnvironment.width = null
    } else {
      newEnvironment[name] = roundTo2Decimal(value)
    }

    this.setState({ environment: newEnvironment }).then(() => {
      if (updateEtracksAndComponents) {
        // TODO: Maybe work out a way to preserve the structure/components/finish?
        this.saveSystem({
          etracks: [],
          components: [],
          dimensions: { width: null, height: null, depth: null },
          finish: 'W',
        })
      }
    })
  }

  addSystemEtrack = (
    partno: string,
    xPos: number,
    yPos: number,
    direction: 'left' | 'middle' | 'right'
  ): void => {
    let newSystem: System['system'] = { ...this.state.system }

    if (direction == 'left') {
      this.state.system.etracks.map(function(elem, index) {
        newSystem.etracks[index].x = elem.x + xPos / 2
      })
      newSystem.etracks.unshift({
        part_number: partno,
        x: newSystem.etracks[0].x - xPos,
        y: yPos,
      })
    } else if (direction == 'right') {
      this.state.system.etracks.map(function(elem, index) {
        newSystem.etracks[index].x = elem.x - xPos / 2
      })
      newSystem.etracks.push({
        part_number: partno,
        x: newSystem.etracks[newSystem.etracks.length - 1].x + xPos,
        y: yPos,
      })
    } else {
      newSystem.etracks.push({ part_number: partno, x: xPos, y: yPos })
    }

    for (let i: number = 0; i < newSystem.components.length; i++) {
      if (direction == 'left') {
        newSystem.components[i].bay += 1
      }
    }

    this.saveSystem(newSystem)

    this.updateSystemHeight().then(() => {
      this.updateSystemWidth()
    })
  }

  removeSystemEtrack = (eTrackId: number): void => {
    let newSystem: System['system'] = { ...this.state.system }

    for (let i: number = 0; i < eTrackId; i++) {
      newSystem.etracks[i].x +=
        (newSystem.etracks[newSystem.etracks.length - 1].x -
          newSystem.etracks[eTrackId - 1].x) /
        2
    }

    const originalLength = newSystem.etracks.length
    newSystem.etracks.length = eTrackId

    // We go backwards through the components array as splice re-indexes it
    // See: https://tinyurl.com/y8mb8ezg
    for (let j: number = eTrackId; j < originalLength; j++) {
      for (let i: number = newSystem.components.length - 1; i >= 0; i--) {
        if (newSystem.components[i].bay == j) {
          newSystem.components.splice(i, 1)
        }
      }
    }

    this.saveSystem(newSystem)
  }

  changeBayWidth = (
    eTrackId: number,
    changedWidthBay: number,
    initialData
  ): void => {
    let newSystem: System['system'] = { ...this.state.system }
    const wallWidth = this.state.environment.width
    let systemWidth = 0

    let bayWidths = []
    newSystem.etracks.map(function(elem, index) {
      if (index < newSystem.etracks.length - 1) {
        bayWidths.push(newSystem.etracks[index + 1].x - elem.x)
      }
    })

    bayWidths[eTrackId - 1] = changedWidthBay

    bayWidths.map(function(value) {
      systemWidth += value
    })

    let gaps = (wallWidth - systemWidth) / 2

    newSystem.etracks.map(function(elem, index) {
      if (index == 0) {
        elem.x = gaps
      } else {
        newSystem.etracks[index].x =
          newSystem.etracks[index - 1].x + bayWidths[index - 1]
      }
    })

    let keysArray = Object.keys(initialData.state.shelves)

    let tempSystemCompArray = newSystem.components.slice(0)
    tempSystemCompArray.map((component) => {
      if (component.bay == eTrackId) {
        for (let i: number = 0; i < keysArray.length; i++) {
          if (
            initialData.state.shelves[keysArray[i]].finish_code ==
              initialData.state.shelves[component.part_number].finish_code &&
            initialData.state.shelves[keysArray[i]].bay_width ==
              bayWidths[eTrackId - 1] &&
            initialData.state.shelves[keysArray[i]].shelf_depth ==
              initialData.state.shelves[component.part_number].shelf_depth &&
            initialData.state.shelves[keysArray[i]].shelf_type ==
              initialData.state.shelves[component.part_number].shelf_type
          ) {
            for (let m = 0; m < newSystem.components.length; m++) {
              if (
                newSystem.components[m].bay == eTrackId &&
                newSystem.components[m].pin == component.pin
              ) {
                newSystem.components.splice(m, 1)
                break
              }
            }

            let addedObject = {
              part_number: keysArray[i],
              bay: eTrackId,
              pin: component.pin,
            }

            newSystem.components.push(addedObject)
            break
          }
        }
      }
    })

    this.saveSystem(newSystem)
  }

  addComponentToBay = (partNum, bayNum, pinNum): void => {
    let newSystem: System['system'] = { ...this.state.system }
    let addedObject = { part_number: partNum, bay: bayNum, pin: pinNum }
    newSystem.components.push(addedObject)
    this.saveSystem(newSystem)
    this.updateSystemDepth('add', partNum)
  }

  removeComponentFromBay = (bayNum, pinNum): void => {
    let newSystem: System['system'] = { ...this.state.system }

    for (let i: number = 0; i < newSystem.components.length; i++) {
      if (
        newSystem.components[i].bay == bayNum &&
        newSystem.components[i].pin == pinNum
      ) {
        newSystem.components.splice(i, 1)
        break
      }
    }
    this.saveSystem(newSystem)
    this.updateSystemDepth('remove')
  }

  saveSystem = (system): void => {
    this.setState({ system: system }).then(() => {
      this.setState({ cost: this.getSystemCost() }).then(() => {
        localStorage.setItem('system', JSON.stringify(this.state))

        if (!this.saving) {
          this.saving = true
          api
            .put('/systems/' + localStorage.getItem('systemId'), {
              object: this.state,
            })
            .then((response) => {
              this.saving = false
            })
        }
      })
    })
  }

  getSystemCost = (): string => {
    const initialData = JSON.parse(localStorage.getItem('initialData'))
    const system = this.state.system
    const currency = this.state.currency
    let cost = 0

    for (let eTrack of system.etracks) {
      cost += initialData.etracks[eTrack.part_number].prices[currency]
    }

    for (let component of system.components) {
      cost += initialData.shelves[component.part_number].prices[currency]
    }

    return (cost / 100).toFixed(2)
  }

  changeCurrency = (code: { label: string; value: string }): void => {
    this.setState({ currency: code.value }).then(() => {
      let cost = this.getSystemCost()
      this.setState({ cost: cost }).then(() => {
        this.saveSystem(this.state.system)
      })
    })
  }

  setFinish = (finishCode): void => {
    this.state.system.finish = finishCode
    this.updateShelfFinishes(finishCode)
    this.saveSystem(this.state.system)
  }

  updateShelfFinishes = (finishCode): void => {
    this.state.system.components.forEach((shelf) => {
      let partNumber = shelf.part_number.split(' ')
      let newPartNumber = partNumber[0] + ' ' + partNumber[1] + ' ' + finishCode
      let initialData = JSON.parse(localStorage.getItem('initialData'))

      if (
        !initialData.shelves.hasOwnProperty(newPartNumber) &&
        finishCode.length > 1
      ) {
        let modifiedPartNumber =
          partNumber[0] + ' ' + partNumber[1] + ' ' + finishCode[1]
        if (initialData.shelves.hasOwnProperty(modifiedPartNumber)) {
          shelf.part_number = modifiedPartNumber
        }
      } else if (initialData.shelves.hasOwnProperty(newPartNumber)) {
        shelf.part_number = newPartNumber
      }
    })
  }

  changeUnitsDimensions = (
    type:
      | { value: 'imperial'; label: 'Inches' }
      | { value: 'metric'; label: 'CM' }
  ): void => {
    if (type.value != 'imperial') {
      type.value = 'metric'
      this.updateEnvironment(
        'width',
        cmToIn(this.state.environment.width),
        false
      )
      this.updateEnvironment(
        'height',
        cmToIn(this.state.environment.height),
        false
      )
    } else if (type.value == 'imperial') {
      this.updateEnvironment(
        'width',
        inToCm(this.state.environment.width),
        false
      )
      this.updateEnvironment(
        'height',
        inToCm(this.state.environment.height),
        false
      )
    }

    this.setState({ lengthSystem: type.value })
    this.saveSystem(this.state.system)
  }

  changeUnitsParts = (type, resetValues = false) => {
    if (type.value != 'imperial') {
      type.value = 'metric'
    }

    this.setState({ lengthSystem: type.value })

    if (resetValues === true) {
      this.updateEnvironment('reset')
    }

    this.saveSystem(this.state.system)
  }

  getShareUrl = (): string => {
    const systemId = localStorage.getItem('systemId')

    if (systemId) {
      const path = window.location.href.replace(window.location.hash, '')
      return path + '#/share/' + systemId
    }

    return ''
  }

  getHighestStage = (tutorialAreStepsCompleteFn): number => {
    if (
      this.state.system.components.length &&
      tutorialAreStepsCompleteFn('stage3') == true
    ) {
      return 4
    }

    if (
      this.state.system.etracks.length > 1 &&
      tutorialAreStepsCompleteFn('stage2') == true
    ) {
      return 3
    }

    if (
      this.state.environment.width &&
      this.state.environment.height &&
      this.state.spaceName &&
      tutorialAreStepsCompleteFn('stage1') == true
    ) {
      return 2
    }

    return 1
  }

  updateSystemDepth = (
    addOrRemove: 'add' | 'remove',
    partno: null | string = null
  ): void => {
    const initialData = JSON.parse(localStorage.getItem('initialData'))
    let newDepth = 0

    if (addOrRemove == 'add' && partno) {
      const depthOfPart = initialData.shelves[partno].shelf_depth
      if (depthOfPart >= this.state.system.dimensions.depth) {
        newDepth = depthOfPart
      }
    } else {
      this.state.system.components.forEach((component) => {
        const depthOfThisComponent =
          initialData.shelves[component.part_number].shelf_depth
        if (depthOfThisComponent > newDepth) {
          newDepth = depthOfThisComponent
        }
      })
    }

    if (newDepth > 0) {
      const newSystem = {
        ...this.state.system,
        dimensions: {
          ...this.state.system.dimensions,
          depth: newDepth,
        },
      }

      this.setState(
        {
          system: newSystem,
        },
        () => {
          this.saveSystem(this.state.system)
        }
      )
    }
  }

  updateSystemHeight = () => {
    const initialData = JSON.parse(localStorage.getItem('initialData'))

    let newHeight = initialData.constants.ETRACK_DISTANCE_FROM_FLOOR

    let maxEtrackLength = 0
    this.state.system.etracks.forEach((etrack) => {
      if (initialData.etracks[etrack.part_number].length_cm > maxEtrackLength) {
        maxEtrackLength = initialData.etracks[etrack.part_number].length_cm
      }
    })

    newHeight += maxEtrackLength

    if (newHeight > 0) {
      const newSystem = {
        ...this.state.system,
        dimensions: {
          ...this.state.system.dimensions,
          height: newHeight,
        },
      }

      return this.setState(
        {
          system: newSystem,
        },
        () => {
          this.saveSystem(this.state.system)
        }
      )
    }
  }

  updateSystemWidth = () => {
    const start = this.state.system.etracks[0].x
    const end = this.state.system.etracks[this.state.system.etracks.length - 1]
      .x

    const newWidth = end - start + 1.2 // 1.2 = width of an etrack

    const newSystem = {
      ...this.state.system,
      dimensions: {
        ...this.state.system.dimensions,
        width: newWidth,
      },
    }

    return this.setState(
      {
        system: newSystem,
      },
      () => {
        this.saveSystem(this.state.system)
      }
    )
  }

  updateSpaceName = (event) => {
    this.setState({ spaceName: event.target.value })
    this.saveSystem(this.state.system)
  }
}

export { SystemContainer }
