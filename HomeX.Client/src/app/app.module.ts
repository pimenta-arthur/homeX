import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatBadgeModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app.routing';
import { RoomsModule } from './rooms/rooms.module';
import { DevicesModule } from './devices/devices.module';
import { HomeModule } from './home/home.module';
import { AppMaterialModule } from './app.material.module';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { ProfileModule } from './profile/profile.module';
import { DevicesService } from './devices/shared/devices.service';

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
    HomeModule,
    MatBadgeModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ProfileModule
  ],
  entryComponents: [],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
