import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { tarjetaCredito } from '../components/models/tarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private tarjeta$ = new Subject<any>();

  constructor(private firestore: AngularFirestore) { }

  guardarTarjeta(tarjeta: tarjetaCredito): Promise<any> {
    return this.firestore.collection('tarjetas').add(tarjeta);

  }

  obtenerTarjetas(): Observable<any> {
    return this.firestore.collection('tarjetas', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarTarjeta(id: string): Promise<any>{
    return this.firestore.collection('tarjetas').doc(id).delete();
  }

  editarTarjeta(id:string, tarjeta:any): Promise<any>{
    return this.firestore.collection('tarjetas').doc(id).update(tarjeta);
  }

  addTarjetaEdit(tarjeta: tarjetaCredito){
    this.tarjeta$.next(tarjeta);
  }

  getTarjetaEdit(): Observable<tarjetaCredito>{
    return this.tarjeta$.asObservable();
  }


}
