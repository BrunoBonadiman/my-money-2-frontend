import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Contas } from '../model/contas-model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
};
const apiUrl = 'https://my-money-2-backend.herokuapp.com/api/contas';

@Injectable({
  providedIn: 'root'
})
export class ContasService {
  selectConta: Contas = {
  _id: '',
  descricao: '',
  valorTotal: '',
  vencimento: '',
  status: ''
  };

  contas: Contas[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getContas(): Observable<Contas[]> {
    debugger;
    return this.http.get<Contas[]>(`${apiUrl}` + '/listar', httpOptions)
      .pipe(
        tap(contas => console.log('Contas listadas!')),
        catchError(this.handleError('getContas', []))
      );
  }

  getContasById(id: string): Observable<Contas> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Contas>(url).pipe(
      tap(_ => console.log(`Conta id=${id}`)),
      catchError(this.handleError<Contas>(`getContasById id=${id}`))
    );
  }

  addConta(contas: Contas): Observable<Contas> {
    return this.http.post<Contas>(apiUrl + '/cadastrar', contas, httpOptions).pipe(
      tap((s: Contas) => console.log(`Conta cadastrada w/ id=${s._id}`)),
      catchError(this.handleError<Contas>('addConta'))
    );
  }

  updateConta(contas: Contas): Observable<any> {
    const url = `${apiUrl}/${contas._id}`;
    return this.http.put(url, contas, httpOptions).pipe(
      tap(_ => console.log(`Conta atualizada: id=${contas._id}`)),
      catchError(this.handleError<any>('updateConta'))
    );
  }

  deleteConta(id: string): Observable<Contas> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Contas>(url, httpOptions).pipe(
      tap(_ => console.log(`Conta deletada: id=${id}`)),
      catchError(this.handleError<Contas>('deleteConta'))
    );
  }
}
