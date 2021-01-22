import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ContasBruno } from '../model/contas-bruno-model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3001/api/contas/bruno';

@Injectable({
  providedIn: 'root'
})

export class ContasBrunoService {
  selectContaBruno: ContasBruno = {
  _id: '',
  descricao: '',
  detalhe: '',
  valor: '',
  vencimento: '',
  parcela: '',
  status: ''
  };

  contas: ContasBruno[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getContasBruno(): Observable<ContasBruno[]> {
    return this.http.get<ContasBruno[]>(`${apiUrl}` + '/listar')
      .pipe(
        tap(contas => console.log('Contas listadas!')),
        catchError(this.handleError('getContasBruno', []))
      );
  }

  getContasBrunoById(id: string): Observable<ContasBruno> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ContasBruno>(url).pipe(
      tap(_ => console.log(`Conta id=${id}`)),
      catchError(this.handleError<ContasBruno>(`getContasBrunoById id=${id}`))
    );
  }

  addContaBruno(contas: ContasBruno): Observable<ContasBruno> {
    return this.http.post<ContasBruno>(apiUrl + '/cadastrar', contas, httpOptions).pipe(
      tap((s: ContasBruno) => console.log(`Conta cadastrada w/ id=${s._id}`)),
      catchError(this.handleError<ContasBruno>('addContaBruno'))
    );
  }

  updateContaBruno(contas: ContasBruno): Observable<any> {
    const url = `${apiUrl}/${contas._id}`;
    return this.http.put(url, contas, httpOptions).pipe(
      tap(_ => console.log(`Conta atualizada: id=${contas._id}`)),
      catchError(this.handleError<any>('updateContaBruno'))
    );
  }

  deleteContaBruno(id: string): Observable<ContasBruno> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<ContasBruno>(url, httpOptions).pipe(
      tap(_ => console.log(`Conta deletada: id=${id}`)),
      catchError(this.handleError<ContasBruno>('deleteContaBruno'))
    );
  }
}
