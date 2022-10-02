import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { AppInfoService } from './shared/services';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeycloakGuard extends KeycloakAuthGuard {
  token: any

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private _AppInfoService: AppInfoService
  ) {
    super(router, keycloak);
    this.token = this.keycloak.getToken();
    localStorage.setItem('token', this.token?.__zone_symbol__value);
    this._AppInfoService.authToken.next(this.token?.__zone_symbol__value) 
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (!this.authenticated) {
      localStorage.setItem('lang', 'ar');
      this._AppInfoService.currentLang.next('ar');
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    const requiredRoles = route.data['roles'];

    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    return requiredRoles.every((role) => this.roles.includes(role));
  }
}