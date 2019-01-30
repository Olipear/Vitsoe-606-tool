import { Container } from 'unstated'
import * as models from '../models'
import { api } from '../utils/api'

class InitialDataContainer extends Container<models.InitialData> {
  constructor() {
    super()
    this.state = {
      loaded: false,
      constants: {},
      etracks: {},
      finishes: {},
      bay_widths: {},
      shelf_depths: {},
      shelf_categories: {},
      shelf_types: {},
      shelves: {},
      currencies: {},
    }

    const initialData: string = localStorage.getItem('initialData')

    if (initialData) {
      const parsedInitialData = JSON.parse(initialData)
      parsedInitialData.loaded = true
      this.setState(parsedInitialData)
      return
    }

    api.get('/').then((response) => {
      const state = {
        loaded: true,
        constants: this.processConstants(response.data.constants),
        etracks: this.processEtracks(response.data.etracks),
        bay_widths: this.processDouble(
          response.data.component_widths,
          'width_cm',
          'width_in'
        ),
        finishes: this.processDouble(
          response.data.component_finishes,
          'code',
          'name'
        ),
        shelf_depths: this.processDouble(
          response.data.component_depths,
          'depth_cm',
          'depth_in'
        ),
        shelf_categories: this.processDouble(
          response.data.component_categories,
          'key',
          'name'
        ),
        shelf_types: this.processDouble(
          response.data.component_types,
          'key',
          'name'
        ),
        shelves: this.processShelves(response.data.components),
        currencies: this.processDouble(
          response.data.currencies,
          'code',
          'symbol'
        ),
      }

      this.setState(state)

      localStorage.setItem('initialData', JSON.stringify(state))
    })
  }

  processConstants(items: models.Constant[]) {
    let processed = {}

    Object.keys(items).forEach((item) => {
      let toAdd = items[item]

      if (!isNaN(toAdd)) {
        toAdd = Number(toAdd)
      }

      processed[item] = toAdd
    })

    return processed
  }

  processEtracks(items: models.Etrack[]) {
    let processed = {}

    items.forEach((item) => {
      processed[item.part_number] = {
        length_cm: Number(item.length_cm),
        length_in: item.length_in,
        pins_available: item.pins_available,
        prices: this.processPrices(item.prices),
      }
    })

    return processed
  }

  processShelves(items: models.Shelf[]) {
    let processed = {}

    items.forEach((item) => {
      processed[item.part_number] = {
        bay_width: Number(item.component_width_cm),
        bay_width_in: item.component_width_in,
        finish_code: item.component_finish,
        shelf_depth: Number(item.component_depth_cm),
        shelf_depth_in: item.component_depth_in,
        shelf_category: item.component_category,
        shelf_type: item.component_type,
        pins_occupied: item.pins_occupied,
        prices: this.processPrices(item.prices),
      }
    })

    return processed
  }

  processDouble(
    items: (
      | models.BayWidth
      | models.Finish
      | models.ShelfDepth
      | models.ShelfCategory
      | models.ShelfType
      | models.Currency)[],
    key: string,
    value: string
  ) {
    let processed = {}

    items.forEach((item) => {
      processed[item[key]] = item[value]
    })

    return processed
  }

  processPrices(prices: Record<string, string>[]) {
    let processed = {}

    prices.forEach((price) => {
      const currency = Object.keys(price)[0]
      processed[currency] = Number(price[currency])
    })

    return processed
  }
}

export { InitialDataContainer }
