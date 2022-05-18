import { MessageService } from './message.service';
import { Hero } from './Hero';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private url = 'http://localhost:3000/heroes';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'opertaion', result?: T) {
    return (error: any) => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message: string):void {
    this.messageService.add(message);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url).pipe(
      tap(() => this.log('HeroService: fetched heroes')),
      catchError(this.handleError<Hero[]>(this.getHeroes.name, []))
    )
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.url}/${id}`).pipe(
      tap(() => this.log(`HeroService: get hero by id: ${id}`)),
      catchError(this.handleError<Hero>(this.getHero.name))
    )
  }

  updateHero(hero: Hero):Observable<Hero> {
    return this.http.put<Hero>(`${this.url}/${hero.id}`, hero, this.httpOptions).pipe(
      tap(() => this.log(`HeroService: updated hero by id: ${hero.id}`)),
      catchError(this.handleError<Hero>(this.updateHero.name))
    )
  }

  addHero(hero :Hero):Observable<Hero> {
    return this.http.post<Hero>(this.url, hero, this.httpOptions).pipe(
      tap((newHero: Hero) =>
        this.log(`HeroService: add new hero: ${newHero.id}: ${newHero.name}`)
      ),
      catchError(this.handleError<Hero>(this.addHero.name))
    )
  }

  removeHero(hero: Hero): Observable<Hero> {
    return this.http.delete<Hero>(`${this.url}/${hero.id}`).pipe(
      tap(() => this.log(`HeroService: deleted hero: ${hero.id}`)),
      catchError(this.handleError<Hero>(this.removeHero.name))
    )
  }
}
