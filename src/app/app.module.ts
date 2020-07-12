import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { environment } from './../environments/environment';
import { ImagenService } from './imagenes/service/imagen.service';
import { HeaderComponent } from './header/header.component';
import { GatosComponent } from './gatos/gatos.component';
import { GatoService } from './gatos/service/gato.service';
import { GestionComponent } from './gatos/gestion/gestion.component';
import { ModalComponent } from './gatos/modal/modal.component';

const routes: Routes = [
  {path: 'imagenes', component: ImagenesComponent},
  {path: '', redirectTo: '/imagenes', pathMatch: 'full'},
  {path: 'gatos', component: GatosComponent},
  {path: 'gatos/gestion', component: GestionComponent},
  {path: 'gatos/gestion/:id', component: GestionComponent},
  //{path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ImagenesComponent,
    HeaderComponent,
    GatosComponent,
    GestionComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ImagenService,GatoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
