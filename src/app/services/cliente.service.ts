import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string ="http://localhost:8080/api/clientes";

  constructor(private http : HttpClient) { }

  getClientes(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    
    if (sort) {
      params = params.set('sort', sort);
    }
  
    return this.http.get<any>(this.urlEndPoint, { params }).pipe(
      map(response => {
        return {
          clientes: response.content,
          totalElements: response.totalElements,
          totalPages: response.totalPages
        };
      })
    );
  }
  
     
}