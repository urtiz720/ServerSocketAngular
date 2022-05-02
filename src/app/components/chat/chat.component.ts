import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnDestroy, AfterContentInit {
  texto: string = '';
  msgSubscription: Subscription = new Subscription;
  mensajes: any[] = [];
  elemento: any = HTMLElement;

  constructor(
    public chatService: ChatService,
    public wsWebService: WebsocketService
  ) { }

  ngAfterContentInit() {
    this.elemento = document.getElementById('chat-mensajes');
    this.msgSubscription = this.wsWebService.listen('mensaje-nuevo').subscribe( msg => {
      console.log('chat: ',msg);
      this.mensajes.push( msg );

      setTimeout(()=>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },50)
    });
    console.log(this.msgSubscription);
  }

  ngOnDestroy(){
    this.msgSubscription.unsubscribe();
  }

  send(){
    if(this.texto.trim().length === 0){
      return
    } 

    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }
}
