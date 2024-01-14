/* @use 
	<Icon viewBox="0 0 36 36" size={'36px'} icon={'error'} />
*/

import { icons } from './icons'
import { EIconType, TIcon } from './types'

export const Icon = ({
  icon,
  color = 'currentColor',
  size,
  viewBox,
  onClick,
  ...rest
}: TIcon) => {
  const jsx = icons[icon]?.jsx
  const iconType = icons[icon]?.type ? icons[icon]?.type : EIconType.fill
  return (
    <svg
      {...{ size, color, ...rest }}
      viewBox={viewBox || '0 0 24 24'}
      style={{
        width: `${size ? size : 'inherit'}`,
        minWidth: `${size ? size : 'inherit'}}`,
        fill: `${
          [EIconType.fill, EIconType.fillAndStroke].includes(iconType!)
            ? color
            : 'none'
        }`,
        stroke: `${
          [EIconType.stroke, EIconType.fillAndStroke].includes(iconType!)
            ? color
            : 'none'
        }`,
        cursor: `${onClick ? 'pointer' : 'inherit'}`,
      }}
    >
      {jsx}
    </svg>
  )
}
