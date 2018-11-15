import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { RoomsComponent } from './rooms/components/rooms/rooms.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DevicesComponent } from './devices/components/devices/devices.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rooms',
    component: RoomsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
