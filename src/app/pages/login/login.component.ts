import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre='';
  name:any;
  finalname='';
  constructor(
    public wsService: WebsocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ingresar(){
    this.name = this.nombre.split('');
    if(this.name != null && this.name.length != 0){
      for(let i = 0; i < this.name.length; i++){
        if(this.name[i] != ' '){
          this.finalname = this.finalname + this.name[i];
        } 
      }
      console.log('|'+ this.finalname +'|');
      this.nombre = this.finalname.toString();
      console.log(this.nombre);
      this.wsService.loginWebService(this.finalname).then(() =>{
        console.log('ingreso!!!');
        this.router.navigateByUrl('/mensajes');
      });
      this.finalname='';
    }
  }
}
