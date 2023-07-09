// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return localStorage.removeItem(TokenKey)
}

const Msg = 'Admin-msg'
export function getMsg () {
  return localStorage.getItem(Msg)
}

export function setMsg (msg) {
  return localStorage.setItem(Msg, msg)
}

export function removeMsg () {
  return localStorage.removeItem(Msg)
}
