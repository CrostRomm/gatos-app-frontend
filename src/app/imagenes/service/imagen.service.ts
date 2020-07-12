import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment'
import {Imagen} from '../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService{

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  listarImagenes(): Observable<any> {
    return this.http.get(environment.urlApi+'imagenes').pipe(
      map(response => response as Imagen[])
    );
  }
}
