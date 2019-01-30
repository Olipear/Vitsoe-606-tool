export function cmToIn(cm: number): number {
  return Number((cm / 2.54).toFixed(2))
}

export function inToFtOnly(inches: number): number {
  return Math.floor(inches / 12)
}

export function cmToFtOnly(cm: number): number {
  return inToFtOnly(cmToIn(cm))
}

export function cmToInRemainingAfterFeet(cm: number): number {
  return inToInRemainingAfterFeet(cmToIn(cm))
}

export function inToCm(inches: number): number {
  return Number((inches * 2.54).toFixed(2))
}

export function inToFtIn(inches: number): { feet: number; inches: number } {
  return {
    feet: inToFtOnly(inches),
    inches: inToInRemainingAfterFeet(inches),
  }
}

export function inToInRemainingAfterFeet(inches: number): number {
  return inches % 12
}

export function convertMeasurement(
  value: number,
  unit: 'metric' | 'imperial'
): number {
  if (unit === 'imperial') {
    return cmToIn(value)
  }

  return value
}

export function convertMeasurementIncludingUnits(
  value: number,
  unit: 'metric' | 'imperial'
): string {
  if (unit == 'imperial') {
    return (
      roundTo2Decimal(cmToFtOnly(value)) +
      " ' " +
      roundTo2Decimal(cmToInRemainingAfterFeet(value)) +
      ' "'
    )
  }
  return roundTo2Decimal(value) + ' cm'
}

export function unitSymbol(unit: 'metric' | 'imperial'): string {
  let unitSymbols = { imperial: '"', metric: 'cm' }
  return unitSymbols[unit]
}

export function priceForDisplay(price: number): string {
  return (price / 100).toFixed(2)
}

export function roundTo2Decimal(num: number): number {
  return num == null ? 0 : parseFloat(num.toFixed(2))
}
