import { Component, Input, OnInit } from '@angular/core';
import { HttpapiService } from 'src/app/service/httpapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewdata',
  templateUrl: './viewdata.component.html',
  styleUrls: ['./viewdata.component.scss']
})
export class ViewdataComponent implements OnInit
{

	@Input('arrFromParent')
	myProdData:any;

	@Input('searchQueryDto')
	searchQueryDto:any;
	
	products:any=[];
	prevObj:any=[];
	


	

	ngOnInit(): void {
		this.products = this.myProdData;
		this.products.forEach(val => this.prevObj.push(Object.assign({}, val)));
	}

	constructor(
		private httpapi:HttpapiService)
	{  
	}  


	onRowEditInit(prod: any,index: number) {
		console.log(prod);
		console.log('Edit Init Event Called');
		//this.clonedProducts[product.id] = { ...product };
	  }
	
	  onRowEditSave(prod: any) {
		console.log(prod);
		console.log('Edit Save Event Called');
		this.httpapi.updateData(prod).subscribe(
			(res)=>{
			  console.log(JSON.stringify(res.data));
			  Swal.fire(
				'Price value is updated',
				'',
				'success'
			  );
			}
		  );  
	   
	  }
	
	  onRowEditCancel(prod: any, index: number) {
		console.log(prod);
		prod = this.prevObj[index];
		this.products[index] = this.prevObj[index];
		console.log('Edit Cancel Event Called');
	  }
 }


 