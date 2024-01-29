/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { v4 as uuidv4 } from 'uuid'
import { EEndpoint, apiRequest } from '@/core/api'
import CryptoJS from 'crypto-js'; 
import { useStore } from 'react-pinia'


import {
  EUserApiPath,
  TAddLeadApiCallPayload,
  TLoginApiCallResponse,
  TProfileApiCallPayload,
  TSignUpApiCallPayload,
  TUpdateLoanRequestPayload,
  TVerifyApiCallPayload,
  TVerifyLoginApiCallPayload,
  TVerifyLoginApiCallResponse
} from '@/core/api/types/user'
import { useAuth } from '@/core/context';

const apiEndpoint = EEndpoint.user

interface CodeInfo {
  codeVerifier: string;
  codeChallenge: string;
}

// Authentication helpers
// --------------------

const getRecapchaToken = (action: string) =>
  new Promise((resolve, reject) => {
    ;(globalThis as any).grecaptcha
      .execute(process.env.REACT_APP_RECAPCHA_PUB_KEY as string, {
        action,
      })
      .then((token: string) => {
        resolve(token)
      })
      .catch((error: any) => {
        reject(error.message)
      })
  })
  
  
  const generateCodeVerifierAndChallenge = (): CodeInfo => {
    // Generate a random codeVerifier
    const codeVerifier = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Base64);
  
    // Create a codeChallenge from the codeVerifier
    const hashedCodeVerifier = CryptoJS.SHA256(codeVerifier);
    const codeChallenge = CryptoJS.enc.Base64.stringify(hashedCodeVerifier);
  
    return {
      codeVerifier,
      codeChallenge,
    };
  };

// Authentication


// ----------------login/SignUp

export const loginApiCall = async (username: string): Promise<TLoginApiCallResponse> => {
  try {
    const token = await getRecapchaToken('')

    // console.log(token)
    const { codeVerifier, codeChallenge } = generateCodeVerifierAndChallenge();
    console.log('codeChallenge:', codeChallenge);
    console.log('codeVerifier:', codeVerifier);
    console.log('request:', {  codeChallenge: codeChallenge, username: username } )

    
    const response = await apiRequest({
      apiEndpoint,
      path: EUserApiPath.login,
      options: {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
        body: JSON.stringify({  codeChallenge: codeChallenge, username: username }),
      },
    })

    
  
    //  return new Promise((resolve, reject) => {}) ; 
    
    if (Object.prototype.hasOwnProperty.call(response, 'session')) {
      console.log('response:', response)
      return {session: response.session, codeVerifier: codeVerifier, username: username}
    } else {
      const { message, status } = await response.json()
      throw new Error(`${response.status}: ${message ? message : status}`)
    }
  } catch (error) {
    console.log('error:', error)
    throw error
  }
}


// ----------------verifyLoginSginUp
export const verifyLoginApiCall = async (data: TVerifyLoginApiCallPayload): Promise<any> => {
  try {
     const token = await getRecapchaToken('')
     // console.log(token)
    
     console.log('request data:', data )

    
    const response = await apiRequest({
      apiEndpoint,
      path: EUserApiPath.verifyCode,
      options: {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
        body: JSON.stringify({  ...data }),
      },
    })

    if (Object.prototype.hasOwnProperty.call(response, 'AccessToken')) {
      console.log('login - token: ', response.AccessToken)
      return response
    } else {
      const { message, status } = await response.json()
      throw new Error(`${response.status}: ${message ? message : status}`)
    }
  
  } catch (error) {
    console.log('error:', error)
    throw error
  }
}

// ----------------updateLoanRequest
export const updateLoanRequestApiCall = async (
  data: TUpdateLoanRequestPayload,
  user: TVerifyLoginApiCallResponse,
) => {
  try {
   
    console.log('updateProfileApiCall: ', user.AccessToken)
    const response = await apiRequest({
      apiEndpoint,
      path: EUserApiPath.updateProfile,
      options: {
        method: 'POST',
        headers: {
          // 'transaction-id': uuidv4(),
          Authorization: `${user.TokenType} ${user.AccessToken}`,
        },
        body: JSON.stringify({ ...data }),
      },
    })
    return response.message
  } catch (error) {
    throw error
  }
}

// ----------------getLoanRequest
export const getLoanRequestApiCall = async (user: TVerifyLoginApiCallResponse) => {
  try {
    const response = await apiRequest({
      apiEndpoint,
      path: EUserApiPath.profile,
      options: {
        method: 'GET',
        headers: {
          Authorization: `${user.TokenType} ${user.AccessToken}`,
        },
      },
    })
    return response
  } catch (error) {
    return ''
  }
}

// ------------------deleteLoanRequest
enum EDeleteUserResponseStatus {
  ERROR = 'ERROR',
  SUCCESS = 'USER_DELETED',
}
export const deleteLoanRequestApiCall = async ({username, password}: {username: string, password: string}) => {
  try {
    const token = await getRecapchaToken('')
    // eslint-disable-next-line no-debugger
    debugger
    const response = (await apiRequest({
      apiEndpoint,
      path: `${EUserApiPath.delete}/${username}`,
      options: {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
        body: JSON.stringify({ password }),
      },
    })) as { status: EDeleteUserResponseStatus; error?: string }

    return response
  } catch (error) {
    throw error
  }
}

