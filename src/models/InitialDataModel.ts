export interface InitialData {
  loaded: boolean
  constants: Record<string, any>
  etracks: {
    [key: string]: {
      length_cm: number
      length_in: string
      pins_available: number
      prices: Record<string, number>[]
    }
  }
  finishes: Record<string, string>
  bay_widths: Record<string, string>
  shelf_depths: Record<string, string>
  shelf_categories: Record<string, string>
  shelf_types: Record<string, string>
  shelves: {
    [key: string]: {
      bay_width: number
      bay_width_in: string
      finish_code: string
      shelf_depth: number
      shelf_depth_in: string
      shelf_category: string
      shelf_type: string
      pins_occupied: number
      prices: Record<string, number>[]
    }
  }
  currencies: Record<string, string>
}
