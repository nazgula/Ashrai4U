import { useEffect, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { EDirection, ELangSupport } from '@/i18n'

import './style.scss'

export const Sponsors = () => {
  const { t, i18n } = useTranslation()
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const [swiperDirection, setSwiperDirection] = useState(
    i18n.language === ELangSupport.he ? EDirection.rtl : EDirection.ltr,
  )

  useEffect(() => {
    setSwiperDirection(
      i18n.language === ELangSupport.he ? EDirection.rtl : EDirection.ltr,
    )
    forceUpdate()
  }, [i18n.language])

  const SwiperComponent = ({ dir }: { dir: EDirection }) => {
    return (
      <Swiper
        className="mySwiper"
        slidesPerView={'auto'}
        spaceBetween={23}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        dir={dir}
        loop
      >
        {[...Array(1)].map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={require('@/assets/images/_svg/cbsLogo.png')}
                alt=""
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    )
  }

  return (
    <section className="sponsors">
      <p>{t('main.sponsors')}</p>
      <SwiperComponent dir={swiperDirection} />
    </section>
  )
}