// Original
// export const loginApiCall = async (
//   data: TLoginApiCallPayload,
// ): Promise<TLoginApiCallResponse> => {
//   try {
//     const token = await getRecapchaToken('')
//     console.log(token)
    
//     const response = await apiRequest({
//       apiEndpoint,
//       path: EUserApiPath.login,
//       options: {
//         method: 'POST',
//         headers: {
//           Authorization: `${token}`,
//         },
//         body: JSON.stringify({ ...data }),
//       },
//     })

//     if (Object.prototype.hasOwnProperty.call(response, 'AccessToken')) {
//       console.log('login - token: ', response.AccessToken)
//       return response
//     } else {
//       const { message, status } = await response.json()
//       throw new Error(`${response.status}: ${message ? message : status}`)
//     }
//   } catch (error) {
//     throw error
//   }
// }

// OLD
// ----------------signUp
enum ESignUpResponseStatus {
  ERROR = 'ERROR',
  SUCCESS = 'SIGNUP_DONE',
}
export const signUpApiCall = async (data: TSignUpApiCallPayload) => {
  try {
    const token = await getRecapchaToken('')

    console.log('signUpApiCall: ', token)

    const response = await apiRequest({
      apiEndpoint,
      path: EUserApiPath.signUp,
      options: {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
        body: JSON.stringify({ ...data }),
      },
    })
    console.log(response)
    if (
      response.message &&
      response.message === ESignUpResponseStatus.SUCCESS
    ) {
      return ESignUpResponseStatus.SUCCESS
    } else {
      throw new Error(`${response.status}: ${ESignUpResponseStatus.ERROR}`)
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}


// User Management
// ----------------verify
export const verifyUserApiCall = async (data: TVerifyApiCallPayload) => {
  try {
    const token = await getRecapchaToken('')
    console.log(token)
    const response = await apiRequest({
      apiEndpoint,
      path: EUserApiPath.verify,
      options: {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
        body: JSON.stringify({ ...data }),
      },
    })
    if (response === 'User signed up successfully.') {
      return response
    } else {
      const { message, status } = await response.json()
      throw new Error(`${response.status}: ${message ? message : status}`)
    }
  } catch (error) {
    throw error
  }
}
// ----------------forgotPassword
export const forgotPasswordUserApiCall = async (username: string) => {
  try {
    const token = await getRecapchaToken('')
    console.log(token)
    const response = await apiRequest({
      apiEndpoint,
      path: EUserApiPath.forgotPassword,
      options: {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
        body: JSON.stringify({ username }),
      },
    })

    if (response.status === 200) {
      return response
    } else {
      const { message, status } = await response.json()
      throw new Error(`${response.status}: ${message ? message : status}`)
    }
  } catch (error) {
    throw error
  }
}
// ----------------delete
// enum EDeleteUserResponseStatus {
//   ERROR = 'ERROR',
//   SUCCESS = 'USER_DELETED',
// }
export const deleteUserApiCall = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  try {
    const token = await getRecapchaToken('')
    // eslint-disable-next-line no-debugger
    debugger
    const response = (await apiRequest({
      apiEndpoint,
      path: `${EUserApiPath.delete}/${username}`,
      options: {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
        body: JSON.stringify({ password }),
      },
    })) as { status: EDeleteUserResponseStatus; error?: string }

    return response
  } catch (error) {
    throw error
  }
}

// Profile
// ----------------profile
export const getProfileApiCall = async (user: TLoginApiCallResponse) => {
  try {
    const response = await apiRequest({
      apiEndpoint,
      path: EUserApiPath.profile,
      options: {
        method: 'GET',
        headers: {
          // @ts-expect-error  old interface - not in use file deprected 
          Authorization: `${user.TokenType} ${user.AccessToken}`,
        },
      },
    })
    return response
  } catch (error) {
    return ''
  }
}

// ----------------updateProfile
export const updateProfileApiCall = async (
  data: TProfileApiCallPayload,
  user: TLoginApiCallResponse,
) => {
  try {
    // @ts-expect-error  old interface - not in use file deprected 
    console.log('updateProfileApiCall: ', user.AccessToken)
    const response = await apiRequest({
      apiEndpoint,
      path: EUserApiPath.updateProfile,
      options: {
        method: 'POST',
        headers: {
          // 'transaction-id': uuidv4(),
          // @ts-expect-error  old interface - not in use file deprected 
          Authorization: `${user.TokenType} ${user.AccessToken}`,
        },
        body: JSON.stringify({ ...data }),
      },
    })
    return response.message
  } catch (error) {
    throw error
  }
}
// ----------------addLead
export const addLeadApiCall = async (payload: TAddLeadApiCallPayload) => {
  try {
    const token = await getRecapchaToken('')
    console.log(token)
    const response = await apiRequest({
      apiEndpoint,
      path: EUserApiPath.addLead,
      options: {
        method: 'POST',
        headers: {
            Authorization: `${token}`,
          // Token: token
        },
        body: JSON.stringify({ ...payload }),
      },
    })
    console.log(response)
    return response
  } catch (error) {
    throw error
  }
}
