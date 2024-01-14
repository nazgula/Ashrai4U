/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { Icon } from '@/components/ui'

// @ts-ignore
const ModalContext = createContext<any>()

const Modal = ({
  modal,
  unSetModal,
}: {
  modal: JSX.Element
  unSetModal: () => void
}) => {
  useEffect(() => {
    const bind = (e: any) => {
      if (e.keyCode !== 27) {
        return
      }

      if (
        document.activeElement &&
        ['INPUT', 'SELECT'].includes(document.activeElement.tagName)
      ) {
        return
      }

      unSetModal()
    }

    document.addEventListener('keyup', bind)
    return () => document.removeEventListener('keyup', bind)
  }, [modal, unSetModal])

  return (
    <div className="modal">
      {/* <button
        type="button"
        aria-label="close"
        className="modal__close"
        onClick={unSetModal}
      /> */}
      <div className="modal__inner">
        <button
          className="modal__close-btn"
          aria-label="close"
          onClick={unSetModal}
        >
          <Icon viewBox="0 0 24 24" size={'16px'} icon="close" />
        </button>
        <div className="modal__content">{modal}</div>
      </div>
    </div>
  )
}

const ModalProvider = (props: any) => {
  const [modal, setModal] = useState(null)

  const unSetModal = useCallback(() => {
    setModal(null)
  }, [setModal])

  return (
    <ModalContext.Provider value={{ unSetModal, setModal }} {...props}>
      {props.children}
      {modal && <Modal modal={modal} unSetModal={unSetModal} />}
    </ModalContext.Provider>
  )
}

const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a UserProvider')
  }

  return context
}

export { ModalProvider, useModal }
