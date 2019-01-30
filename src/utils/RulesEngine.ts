import { Engine } from 'json-rules-engine'
import { InitialData } from '../models/InitialDataModel'
import { System } from '../models/SystemModel'
import { rules } from './rules'
import { intersection } from 'lodash'

export class RulesEngine {
  private engine: Engine = new Engine(rules)
  private initialData: InitialData = JSON.parse(
    localStorage.getItem('initialData')
  )

  check = (
    system: System['system'],
    partNum: string,
    bayNum: number,
    pinNum: number,
    draggedPart: null | string,
    draggedBay: null | number,
    draggedPin: null | number
  ) => {
    const newComponent = this.initialData.shelves[partNum]

    this.engine.addOperator('lessThanMinusOne', (factValue, jsonValue) => {
      return factValue < jsonValue - 1
    })

    this.engine.addFact('num-bays', system.etracks.length - 1)
    this.engine.addFact('num-components', system.components.length)
    this.engine.addFact('new-component', newComponent)
    this.engine.addFact('new-bay', bayNum)
    this.engine.addFact('new-pin', pinNum)

    this.engine.addFact(
      'overlapping',
      (): boolean => {
        for (const existingComponent of system.components) {
          if (existingComponent.bay !== bayNum) {
            continue
          }

          if (
            existingComponent.part_number === draggedPart &&
            existingComponent.bay === draggedBay &&
            existingComponent.pin === draggedPin
          ) {
            continue
          }

          const existingComponentDetails = this.initialData.shelves[
            existingComponent.part_number
          ]

          if (
            intersection(
              this.fillRange(
                existingComponent.pin -
                  existingComponentDetails.pins_occupied +
                  1,
                existingComponent.pin
              ),
              this.fillRange(pinNum - newComponent.pins_occupied + 1, pinNum)
            ).length
          ) {
            return true
          }
        }

        return false
      }
    )

    this.engine.addFact(
      'mixed-metalshelf-depths',
      (): boolean => {
        for (const existingComponent of system.components) {
          if (
            existingComponent.bay === bayNum ||
            existingComponent.pin !== pinNum
          ) {
            continue
          }

          const existingComponentDetails = this.initialData.shelves[
            existingComponent.part_number
          ]

          if (existingComponentDetails.shelf_type !== 'metalshelf') {
            continue
          }

          if (
            existingComponentDetails.shelf_depth !== newComponent.shelf_depth
          ) {
            return true
          }
        }

        return false
      }
    )
    return this.engine.run()
  }

  fillRange = (start: number, end: number): Array<number> => {
    let arr: Array<number> = []

    for (let i: number = start; i <= end; i++) {
      arr.push(i)
    }

    return arr
  }
}
