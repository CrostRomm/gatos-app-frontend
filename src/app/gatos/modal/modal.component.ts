import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {Gato} from '../models/gato';
import {Imagen} from '../../imagenes/models/imagen';
import {GatoService} from '../service/gato.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public titulo: string = 'Fotos favoritas';
  public gato: Gato = new Gato();
  public imagen: Imagen;
  public imagenes: Imagen[];
  public fotoSeleccionada: boolean = false;

  constructor(public gatoService: GatoService) { }

  ngOnInit(): void {
    this.gatoService.listarFavoritas().subscribe(response => this.imagenes = response);
  }

  public cerrarModal():void{
      this.gatoService.cerrarModal();
  }

  public fotoEscogida(url: string):void{
    this.fotoSeleccionada = true;
    this.gatoService.cambiarImagen(url);
  }
}
