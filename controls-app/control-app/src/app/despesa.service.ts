import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Despesa } from './despesa';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/despesas';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  constructor(private http: HttpClient) { }

  //retornar todas as despesas
  getDespesas (): Observable<Despesa[]> {
    return this.http.get<GetResponse>(apiUrl)
      .pipe(
        map(response => response._embedded.despesas),
        tap(produtos => console.log('leu as despesas')),
        catchError(this.handleError('getProdutos', []))
      );   
  }
  
  deleteDespesa (id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteDespesa'))
      );
  }

  addDespesa (despesa : Despesa): Observable<Despesa> {
    return this.http.post<Despesa>(apiUrl, despesa, httpOptions)
    .pipe(
      catchError(this.handleError('addDespesa', despesa))
    );
  }

  updateDespesa(despesa): Observable<any> {
    const id = despesa.id;
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, despesa, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${id}`)),
      catchError(this.handleError<any>('updateProduto'))
    );
  }

  //intercepta os erros caso ocorra
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}

interface GetResponse {
  _embedded: {
    despesas: Despesa[];
    _links: {self: {href: string}};
  };
}
