/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ELoaderStatus, Loader } from '@/components/sections'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import { Button, EButtonType } from '@/components/ui'
import './style.scss'
interface IPDFProps {
  url: string
}
export const PDF = ({ url }: IPDFProps) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.5)

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    console.log(numPages)
    setNumPages(numPages)
    setPageNumber(1)
  }

  const prevPageHandler = () => {
    if (numPages && pageNumber > 1 && pageNumber <= numPages) {
      setPageNumber(pageNumber - 1)
    }
  }
  const nextPageHandler = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const scaleIncreaseHandler = () => {
    if (scale < 3) {
      setScale(scale + 0.1)
    }
  }
  const scaleDecreaseHandler = () => {
    if (scale > 0.5 && scale <= 3) {
      setScale(scale - 0.1)
    }
  }
  return (
    <div className="pdf">
      <Document
        className={'pdf-document'}
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<Loader status={ELoaderStatus.preparing} />}
        renderMode="canvas"
      >
        <Page
          className={'pdf-page'}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          pageNumber={pageNumber}
          scale={scale}
        />
        <div className="pdf-navigate">
          <Button type={EButtonType.button} onClick={scaleDecreaseHandler}>
            -
          </Button>
          <Button type={EButtonType.button} onClick={prevPageHandler}>
            prev
          </Button>
          <div className="pdf-navigate__pages">
            {pageNumber} / {numPages}
          </div>
          <Button type={EButtonType.button} onClick={nextPageHandler}>
            next
          </Button>
          <Button type={EButtonType.button} onClick={scaleIncreaseHandler}>
            +
          </Button>
        </div>
      </Document>
    </div>
  )
}
