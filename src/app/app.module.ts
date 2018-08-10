import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AppRoutingModule } from "./app.routing";
import { RoomsModule } from "./rooms/rooms.module";
import { DevicesModule } from "./devices/devices.module";
import { HomeModule } from "./home/home.module";
import { AppMaterialModule } from "./app.material.module";

@NgModule({
  declarations: [AppComponent, MainNavComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppMaterialModule,
    AppRoutingModule,
    RoomsModule,
    DevicesModule,
    HomeModule
  ],
  entryComponents: [],
  providers: [
    // { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
