import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//Firebase
//https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
//Nueva ruta para firestore @angular/fire/firestore/
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore/';
import { environment } from 'src/environments/environment';

//Toast
//https://www.npmjs.com/package/ngx-toastr
//PAra angular 11 usar @13.2.1
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearTarjetaComponent } from './components/crear-tarjeta/crear-tarjeta.component';
import { ListarTarjetaComponent } from './components/listar-tarjeta/listar-tarjeta.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearTarjetaComponent,
    ListarTarjetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule, ReactiveFormsModule,AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
