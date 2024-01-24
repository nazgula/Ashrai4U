/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import { useAuth, useStore } from '@/core/context'
import { Chat, EMessageType, IMessage, MessagesList , EMessagePosition} from '@/components/smart'
import { ELoaderStatus } from './Loader'
import {  getHistoryApiCall } from '@/core/api/calls'
import Linkify from 'linkify-react'

// interface IUpdateProfilePayload {
//   indetifier: string
//   companyName: string
//   fullName: string
// }
import './style.scss'

export const Ai = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const status = useStore(state => state.status);

  const [messagesList, setMessageList] = useState<IMessage[]>([])
  const [loadingState, setLoadingState] = useState<ELoaderStatus | null>(null)
  const [loading, setLoading] = useState(false);

  const messageCreator = useCallback((payload: IMessage) => {
    setMessageList((prev) => {
      return [
        ...prev,
        {
          id: uuidv4(),
          type: EMessageType.text,
          date: new Date(),
          ...payload,
        },
      ]
    })
  }, [])

  useEffect(() => {
    console.log('Loading: ', loadingState)
  }, [loadingState])

  useEffect(() => {
    async function fetchData() {
      // const payload = {
      //   indetifier: '0444',
      //   companyName: 'בדיקה',
      //   fullName: 'בדיקה',
      // }
      if(user && status !== 'NEW'){
        console.log('fetching history')
        // await updateProfileHandler(payload as IUpdateProfilePayload)
        setLoading(true)
        // @ts-expect-error  old interface - not in use file deprected 
        const history = await getHistoryApiCall(user)
        if(history && history.length > 0){
          const messages: IMessage[] = [];
        [...history].reverse().map((element: any,index: any) => {
            messages.push({id:index,position: EMessagePosition.right,type:EMessageType.text, text: element.query })
            const Text = () => {
              return (
                <>
                  {element.answer
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
            messages.push({id:`answer${index}` ,position: EMessagePosition.left,type:EMessageType.text, text: <Text/> })
           
          });
          setMessageList(messages)
        }
        setLoading(false)

        console.log(JSON.stringify(history))
      }
    }
    if (!user) {
      setMessageList([])
      setLoadingState(null)
    }else{
      fetchData()
    }
  }, [user])


  // const updateProfileHandler = async (payload: IUpdateProfilePayload) => {
  //   try {
  //     console.log(`USER for profile ${JSON.stringify(user)}`)
  //     await updateProfileApiCall(payload as IUpdateProfilePayload, user!)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <section className="ai">
      <div className="container">
        <h3 className="ai__title">{t('main.ai.title')}</h3>
        <div className="ai__desc">{t('main.ai.description')}</div>
        <div className="ai__chat">
          <Chat
            messageCreator={messageCreator}
            setLoadingState={setLoadingState}
            loadingState={loadingState}
            loading={loading}
          >
            
            <MessagesList
              dataSource={messagesList}
              loadingState={loadingState}
            />
          </Chat>
        </div>
      </div>
    </section>
  )
}
