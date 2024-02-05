import { Icon } from '@/components/ui'

export interface IBackLinkProps{
  backLinkText: string
  onClickBack: () => void
}

export const BackLink = (props: IBackLinkProps) => {
  return (
    <div className="flex items-center ml-auto">
      <Icon icon="back" viewBox="0 -2 32 32" className="w-4 mt-1 ml-2 cursor-pointer" color="black" size="10" onClick={props.onClickBack}/>
      <span onClick={props.onClickBack} className="ml-auto underline cursor-pointer text-blue">{props.backLinkText}</span>
    </div>
    )
};
