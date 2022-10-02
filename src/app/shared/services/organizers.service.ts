import { Injectable } from '@angular/core';
import { catchError, from, Observable } from 'rxjs';
import { AppInfoService } from './app-info.service';
var Nuxeo = require('nuxeo')
var nuxeo = new Nuxeo({
  baseURL: 'http://35.153.66.52/nuxeo',
  auth: {
    method: 'bearerToken',
    token: localStorage.getItem('token')
  },
  headers: {
    properties: '*',
  },
});

@Injectable({
  providedIn: 'root'
})
export class OrganizersService {
  
  token: any
  constructor(private _AppInfoService: AppInfoService) {
    this._AppInfoService.authToken.subscribe((res) => {
      this.token = this._AppInfoService.authToken.getValue();
      nuxeo._auth.token = this.token;
    })
  }

  getOrganizers(): Observable<any> {
    return from(nuxeo.request('/search/pp/PP_Organizar/execute').get()).pipe(
      catchError((error) => {
        throw error
      })
    )
  }
  AddOrganizer(organizer: any): Observable<any> {
    return from(
      nuxeo
        .operation('/AC_UA_Organizer_Create')
        .context(organizer)
        .input('/')
        .execute()
    ).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
  updateOrganizer(organizer: any, uid: any): Observable<any> {
    return from(
      nuxeo
        .operation('/AC_UA_Organizer_Update')
        .context(organizer)
        .input(uid)
        .execute()
    ).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
  getOrganizerById(uid: any): Observable<any> {
    return from(nuxeo.request(`/id/${uid}`).get()).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  deleteOrganize(event: any): Observable<any> {
    return from(nuxeo.operation('/AC_UA_Organizer_Delete').input(event.id).execute()).pipe(
      catchError((error) => {
        throw error
      })
    )
  }
}
