import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/components/home/home.component";
import { RoomsComponent } from "./rooms/components/rooms/rooms.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { DevicesComponent } from "./devices/components/devices/devices.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "rooms",
    component: RoomsComponent
  },
  {
    path: "devices",
    component: DevicesComponent
  },
  {
    path: "404",
    component: NotFoundComponent
  },
  {
    path: "**",
    redirectTo: "/404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}