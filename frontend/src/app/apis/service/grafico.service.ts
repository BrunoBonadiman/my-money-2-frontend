import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Grafico } from '../model/grafico-model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
};
const apiUrl = 'https://my-money-2-backend.herokuapp.com/api/contas/grafico';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {
  selectDado: Grafico = {
  _id: '',
  valor: '',
  mes: '',
  ano: ''
  };

  grafico: Grafico[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getDados(): Observable<Grafico[]> {
    return this.http.get<Grafico[]>(`${apiUrl}` + '/listar', httpOptions)
      .pipe(
        tap(graficos => console.log('Dados listados!')),
        catchError(this.handleError('getDados', []))
      );
  }
  getDadosById(id: string): Observable<Grafico> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Grafico>(url).pipe(
      tap(_ => console.log(`Dado id=${id}`)),
      catchError(this.handleError<Grafico>(`getDadosById id=${id}`))
    );
  }

  addDado(grafico: Grafico): Observable<Grafico> {
    return this.http.post<Grafico>(apiUrl + '/cadastrar', grafico, httpOptions).pipe(
      tap((s: Grafico) => console.log(`Dado cadastrado w/ id=${s._id}`)),
      catchError(this.handleError<Grafico>('addDado'))
    );
  }

  updateDado(grafico: Grafico): Observable<any> {
    const url = `${apiUrl}/${grafico._id}`;
    return this.http.put(url, grafico, httpOptions).pipe(
      tap(_ => console.log(`Dado atualizado: id=${grafico._id}`)),
      catchError(this.handleError<any>('updateDado'))
    );
  }

  deleteDado(id: string): Observable<Grafico> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Grafico>(url, httpOptions).pipe(
      tap(_ => console.log(`Dado deletado: id=${id}`)),
      catchError(this.handleError<Grafico>('deleteDado'))
    );
  }
}
