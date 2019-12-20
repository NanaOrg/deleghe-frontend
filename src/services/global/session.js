
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {config} from '@plugins/config'
import {SessionStorage} from 'quasar'


export const login = (landingUrl = window.location.hash) => {

  if (!config.global.isDevelopment) {
    let apiBaseUrl = config.global.envs.API_BASE_URL
    let publicPath = config.global.envs.PUBLIC_PATH
    // es: la-mia-salute/#/referti-online
    let publicUrl = `${publicPath}/${landingUrl}`
    let encodedPublicUrl = encodeURIComponent(publicUrl)
    let loginRedirectUrl = `${apiBaseUrl}/bff/login?landingUrl=${encodedPublicUrl}`
    console.debug('[Login] landing url:', landingUrl)
    console.debug('[Login] public url:', publicUrl)
    console.debug('[Login] redirect to:', loginRedirectUrl)

    try {
      // @NOTE: se il BFF è su un dominio diverso rispetto al Front-end => questa istruzione fallirà
      location.assign(loginRedirectUrl)
    } catch (e) {
      window.open(loginRedirectUrl, '_self')
    }
  }

}


export const logout = () => {

  // Al logout il session storage viene ripulito
  SessionStorage.clear()

  if (!config.global.isDevelopment) {
    let apiBaseUrl = config.global.envs.API_BASE_URL
    let loginRedirectUrl = `${apiBaseUrl}/bff/logout`
    console.debug('[Logout] redirect to:', {loginRedirectUrl})
    window.open(loginRedirectUrl, '_self')
  }

}

