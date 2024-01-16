/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core/context'
import {  MoonLoader
} from 'react-spinners';

import {
  // Button,
  // Dropdown,
  // EButtonType,
  // IDropdownData,
  Input,
  // RadioButtonGroup,
} from '@/components/ui'

import './style.scss'
// import { dropdownList } from './data'
import {  getProfileApiCall } from '@/core/api/calls'
// import { useTokenReset } from '@/core/hooks'

export const Profile = () => {
  // const useProfileStore = useStore(EStore.profile)

  const { t } = useTranslation()
  // const { resetToken } = useTokenReset()
  // const { setModal } = useModal()
  const { user } = useAuth()

  const [profile, setProfile] = useState({
    'LocationFinal':'',
    'companyName':'',
    'fullName':'',
    'companyObligoFinal':'',
    'companyDamageStatusFinal':'',
    'companyDomainFinal':'',
    'businessrevenueFinal':'',
    'compnayBankFinal':'',
    'companyTypeFinal':'',
    'indetifier':'',
    'currentIncomeStatusFinal':''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if(user){
      // Replace with your data fetching logic
      setLoading(true)
        const profileData = await getProfileApiCall(user) 
        if(profileData.status === 403){
          // logout()
        }
        setProfile(profileData);
        console.log(JSON.stringify(profileData))
        setLoading(false)
      }
    }


    fetchData();
  }, []);
  // const radioList = [
  //   {
  //     value: EType.COMPANY,
  //     name: 'button-types',
  //   },
  //   {
  //     value: EType.AUTHORIZED_DEALER,
  //     name: 'button-types',
  //   },
  //   {
  //     value: EType.ASSOCIATION,
  //     name: 'button-types',
  //   },
  // ].map((item, i) => ({
  //   ...item,
  //   label: t(`profile.radioGroup.${i}.label`),
  // }))

  // const [selectedValue] = useState<string>(
  //   useProfileStore.profile.type
  //     ? radioList.filter(
  //         (item) => item.value === useProfileStore.profile.type,
  //       )[0].value
  //     : radioList[0].value,
  // )
  // const [input, setInput] = useState({
  //   indetifier: useProfileStore.profile.indetifier
  //     ? useProfileStore.profile.indetifier
  //     : '',
  //   fullName: useProfileStore.profile.fullName
  //     ? useProfileStore.profile.fullName
  //     : '',
  //   companyName: useProfileStore.profile.companyName
  //     ? useProfileStore.profile.companyName
  //     : '',
  //   loanStatus: useProfileStore.profile.loanStatus
  //     ? useProfileStore.profile.loanStatus
  //     : '',
  // })
  // const [dropdownValue] = useState({
  //   type: useProfileStore.profile.type ? useProfileStore.profile.type : '',
  //   warLocation: useProfileStore.profile.warLocation
  //     ? useProfileStore.profile.warLocation
  //     : '',
  //   obligo: useProfileStore.profile.obligo
  //     ? useProfileStore.profile.obligo
  //     : '',
  //   bankAccount: useProfileStore.profile.bankAccount
  //     ? useProfileStore.profile.bankAccount
  //     : '',
  //   income: useProfileStore.profile.income
  //     ? useProfileStore.profile.income
  //     : '',
  //   victom: useProfileStore.profile.victom
  //     ? useProfileStore.profile.victom
  //     : '',
  //   recruted: useProfileStore.profile.recruted
  //     ? useProfileStore.profile.recruted
  //     : '',
  //   evacuated: useProfileStore.profile.evacuated
  //     ? useProfileStore.profile.evacuated
  //     : '',
  //   damageStatus: useProfileStore.profile.damageStatus
  //     ? useProfileStore.profile.damageStatus
  //     : '',
  //   domain: useProfileStore.profile.domain
  //     ? useProfileStore.profile.domain
  //     : '',
  // })

  // const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target
  //   setInput((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }))
  // }

  // const dropdownClickHandler = (item: IDropdownData, key: string) => {
  //   setDropdownValue((prev) => ({
  //     ...prev,
  //     [key]: item.value,
  //   }))
  // }

  // const radioGroupHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value)
  // }

  // const configureObject = (
  //   obj: Partial<typeof dropdownValue> & {
  //     indetifier: string
  //     fullName?: string
  //     companyName?: string
  //   },
  // ) => {
  //   const filtered = Object.entries(obj).filter(
  //     ([, value]) => typeof value === 'string' && value !== '',
  //   )
  //   return Object.fromEntries(filtered)
  // }

  // const cancelHandler = () => {
  //   setModal(null)
  // }
  // // updateProfileApiCall
  // const updateProfileHandler = async () => {
  //   const payload = configureObject({
  //     ...dropdownValue,
  //     type: selectedValue,
  //     indetifier: input.indetifier,
  //     fullName: input.fullName,
  //     companyName: input.companyName,
  //   })

  //   if (!user) return
  //   console.log(payload)
  //   try {
  //     const response = await updateProfileApiCall(payload as any, user)
  //     if (response === 'DONE') {
  //       useProfileStore.updateProfile(payload)
  //     } else throw new Error(response)
  //   } catch (error: any) {
  //     if (error.message.match(/403|User is not authorized/gm)) resetToken()
  //     console.log(error)
  //   }
  // }

  return (
    <div className="profile">

      <div className="profile__title">{t('profile.title')}</div>
      <div className="profile__description">{t('profile.description')}</div>
      {loading  && 
        <div  className="centered-content">
      <MoonLoader loading={loading} color="#09f" size={50} />
      </div>
      }

     {!loading  &&
     <div className="profile-content profile__content">
        <div className="profile-content__wrapper">
          {/* <RadioButtonGroup
            label=""
            options={radioList}
            onChange={radioGroupHandler}
          /> */}
          <div className="profile-content-list profile-content__list">
            {/* indetifier */}
            <div className="profile-content-list__item">
              <label htmlFor="indetifier">{t('profile.indetifier')}</label>
              <Input
                type="text"
                disabled={true}
                name="indetifier"
                value={profile.indetifier}
              />
            </div>
            <div className="profile-content-list__item">
              <label htmlFor="indetifier">{t('profile.companyName')}</label>
              <Input
                type="text"
                disabled={true}
                name="CompanyName"
                value={profile.companyName}
              />
            </div>
            <div className="profile-content-list__item">
              <label htmlFor="indetifier">{t('profile.fullName')}</label>
              <Input
                type="text"
                disabled={true}
                name="fullName"
                value={profile.fullName}
              />
            </div>
            {/* fullName */}
            <div className="profile-content-list__item">
              <label htmlFor="fullName">{t('profile.companyDomainFinal')}</label>
              <Input
                type="text"
                name="companyDomainFinal"
                value={profile.companyDomainFinal? t(`profile.companyDomain.${profile.companyDomainFinal}`): profile.companyDomainFinal}
                disabled={true}
              />
            </div>
            <div className="profile-content-list__item">
              <label htmlFor="businessrevenueFinal">{t('profile.businessrevenueFinal')}</label>
              <Input
                type="text"
                name="businessrevenueFinal"
                value={profile.businessrevenueFinal? t(`profile.revenue.${profile.businessrevenueFinal}`): profile.businessrevenueFinal}
                disabled={true}
              />
            </div>
            <div className="profile-content-list__item">
              <label htmlFor="fullName">{t('profile.compnayBankFinal')}</label>
              <Input
                type="text"
                name="compnayBankFinal"
                value={profile.compnayBankFinal? t(`profile.companyBank.${profile.compnayBankFinal}`): profile.compnayBankFinal}
                disabled={true}
              />
            </div>
            <div className="profile-content-list__item">
              <label htmlFor="fullName">{t('profile.companyTypeFinal')}</label>
              <Input
                type="text"
                name="companyTypeFinal"
                value={profile.companyTypeFinal? t(`profile.companyType.${profile.companyTypeFinal}`): profile.companyTypeFinal}
                disabled={true}
              />
            </div>
            <div className="profile-content-list__item">
              <label htmlFor="fullName">{t('profile.companyDamageStatusFinal')}</label>
              <Input
                type="text"
                name="companyDamageStatusFinal"
                value={profile.companyDamageStatusFinal? t(`profile.companyDamage.${profile.companyDamageStatusFinal}`): profile.companyDamageStatusFinal}
            
                disabled={true}
              />
            </div>
            {/* companyName */}
           
            {/* loanStatus */}
            {/* <div className="profile-content-list__item">
              <label htmlFor="loanStatus">Loan status</label>
              <Input
                type="text"
                name="loanStatus"
                value={input.loanStatus}
                placeholder="Loan status"
                onInput={onInputChange}
              />
            </div>

            {dropdownList.map((item) => (
              <div className="profile-content-list__item" key={item.key}>
                <label htmlFor={item.key}>{item.label}</label>
                <Dropdown
                  _key={item.key}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  header={dropdownValue[item.key]}
                  data={item.data}
                  onClick={dropdownClickHandler}
                  hasAngle
                  isSelect
                />
              </div>
            ))} */}
          </div>
        </div>
      
      </div>
}

      {/* <div className="profile__handle">
        <Button
          type={EButtonType.button}
          className="button--style2"
          onClick={cancelHandler}
        >
          {t('profile.buttons.cancel')}
        </Button>
        <Button type={EButtonType.button} onClick={updateProfileHandler}>
          {t('profile.buttons.save')}
        </Button>
      </div> */}
    </div>
  )
}
