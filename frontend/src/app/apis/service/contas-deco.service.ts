import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ContasDeco } from '../model/contas-deco-model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')})
};
const apiUrl = 'https://my-money-2-backend.herokuapp.com/api/contas/deco';

@Injectable({
  providedIn: 'root'
})
export class ContasDecoService {
  selectContaDeco: ContasDeco = {
  _id: '',
  descricao: '',
  detalhe: '',
  valor: '',
  vencimento: '',
  parcela: '',
  status: ''
  };

  contas: ContasDeco[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getContasDeco(): Observable<ContasDeco[]> {
    return this.http.get<ContasDeco[]>(`${apiUrl}` + '/listar', httpOptions)
      .pipe(
        tap(contas => console.log('Contas listadas!')),
        catchError(this.handleError('getContasDeco', []))
      );
  }

  getContasDecoById(id: string): Observable<ContasDeco> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ContasDeco>(url).pipe(
      tap(_ => console.log(`Conta id=${id}`)),
      catchError(this.handleError<ContasDeco>(`getContasDecoById id=${id}`))
    );
  }

  addContaDeco(contas: ContasDeco): Observable<ContasDeco> {
    return this.http.post<ContasDeco>(apiUrl + '/cadastrar', contas, httpOptions).pipe(
      tap((s: ContasDeco) => console.log(`Conta cadastrada w/ id=${s._id}`)),
      catchError(this.handleError<ContasDeco>('addContaDeco'))
    );
  }

  updateContaDeco(contas: ContasDeco): Observable<any> {
    const url = `${apiUrl}/${contas._id}`;
    return this.http.put(url, contas, httpOptions).pipe(
      tap(_ => console.log(`Conta atualizada: id=${contas._id}`)),
      catchError(this.handleError<any>('updateContaDeco'))
    );
  }

  deleteContaDeco(id: string): Observable<ContasDeco> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<ContasDeco>(url, httpOptions).pipe(
      tap(_ => console.log(`Conta deletada: id=${id}`)),
      catchError(this.handleError<ContasDeco>('deleteContaDeco'))
    );
  }
}
