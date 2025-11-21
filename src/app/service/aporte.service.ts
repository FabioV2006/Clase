import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Aporte} from '../model/Aporte';

@Injectable({
  providedIn: 'root'
})

export class AporteService {
  private url = 'http://localhost:8080/api/aportes';

  constructor(private http: HttpClient) { }

  listar(): Observable<Aporte[]> {
    return this.http.get<Aporte[]>(this.url);
  }

  insertar(aporte: Aporte): Observable<any> {
    return this.http.post<any>(this.url, aporte);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
