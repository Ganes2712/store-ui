import { ViewdataComponent } from './../viewdata/viewdata.component';
import { Isearchresdto } from 'src/app/model/Isearchresdto';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpapiService } from 'src/app/service/httpapi.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit{



  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
   private Ref: MatDialogRef<UpdateComponent>,
   private httpapi:HttpapiService)
   {
   }

  productDto: Isearchresdto;
  isSubmit:boolean = false;
  oldval:any;
  newval:number;
  viewComponent:any;

  ngOnInit(): void {
    this.productDto = this.data.prodDto;
    this.viewComponent = this.data.viewCom;
    this.isSubmit= false;
    this.oldval = this.productDto.price;
    this.newval = this.productDto.price;
  }

  updatePrice()
  {
    console.log(this.oldval +"#"+this.newval);
    if(this.oldval!=this.newval){
      
      this.productDto.price = this.newval;
      this.httpapi.updateData(this.productDto).subscribe(
        (res)=>{
          console.log(JSON.stringify(res.data));
          Swal.fire(
            'Price value is updated',
            '',
            'success'
          );
          this.viewComponent.onSearch();
          this.Ref.close("");  
        }
      );     

    }else{
      Swal.fire(
        'Value are same.. Pls update',
        '',
        'info'
      );
    }
  }

  Closepopup(){
    this.Ref.close("");
  }

}
