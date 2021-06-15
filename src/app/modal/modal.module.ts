import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAComponent } from './modal-a/modal-a.component';
import {UserModule} from '../user/user.module';

@NgModule ( {
  imports: [
    CommonModule,
    UserModule
  ],
  declarations: [ ModalAComponent ],
  exports     : [ ModalAComponent ]
} )
export class ModalModule {
}
