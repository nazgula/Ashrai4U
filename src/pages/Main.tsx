import { useCallback, useRef } from 'react'
import {
  Ai,
  BusinessSupport,
  Footer,
  Header,
  Help,
  HowItWorks,
  Security,
} from '@/components/sections'

export const MainPage = () => {
  const aiRef = useRef(null)

  const scrollToAI = useCallback(() => {
    if (aiRef.current) {
      setTimeout(() => {
        window.scrollTo({
          top: (aiRef.current as unknown as HTMLDivElement).offsetTop + 70,
          behavior: 'smooth',
        })
      }, 200)
    }
  }, [aiRef])

  return (
    <>
      <Header />
      <div ref={aiRef}>
        <Ai />
      </div>
      <HowItWorks />
      <Help onClick={scrollToAI} />
      <Security onClick={scrollToAI} />
      <BusinessSupport />
      <Footer />
    </>
  )
}
