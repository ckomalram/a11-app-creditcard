export class tarjetaCredito {

  id?: string;
  titular: string;
  numeroTarjeta: string;
  fechaExpira: string;
  cvv: number;
  fechaCreacion: Date;
  fechaActualizar: Date;

  constructor(titular: string, numeroTarjeta: string, fechaExpira: string, cvv: number) {
    this.titular = titular;
    this.numeroTarjeta = numeroTarjeta;
    this.fechaExpira = fechaExpira;
    this.cvv = cvv;
    this.fechaCreacion = new Date();
    this.fechaActualizar = new Date();
  }

}
