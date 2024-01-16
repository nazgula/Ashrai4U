/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useCallback, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Linkify from 'linkify-react'

import { useTokenReset } from '@/core/hooks'
import { useAuth, useModal, useStore } from '@/core/context'
import { getAnswerApiCall, sendQuestionApiCall } from '@/core/api/calls'
import { TSendQuestionApiCallPayload } from '@/core/api/types'

// Login
import { LogoutPrepare, Profile } from '@/components/admin'
import { ELoaderStatus } from '@/components/sections'
import { Button, EButtonType, Icon } from '@/components/ui'
import { EMessagePosition, EMessageType, IMessage } from '../MessagesList'
import {  MoonLoader
} from 'react-spinners';


import './style.scss'

interface IChatProps {
  children: JSX.Element
  loadingState: ELoaderStatus | null
  loading: boolean
  messageCreator: (payload: IMessage) => void
  setLoadingState: (state: ELoaderStatus | null) => void
}

export const Chat = ({
  children,

  loading,
  messageCreator,
  setLoadingState,
}: IChatProps) => {
  const { t } = useTranslation()
  const { user, profileUpdated } = useAuth()
  const { resetToken } = useTokenReset()
  const { setModal } = useModal()
  const status = useStore(state => state.status);
  const [textAreaValue, setTextAreaValue] = useState('')
  const [history, setHistory] = useState('')
  const updateStatus = useStore(state => state.updateStatus);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
 
  const STATUSES = [
    ELoaderStatus.searchingBank,
    ELoaderStatus.searchingBank,
    ELoaderStatus.searchingAuthority,
    ELoaderStatus.searchingAuthority,
    ELoaderStatus.searchingInternal,
    ELoaderStatus.searchingInternal,
    ELoaderStatus.analyzing,
    ELoaderStatus.analyzing,
  ]

  const onTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!user) {
      event.preventDefault()
      setTextAreaValue('')
      // setModal(<Login />)
    } else {
      const { value } = event.target
      setTextAreaValue(value)
    }
  }

  const openProfileModalHandler = () => {
    setModal(<Profile />)
  }
  const openLogoutPrepareModalHandler = () => {
    setModal(<LogoutPrepare />)
  }

  const messageHandler = async (event: {
    keyCode: number
    shiftKey: boolean
    preventDefault: () => void
  }) => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault()
      if (textAreaValue === '' || textAreaValue === undefined) return

      try {
        textareaRef.current?.blur();
        messageCreator({
          position: EMessagePosition.right,
          text: textAreaValue,
        })
        setTextAreaValue('')
        setLoadingState(ELoaderStatus.preparing)

        const tokenId = await sendQuestion({
          question: textAreaValue,
          history,
        })
       
        setHistory(history ? history.concat(`,${tokenId}`) : tokenId)
        setLoadingState(ELoaderStatus.initiatingSearch)

        const chatBotDescription =
          tokenId && (await getChatBotMessageDescription(tokenId))

        if (chatBotDescription) {
          const Text = () => {
            return (
              <>
                {chatBotDescription
                  .split('<br></br>')
                  .map((message: string, index: number) => (
                    <Linkify as="p" options={{}} key={index}>
                      <br></br>
                      {message}
                    </Linkify>
                  ))}
              </>
            )
          }
          setLoadingState(null)
          console.log('setting focus if current exist')
         
          messageCreator({
            position: EMessagePosition.left,
            text: <Text />,
          })
           if (textareaRef.current) {
            textareaRef.current.focus();
          }
         
          
        }
      } catch (error: any) {
        if (error !== 'isLogout') {
          messageCreator({
            position: EMessagePosition.left,
            text: error.message,
            type: EMessageType.error,
          })
        }

        setLoadingState(null)
      }
    }
  }
  
  const sendQuestion = useCallback(
    async (payload: TSendQuestionApiCallPayload) => {
      try {
        const { response } = user && (await sendQuestionApiCall(payload, user))
        const { tokenId } = response

        if (tokenId) {
        
          return tokenId
        } else if (response === 'POLICY_VALIDATION') {
          throw new Error('Daily query limits was reached!')
        } else {
          throw new Error(response)
        }
      } catch (error: any) {
        if (localStorage.getItem('user') === 'null') {
          throw new Error('isLogout')
        } else {
          if (error.message.match(/403|User is not authorized/gm)) {
            resetToken()
          } else {
            throw new Error(error.message)
          }
        }
      }
    },
    [user],
  )

  const getChatBotMessageDescription = async (tokenId: string) => {
    let time = 0
    let indexStatus = 0
    try {
      const apiResponse = user && (await getAnswerApiCall(tokenId, user))
      if(apiResponse){
        setLoadingState(null)
        return apiResponse.html
      }

      }catch(e){
        console.log(JSON.stringify(e))
      }
    return new Promise((resolve, reject) => {
    
      const interval = setInterval(async () => {
        try {

          if (localStorage.getItem('user') === 'null') {
            clearInterval(interval)
            setLoadingState(null)
            reject('isLogout')
          } else {
            time = time + 5000
            setLoadingState(STATUSES[indexStatus])
            const response = user && (await getAnswerApiCall(tokenId, user))
            indexStatus = indexStatus + 1
            indexStatus = indexStatus > 7 ? 7 : indexStatus
            if (response) {
              clearInterval(interval)
              setLoadingState(null)
              if (localStorage.getItem('user') === 'null') {
                reject('isLogout')
              } else {
                
                resolve(response.html)
              }
            }
            if (time > 80000) {
              clearInterval(interval)
              setLoadingState(null)
              reject('time out')
            }
          }
        } catch (error) {
          clearInterval(interval)
          reject(error)
        }
      }, 10000)
    })
  }


  useEffect(() => {
    firstTime()
    async function firstTime(){
    console.log(`profileUpdated effect ${profileUpdated}`)
  
    if(status ==='NEW' && user){
      updateStatus('ON_BOARDING')

        try {
          messageCreator({
            position: EMessagePosition.right,
            text: 'שלום',
          })
          setTextAreaValue('')
          setLoadingState(ELoaderStatus.preparing)
  
          const tokenId = await sendQuestion({
            question: 'שלום',
            history,
          })
  
          setHistory(history ? history.concat(`,${tokenId}`) : tokenId)
          setLoadingState(ELoaderStatus.initiatingSearch)
  
          const chatBotDescription =
            tokenId && (await getChatBotMessageDescription(tokenId))
  
          if (chatBotDescription) {
            const Text = () => {
              return (
                <>
                  {chatBotDescription
                    .split('<br></br>')
                    .map((message: string, index: number) => (
                      <Linkify as="p" options={{}} key={index}>
                        <br></br>
                        {message}
                      </Linkify>
                    ))}
                </>
              )
            }
            messageCreator({
              position: EMessagePosition.left,
              text: <Text />,
            })
          }

        } catch (error: any) {
          if (error !== 'isLogout') {
            messageCreator({
              position: EMessagePosition.left,
              text: error.message,
              type: EMessageType.error,
            })
          }
  
          setLoadingState(null)
         }
      
    }
  }
  }, [status])
  return (
    <div className="chat">
      <div className="chat__container">
        <div className="chat-header">
          {user && (
            <Button
              type={EButtonType.button}
              onClick={openLogoutPrepareModalHandler}
            >
              <Icon viewBox="0 0 24 24" size="100%" icon={'logout'} />
            </Button>
          )}

          <div className="chat-header__content">
            <div className="chat-header__title">
              {t('main.ai.chat.header.title')}
            </div>
            <div className="chat-header__description">
              {t('main.ai.chat.header.description')}
            </div>
          </div>

          {user && (
            <Button type={EButtonType.button} onClick={openProfileModalHandler}>
              <Icon viewBox="0 0 44 44" size="100%" icon={'account'} />
            </Button>
          )}
        </div>
        <div className="chat-main">
          {loading &&   <div  className="centered-content">
           <MoonLoader loading={loading} color="#09f" size={50} />
  </div>
           }
          {children}
          <form className="chat-message-sender">
         
            <textarea
              id="message"
            ref={textareaRef}

              name="message"
              rows={4}
              cols={40}
              value={textAreaValue}
              onChange={onTextAreaChange}
              onKeyDown={messageHandler}
              autoFocus={!!user}
            />
            <Icon viewBox="0 0 24 24" size={'24px'} icon={'message'} />
          </form>
        </div>
      </div>
    </div>
  )
}
