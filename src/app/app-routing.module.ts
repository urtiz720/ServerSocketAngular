import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioGuardService } from './guards/usuario-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

const appRouter: Routes = [
  { path:'', component: LoginComponent },
  { path:'mensajes',
   component: MensajesComponent,
   canActivate: [UsuarioGuardService]
  },
  /* Cualquier otro redirige */
  { path:'**', component: LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(appRouter) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
