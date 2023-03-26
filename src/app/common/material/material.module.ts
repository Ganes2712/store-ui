import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'; 



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule
  ]
})
export class MaterialModule { }
