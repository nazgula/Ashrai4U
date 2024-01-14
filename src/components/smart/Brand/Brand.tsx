import cn from 'classnames'
import { isMobile } from 'react-device-detect'

import { Icon } from '@/components/ui'

interface IBrand {
  hasSlogan?: boolean
}
export const Brand = ({ hasSlogan = true }: IBrand) => {
  return (
    <div className={cn('brand', { 'brand--mobile': isMobile })}>
      {hasSlogan && <div className="brand__slogan">powered by</div>}
      <Icon
        className="brand__logo"
        viewBox="0 0 183 30"
        size={'100%'}
        icon={'logo'}
      />
    </div>
  )
}
