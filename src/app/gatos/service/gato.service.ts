import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import {environment} from '../../../environments/environment'
import {Gato} from '../models/gato';
import {Imagen} from '../../imagenes/models/imagen';

@Injectable({
  providedIn: 'root'
})
export class GatoService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  public modal: boolean = false;
  public _url: string;
  public _notificador = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

    public get notificador(): EventEmitter<any>{
      return this._notificador;
    }

    public listarGatos(): Observable<any> {
      return this.http.get(environment.urlApi+'gatos').pipe(
        map(response => response as Gato[]));
    }

    public buscarGato(id): Observable<Gato>{
      return this.http.get<Gato>(`${environment.urlApi}gatos/${id}`).pipe(
        catchError(e => {
          return throwError(e);
        })
      );
    }

    public registrarGato(gato: Gato) : Observable<Gato> {
      return this.http.post<Gato>(environment.urlApi+'gatos',gato,{headers: this.httpHeaders}).pipe(
        catchError(e => {
          if(e.status == 400){
            return throwError(e);
          }
          console.log(e.error.message);
          swal.fire("Error al crear",'Todos los campos deben estar diligenciados correctamente','error');
          return throwError(e);
        })
      );
    }

    public editarGato(gato: Gato): Observable<Gato>{
      return this.http.put<Gato>(`${environment.urlApi}gatos/${gato.id}`,gato).pipe(
        catchError( e => {
          if(e.status == 400){
            swal.fire('Error al editar',e.error.message,'error');
            return throwError(e);
          }
          return throwError(e);
        }));
    }

    public eliminarGato(id: string): Observable<Gato> {
      return this.http.delete<Gato>(`${environment.urlApi}gatos/${id}`).pipe(
        catchError( e => {
          return throwError(e);
        }));
    }

    public abrirModal(): boolean{
      this.modal = true;
      return true;
    }

    public cerrarModal(): boolean{
      this.modal = false;
      return false;
    }

    public marcadoFavorito(imagen: Imagen): Observable<Imagen>{
      return this.http.post<Imagen>(environment.urlApi+'imagenes/favoritos',imagen,{headers: this.httpHeaders}).pipe(
        catchError(e => {
          if(e.status == 400){
            return throwError(e);
          }
          console.log(e.error.message);
          swal.fire("Error marcar favorito",'Se presento un error en el proceso','error');
          return throwError(e);
        })
      );
    }

    public listarFavoritas(): Observable<Imagen[]>{
      return this.http.get<Imagen[]>(environment.urlApi+'imagenes/favoritos').pipe(
        map(response => response as Imagen[]));
    }

    public cambiarImagen(url: string):void{
      this._url = url;
    }
}
