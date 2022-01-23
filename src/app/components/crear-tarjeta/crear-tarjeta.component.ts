import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { tarjetaCredito } from '../models/tarjetaCredito';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
  titulo: string = 'Crear Tarjeta';
  form: FormGroup;
  loading: boolean= false;
  id: string | undefined;

  constructor(private fb: FormBuilder, private _tarjetaService: TarjetaService, private toastr: ToastrService) {
    this.form = this.fb.group({
      titular: ['', [Validators.required, Validators.maxLength(80), Validators.minLength(5)]],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      fechaExpira: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }

  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe(data => {
      console.log(data);
      this.titulo= 'Editar Tarjeta';
      this.id= data.id;
      this.form.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpira: data.fechaExpira,
        cvv: data.cvv,
      });
    });
  }

  guardarTarjeta() {

    if (this.id === undefined) {
      //Crear trjeta
      this.agregarTarjeta();
    }else{
      //Editar Actualziar Tarjeta
      this.editarTarjeta(this.id);
    }

  }

  agregarTarjeta(){
      // console.log(this.form);
      const TARJETA: tarjetaCredito = {
        titular: this.form.value.titular,
        numeroTarjeta: this.form.value.numeroTarjeta,
        fechaExpira: this.form.value.fechaExpira,
        cvv: this.form.value.cvv,
        fechaCreacion: new Date(),
        fechaActualizar: new Date(),
      };
      // console.log(TARJETA);
      this.loading= true;
      this._tarjetaService.guardarTarjeta(TARJETA)
      .then(() => {
        this.loading=false;
         console.log('Tarjeta Registrada');
         this.toastr.success('Tarjeta Registrada!', 'Registro exitoso')
         this.form.reset();
         }
         , error => {
          console.log('Error al Registrar Tarjeta en Firestore!');
          this.toastr.success('Error al Registrar Tarjeta', 'Registro Fallido')
          this.loading=false;
          console.log(error);
        });
  }

  editarTarjeta(id: string){
    const TARJETA: any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpira: this.form.value.fechaExpira,
      cvv: this.form.value.cvv,
      fechaActualizar: new Date(),
    };
    this.loading= true;
    this._tarjetaService.editarTarjeta(id, TARJETA).then(() => {
      this.loading= false;
      this.titulo= 'Crear Tarjeta';
      this.form.reset();

      this.id = undefined;

      this.toastr.info('Tarjeta Actualziada con exito.', 'Registro Actualziado.');


    }, error => {
      this.loading= false;
    })
  }

}
