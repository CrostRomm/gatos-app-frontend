import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import {Gato} from './models/gato';
import {GatoService} from './service/gato.service';
import { faTrash, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gatos',
  templateUrl: './gatos.component.html'
})
export class GatosComponent implements OnInit {

  public titulo: string = 'Lista de gatos';
  public gatos: Gato[];
  public iconEdit=faPencilAlt;
  public iconDelete=faTrash;
  public iconNew=faPlus;
  constructor(private activatedRoute: ActivatedRoute,
              private gatoService: GatoService) { }

  ngOnInit(): void {
    this.gatoService.listarGatos().subscribe(response => this.gatos = response);
  }

  public borrarGato(gato: Gato): void{
    swal.fire({
      title: '¿Esta seguro?',
      text: `Si hace esto el gato ${gato.nombre} sera sacado del sistema`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.gatoService.eliminarGato(gato.id).subscribe(
          () =>{
              this.gatos = this.gatos.filter(cat => cat !== gato);
              swal.fire(
                'Gato sacado!',
                `El gato ${gato.nombre} fue sacado del sistema`,
                'success'
              )
          });
      }
    })
  }
}
