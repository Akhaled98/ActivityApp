import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable()
export class AppInfoService {
  constructor() { }
  currentLang = new BehaviorSubject('ar');
  authToken = new BehaviorSubject(null);
  public get title() {
    return 'ActivityProject';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
