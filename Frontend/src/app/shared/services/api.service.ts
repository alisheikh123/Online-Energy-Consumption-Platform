import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
  token = localStorage.getItem('token');
  constructor(private router: Router, private http: HttpClient) {
  }
  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    }),
  };
  // Generic service of post for login
  private readonly AccountController: string = 'account';
  private readonly route: string = environment.API_URL_PREFIX + '/';  //"http://localhost:5009/api/";
  private readonly route2: string = environment.API2_URL_PREFIX;

  new(method: string, body: any) {
    if (method !== '') {
      return this.http.post<any>(this.route + method, body, this.httpOptions).pipe(
        map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));

          return user;
        })
      );
    } else {
      return HttpResponse;
    }
  }


  // for Post call
  async servicePost(method: string, body: any) {
    try {
      let url = this.route + method;
      let response: any = await firstValueFrom(
        this.http.post<HttpResponse<any>>(url, body, this.httpOptions)
      );
      return response;
    } catch (error) {
      return error;
    }
  }
  // for Get call
  async serviceGet(method: string) {
    try {
      let url = this.route.concat(method);
      let response: any = await firstValueFrom(this.http
        .get(url, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          }),
        }));

      return response;
    } catch (error) {
      return error
    }
  }
  async serviceGetConsumer(method: string) {
    try {
debugger
      let url = this.route2.concat('api/'+method);
      let response: any = await firstValueFrom(this.http
        .get(url, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          }),
        }));

      return response;
    } catch (error) {
      return error
    }
  }
  // for Get call
  async serviceCommonGet(method: string) {
    try {
      let url = this.route.concat(method);
      let response: any = await firstValueFrom(this.http
        .get(url, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          }),
        }));

      return response;
    } catch (error) {
      return error
    }
  }
  // for put call
  async servicePut(method: string, body: any) {
    try {
      let url = this.route + method;
      let response: any = await firstValueFrom(
        this.http.put<HttpResponse<any>>(url, body, this.httpOptions)
      );
      return response;
    } catch (error) {
      return error;
    }
  }
  // for Get call with query Params
  serviceGtQuery(method: string, keyName: string, arg: any) {
    try {
      if (method !== '') {
        let url = this.route + method;
        return this.http.get(url + '?' + keyName + '=' + arg);
      } else {
        return HttpResponse;
      }
    } catch (error) {
      return HttpResponse;
    }
  }
  // for Get call with query Params
  async serviceGetQueryParams(method: string) {
    try {
      if (method !== '') {
        let url = this.route.concat(method);
        let response: any = await firstValueFrom(this.http
          .get(url, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.token,
            }),
          }));
        return response
      } else {
        return HttpResponse;
      }
    } catch (error) {
      return HttpResponse;
    }
  }
  // To upload data like Email
  upload(method: string, file: any, emailForm: any, id_pk: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/pdf',
      }),
    };
    // Create form data
    const formData = new FormData();
    // Store form name as "file" with file data
    for (let index = 0; index < file.length; index++) {
      formData.append('file', file[index], file[index].name);
    }
    formData.append('id_Pk', id_pk);
    // Make http post request over api
    // with formData as req
    let url = this.route + method;
    return this.http.post(url, formData, httpOptions);
  }
  // To call report or any PDF Excel byte array
  publicReportFile(method: string): Observable<HttpEvent<Blob>> {
    let url = this.route + method;
    var token = localStorage.getItem('bearerToken');
    return this.http.request(
      new HttpRequest('GET', url.trim(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),
        reportProgress: true,
        responseType: 'blob',
      })
    );
  }

  // To download file directly from Api
  public downloadFileAPI(method: string, body: any): Observable<HttpEvent<Blob>> {
    let url = this.route + method;
    var token = localStorage.getItem('bearerToken');

    return this.http.request(
      new HttpRequest('GET', `${url}`, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }),
        reportProgress: true,
        responseType: 'blob',
      })
    );
  }
  // to remove record from database
  async serviceDelete(method: string) {
    try {
      let url = this.route + method;
      let response: any = await firstValueFrom(
        this.http.delete<HttpResponse<any>>(url, this.httpOptions)
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}
