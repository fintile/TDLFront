import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private myAppUrl='https://localhost:44324/'
  private myApiUrl='api/Heroes/'

  constructor(private http: HttpClient) { }

  getListHeroes(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  deleteHeroe(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }

  saveHero(hero: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, hero);
  }

  updateHero(id: Number, hero: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, hero)
  }
}
