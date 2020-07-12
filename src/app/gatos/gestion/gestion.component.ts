import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import {Gato} from '../models/gato';
import {GatoService} from '../service/gato.service';
import { faTimes, faPencilAlt, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html'
})
export class GestionComponent implements OnInit {

  public titulo: string = 'Gestion de gatos';
  public gato: Gato = new Gato();
  public iconCancel = faTimes;
  public iconEdit = faPencilAlt;
  public iconAdd = faPlus;
  public iconUpload = faUpload;
  public opcionCrear:boolean = false;
  public modal:boolean = false;

  constructor(private gatoService: GatoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.gatoService.buscarGato(id).subscribe( (gato) => this.gato = gato);
        this.opcionCrear = true;
      }
    })
    this.gatoService.notificador.subscribe(response => {
        if(response.id == this.gato.id){
          this.gato.foto = response.foto;
      }
    });
  }

  public registrarGato(gatoFormulario): void{

    if(gatoFormulario.form.valid && this.gato !== null){
      this.gato.foto = this.gatoService._url;
      this.gatoService.registrarGato(this.gato).subscribe(
        _response =>{
          this.router.navigate(['/gatos'])
          this.gatoService.notificador.emit(this.gato);
          swal.fire('Gato almacenado correctamente',`El gato ${this.gato.nombre} ahora pertenece a este registro`,'success')
        }
      )
    }else{
      swal.fire('Error',`Los campos deben estar llenos`,'error')
    }
  }

  public editarGato(): void{
    this.gato.foto = this.gatoService._url;
    this.gatoService.editarGato(this.gato).subscribe(
      _response =>{
        this.router.navigate(['/gatos'])
        this.gatoService.notificador.emit(this.gato);
        swal.fire('Informacion actualizada',`La información del gato ${this.gato.nombre} se ha actualizado correctamente!`,'success')
      }
    )
  }

  public verFavoritos(): void{
    this.modal = this.gatoService.abrirModal() ;
  }

}
