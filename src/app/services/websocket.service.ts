import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

public socketStatus:boolean = false;
public usuario!: Usuario;
public dato:string = '';

  constructor(
    private socket: Socket
  ) {
    this.cargarStorage();
    this.checkStatus();
   }


  checkStatus(){
    this.socket.on('connect', () =>{
      console.log('cliente conectado!!');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () =>{
      console.log('cliente desconectado!! :(');
      this.socketStatus = false;
    });
  }

  emit(evento:string, data?:any, callback?:Function){
    console.log('emitiendo evento: ',evento)
    this.socket.emit(evento,data,callback);
  }

  //escucha cualquier evento
  listen(evento:string){
    console.log('listen: ',evento);
    return this.socket.fromEvent(evento);//.pipe(map((data) => data));
  }

  loginWebService(nombre:string){
    return new Promise<void>((resolve, reject) =>{
      this.emit('configurar-usuario', {nombre}, () => {
        this.usuario = new Usuario (nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  getUsuario(){
    return this.usuario;
  }

  guardarStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario))
  }

  cargarStorage(){
    if(localStorage.getItem('usuario')){
      this.dato = localStorage.getItem('usuario') + '';
        this.usuario = JSON.parse(this.dato);
        this.loginWebService(this.usuario.nombre);
    }
  }
}
