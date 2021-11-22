import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private myAppUrl='https://localhost:44354/'
  private myApiUrl='api/List/'

  constructor(private http: HttpClient) { }

  getList(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  deleteItem(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }

  saveItem(item: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, item);
  }

  updateItem(id: Number, item: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, item)
  }
}
