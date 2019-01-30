export interface System {
  type: string
  version: string
  environment: {
    width: number
    height: number
  }
  system: {
    etracks: {
      part_number: string
      x: number
      y: number
    }[]
    components: {
      part_number: string
      bay: number
      pin: number
    }[]
    finish: string
    dimensions: {
      width: number
      height: number
      depth: number
    }
  }
  cost: string
  currency: string
  lengthSystem: 'metric' | 'imperial'
  spaceName: string
}
