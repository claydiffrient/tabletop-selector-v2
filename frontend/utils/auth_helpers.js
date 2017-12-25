import axios from "axios";
import jwtDecode from "jwt-decode";
const TOKEN_KEY = "TABLETOP_SELECTOR_TOKEN";

export function storeToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
  axios.defaults.headers.common["Authorization"] = null;
}

export function isAuthorized() {
  return window.localStorage.getItem(TOKEN_KEY) != null;
}

export function getDecoded() {
  return jwtDecode(window.localStorage.getItem(TOKEN_KEY));
}
