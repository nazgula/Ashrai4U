import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles.css';
import { MainLayout } from '@/layout'
import { MainPage } from '@/pages'

function App() {
  useEffect(() => {
    const loadScriptByURL = (id: string, url: string, callback: () => void) => {
      const isScriptExist = document.getElementById(id)

      if (!isScriptExist) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        script.id = id
        script.onload = function () {
          if (callback) callback()
        }
        document.body.appendChild(script)
      }

      if (isScriptExist && callback) callback()
    }
    // load the script by passing the URL
    loadScriptByURL(
      'recaptcha-key',
      `https://www.google.com/recaptcha/api.js?render=${
        process.env.REACT_APP_RECAPCHA_PUB_KEY as string
      }`,
      function () {
        console.log('Script loaded!')
      },
    )
  }, [])
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
      </Route>
    </Routes>
  )
}

export default App
