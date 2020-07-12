import { Component, OnInit } from '@angular/core';
import {Imagen} from './models/imagen';
import {ImagenService} from './service/imagen.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {GatoService} from '../gatos/service/gato.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html'
})
export class ImagenesComponent implements OnInit {

  public imagenes: Imagen[];
  public favoriteIcon= faHeart;
  public favoritos:Array<Imagen> = []
  constructor(private imagenService: ImagenService,
              private gatoService: GatoService) { }

  ngOnInit(): void {
    this.imagenService.listarImagenes().subscribe(response => this.imagenes = response);
  }

  public agregarFavorito(imagen: Imagen): void{
    this.favoritos.push(imagen);
    this.gatoService.marcadoFavorito(imagen).subscribe();
  }

  public tachadoFavorito(imagen: Imagen): boolean{
    if(this.favoritos.includes(imagen)){
      return true;
    }else{
      return false;
    }
  }

  public quitarFavorito(imagen: Imagen): void{
    let indice = this.favoritos.indexOf(imagen);
    this.favoritos.splice(indice);
  }

}
