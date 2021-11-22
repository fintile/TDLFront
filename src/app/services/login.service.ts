import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private myAppUrl='https://localhost:44354/'
  private myApiUrl='api/Login/'

  constructor(private http: HttpClient) { }

  getLogin(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  getData(userName: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + userName)
  }


}