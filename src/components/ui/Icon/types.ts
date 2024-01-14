import { SyntheticEvent } from 'react'
import { icons } from './icons'

export enum EIconGroup {
  icon = 'icon',
  logo = 'logo',
  custom = 'custom',
}
export enum EIconType {
  stroke = 'stroke',
  fill = 'fill',
  fillAndStroke = 'fillAndStroke',
}

export type TIcon = {
  icon: keyof typeof icons
  viewBox?: string
  size?: string
  color?: string
  onClick?: (e: SyntheticEvent<SVGSVGElement>) => void
  className?: string
}
