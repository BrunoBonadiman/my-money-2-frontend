import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ContasPenha } from '../model/contas-penha-model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3001/api/contas/penha';

@Injectable({
  providedIn: 'root'
})
export class ContasPenhaService {
  selectContaPenha: ContasPenha = {
  _id: '',
  descricao: '',
  detalhe: '',
  valor: '',
  vencimento: '',
  parcela: '',
  status: ''
  };

  contas: ContasPenha[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getContasPenha(): Observable<ContasPenha[]> {
    return this.http.get<ContasPenha[]>(`${apiUrl}` + '/listar')
      .pipe(
        tap(contas => console.log('Contas listadas!')),
        catchError(this.handleError('getContasPenha', []))
      );
  }

  getContasPenhaById(id: string): Observable<ContasPenha> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ContasPenha>(url).pipe(
      tap(_ => console.log(`Conta id=${id}`)),
      catchError(this.handleError<ContasPenha>(`getContasPenhaById id=${id}`))
    );
  }

  addContaPenha(contas: ContasPenha): Observable<ContasPenha> {
    return this.http.post<ContasPenha>(apiUrl + '/cadastrar', contas, httpOptions).pipe(
      tap((s: ContasPenha) => console.log(`Conta cadastrada w/ id=${s._id}`)),
      catchError(this.handleError<ContasPenha>('addContaPenha'))
    );
  }

  updateContaPenha(contas: ContasPenha): Observable<any> {
    const url = `${apiUrl}/${contas._id}`;
    return this.http.put(url, contas, httpOptions).pipe(
      tap(_ => console.log(`Conta atualizada: id=${contas._id}`)),
      catchError(this.handleError<any>('updateContaPenha'))
    );
  }

  deleteContaPenha(id: string): Observable<ContasPenha> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<ContasPenha>(url, httpOptions).pipe(
      tap(_ => console.log(`Conta deletada: id=${id}`)),
      catchError(this.handleError<ContasPenha>('deleteContaPenha'))
    );
  }
}
