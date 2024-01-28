import cn from 'classnames'
import { isMobile } from 'react-device-detect'

import { Icon } from '@/components/ui'

interface IBrand {
  hasSlogan?: boolean
  iconName?: string
}
export const Brand = ({ hasSlogan = true, iconName = 'logo' }: IBrand) => {
  return (
    // className={cn('brand', { 'brand--mobile': isMobile })}
    <div className="flex flex-col items-center justify-center w-[10vw]">
      {hasSlogan && <div className="text-lg ">powered by</div>}
      <Icon
        className="brand__logo"
        viewBox="0 0 183 30"
        size={'100%'}
        icon={iconName}
      />
    </div>
  )
}
