import { Part } from './Part'

export interface Shelf extends Part {
  component_width_cm: string
  component_width_in: string
  component_finish: string
  component_depth_cm: string
  component_depth_in: string
  component_category: string
  component_type: string
  pins_occupied: number
}
