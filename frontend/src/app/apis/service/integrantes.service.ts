import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Integrantes } from '../model/integrantes-model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
};
const apiUrl = 'https://my-money-2-backend.herokuapp.com/api/contas/integrantes';
@Injectable({
  providedIn: 'root'
})
export class IntegrantesService {
  selectIntegrante: Integrantes = {
  _id: '',
  integrante1: '',
  integrante2: '',
  integrante3: '',
  integrante4: ''
  };

  integrantes: Integrantes[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getIntegrantes(): Observable<Integrantes[]> {
    return this.http.get<Integrantes[]>(`${apiUrl}` + '/listar', httpOptions)
      .pipe(
        tap(integrantes => console.log('Integrantes listados!')),
        catchError(this.handleError('getIntegrantes', []))
      );
  }

  getIntegrantesById(id: string): Observable<Integrantes> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Integrantes>(url).pipe(
      tap(_ => console.log(`Integrante id=${id}`)),
      catchError(this.handleError<Integrantes>(`getIntegrantesById id=${id}`))
    );
  }

  addIntegrantes(integrantes: Integrantes): Observable<Integrantes> {
    return this.http.post<Integrantes>(apiUrl + '/cadastrar', integrantes, httpOptions).pipe(
      tap((s: Integrantes) => console.log(`Integrante cadastrado w/ id=${s._id}`)),
      catchError(this.handleError<Integrantes>('addIntegrantes'))
    );
  }

  updateIntegrante(integrantes: Integrantes): Observable<any> {
    const url = `${apiUrl}/${integrantes._id}`;
    return this.http.put(url, integrantes, httpOptions).pipe(
      tap(_ => console.log(`Integrante atualizado: id=${integrantes._id}`)),
      catchError(this.handleError<any>('updateIntegrante'))
    );
  }

  deleteIntegrante(id: string): Observable<Integrantes> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Integrantes>(url, httpOptions).pipe(
      tap(_ => console.log(`Integrante deletado: id=${id}`)),
      catchError(this.handleError<Integrantes>('deleteIntegrante'))
    );
  }
}
