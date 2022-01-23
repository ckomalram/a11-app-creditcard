import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { tarjetaCredito } from '../models/tarjetaCredito';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {

  loading: boolean = false;
  listaTarjetas: tarjetaCredito[] = [];

  constructor(private _tarjetaServices: TarjetaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this.loading = true;
    this._tarjetaServices.obtenerTarjetas().subscribe(data => {
      // console.log(data);
      this.listaTarjetas = [];
      this.loading = false;
      data.forEach((element: any) => {
        this.listaTarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
      });
      console.log(this.listaTarjetas);
    })
  }

  eliminarTarjeta(id: any) {
    this._tarjetaServices.eliminarTarjeta(id)
      .then(() => {
        this.toastr.success('Tarjeta Eliminada!', 'Se ha eliminado correctamente la tarjeta')

      }

        , error => {
          console.log(error);
          this.toastr.error('Error al Eliminar Tarjeta', 'Volver a Intentarlo...')
        })

  }

  editarTarjeta(tarjeta: tarjetaCredito){
      this._tarjetaServices.addTarjetaEdit(tarjeta);
  }

}
