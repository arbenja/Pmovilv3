import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';

import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    QRCodeModule,  // Add this module to your imports.
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
