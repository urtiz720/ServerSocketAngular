import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage(mensaje:string){
    const data = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    }
    this.wsService.emit('mensaje',data);
  }

  getMessage(){
    return this.wsService.listen('mensaje-nuevo');
  }

  getMessagePrivate(){
    return this.wsService.listen('mensaje-privado');
  }


}
