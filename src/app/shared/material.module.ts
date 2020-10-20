import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { from } from 'rxjs';
//import {MaterialModule} from '@angular/material/';
const modules=[
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports:[
    ...modules
  ]
})
export class MaterialModule { }
