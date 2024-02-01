import { useCallback, useRef, useEffect } from 'react'
import  g1 from '@/assets/images/g1.png';



export const ImageTest = () => {


  useEffect(() => {

  }, [])

// ${props.img}
  return (
        <img src={g1}  className="pb-6 mt-auto md:pb-10 lg:pb-20 max-h-24 md:max-h-52 lg:max-h-full" />
  )
}
