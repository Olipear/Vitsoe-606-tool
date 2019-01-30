import { Part } from './Part'

export interface Etrack extends Part {
  length_cm: string
  length_in: string
  pins_available: number
}
