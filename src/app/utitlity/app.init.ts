import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService):()=> Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: 'http://35.153.66.52/auth',
          realm: 'nuxeo',
          clientId: 'meeting-web'
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html'
        },
        // loadUserProfileAtStartUp:true 
      });
  }