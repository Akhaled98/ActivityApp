import { Component, HostBinding, Inject, Renderer2 } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { KeycloakService } from 'keycloak-angular';
import config from 'devextreme/core/config';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { navigation } from './app-navigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }
  items: any

  constructor(private authService: AuthService,
    private _KeycloakService: KeycloakService,
    private screen: ScreenService,
    public appInfo: AppInfoService,
    public translate: TranslateService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    // const lang = localStorage.getItem('lang');
    // translate.setDefaultLang('en');
    // translate.use('en');
    // config({ rtlEnabled: false });
    // localStorage.setItem('isRtl', 'false');
    // localStorage.setItem('lang', 'en');


    this.appInfo.currentLang.subscribe(() => {
      const lang = localStorage.getItem('lang');
      if (lang == 'ar') {
        document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        this.renderer.addClass(this.document.body, 'rtl');
        this.renderer.addClass(this.document.body,'dx-rtl');
        translate.setDefaultLang('ar');
        // config({ rtlEnabled: true });
      } else {
        document.getElementsByTagName('html')[0].removeAttribute('dir');
        this.renderer.removeClass(this.document.body, 'rtl');
        this.renderer.removeClass(this.document.body,'dx-rtl');
        translate.setDefaultLang('en');
        // config({ rtlEnabled: false });
      }
    });
  }



  isAuthenticated() {
    // return this.authService.loggedIn;
    return this._KeycloakService.isLoggedIn;
  }
}
