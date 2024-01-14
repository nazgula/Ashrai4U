import './style.scss'

interface ILoadingProps {
  color?: string
}

export const Loading = ({ color = 'currentColor' }: ILoadingProps) => {
  return (
    <span className={'loading'} style={{ color }}>
      <span className={'loading__dot'}></span>
      <span className={'loading__dot'}></span>
      <span className={'loading__dot'}></span>
    </span>
  )
}
