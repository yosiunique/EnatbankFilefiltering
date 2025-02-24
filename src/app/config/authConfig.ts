import {AuthConfig} from "angular-oauth2-oidc";
import { enviroment } from "../../enviroment/enviroment";

export const authConfig: AuthConfig = {
  // Url of the Identity Provider

  issuer: enviroment.ISSUER_URL,

  redirectUri: window.location.origin + "/home",

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: "frontend",
  responseType: "code",
  requireHttps: false,
  showDebugInformation: true,

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: "profile",
  //   scope : 'profile',
  timeoutFactor: 0.01,

  clearHashAfterLogin: false,
};