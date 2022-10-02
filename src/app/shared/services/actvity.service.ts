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

export class ActivityService {
  token: any
  constructor(private _AppInfoService: AppInfoService) {
    this._AppInfoService.authToken.subscribe((res) => {
      this.token = this._AppInfoService.authToken.getValue();
      nuxeo._auth.token = this.token;
    })
  }
  getEvent(): Observable<any> {
    return from(nuxeo.request('/search/pp/PP_Activity/execute').queryParams({ pageSize: 100 }).get()).pipe(
      catchError((error) => {
        throw error
      })
    )
  }
  getEventById(id: any): Observable<any> {
    return from(nuxeo.request(`/id/${id}`).get()).pipe(
      catchError((error) => {
        throw error
      })
    )
  }
  getEventAttatchmentById(id: any): Observable<any> {
    return from(
      nuxeo
        .request('/search/pp/PP_ActivityDAM/execute')
        .queryParams({
          pageProvider: 'PP_ActivityDAM',
          collectionMember_collectionIds: `["${id}"]`,
          pageSize: 35,
          currentPageIndex: 0,
        })
        .get()
    ).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
  addEvent(Event: any): Observable<any> {
    return from(nuxeo.operation('/AC_UA_Activity_Create').context(Event).execute()).pipe(
      catchError((error) => {
        throw error
      })
    )
  }
  updateEvent(Event: any): Observable<any> {
    return from(nuxeo.operation('/AC_UA_Activity_Update').context(Event).execute()).pipe(
      catchError((error) => {
        throw error
      })
    )
  }
  deleteEvent(event: any): Observable<any> {
    return from(nuxeo.operation('/AC_UA_Activity_Delete').input(event.id).execute()).pipe(
      catchError((error) => {
        throw error
      })
    )
  }
  uploadCover(file: any): Observable<any> {
    return from(nuxeo.batchUpload('/upload').upload({ file })).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
}
