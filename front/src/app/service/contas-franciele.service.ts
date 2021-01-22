import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ContasFranciele } from '../model/contas-franciele-model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3001/api/contas/franciele';

@Injectable({
  providedIn: 'root'
})
export class ContasFrancieleService {
  selectContaFranciele: ContasFranciele = {
  _id: '',
  descricao: '',
  detalhe: '',
  valor: '',
  vencimento: '',
  parcela: '',
  status: ''
  };

  contas: ContasFranciele[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getContasFranciele(): Observable<ContasFranciele[]> {
    return this.http.get<ContasFranciele[]>(`${apiUrl}` + '/listar')
      .pipe(
        tap(contas => console.log('Contas listadas!')),
        catchError(this.handleError('getContasFranciele', []))
      );
  }

  getContasFrancieleById(id: string): Observable<ContasFranciele> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ContasFranciele>(url).pipe(
      tap(_ => console.log(`Conta id=${id}`)),
      catchError(this.handleError<ContasFranciele>(`getContasFrancieleById id=${id}`))
    );
  }

  addContaFranciele(contas: ContasFranciele): Observable<ContasFranciele> {
    return this.http.post<ContasFranciele>(apiUrl + '/cadastrar', contas, httpOptions).pipe(
      tap((s: ContasFranciele) => console.log(`Conta cadastrada w/ id=${s._id}`)),
      catchError(this.handleError<ContasFranciele>('addContaFranciele'))
    );
  }

  updateContaFranciele(contas: ContasFranciele): Observable<any> {
    const url = `${apiUrl}/${contas._id}`;
    return this.http.put(url, contas, httpOptions).pipe(
      tap(_ => console.log(`Conta atualizada: id=${contas._id}`)),
      catchError(this.handleError<any>('updateContaFranciele'))
    );
  }

  deleteContaFranciele(id: string): Observable<ContasFranciele> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<ContasFranciele>(url, httpOptions).pipe(
      tap(_ => console.log(`Conta deletada: id=${id}`)),
      catchError(this.handleError<ContasFranciele>('deleteContaFranciele'))
    );
  }
}
