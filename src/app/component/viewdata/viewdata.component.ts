import { UpdateComponent } from './../update/update.component';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridReadyEvent, RowSelectedEvent } from '@ag-grid-community/core';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Isearchresdto } from 'src/app/model/Isearchresdto';
import { HttpapiService } from 'src/app/service/httpapi.service';

@Component({
  selector: 'app-viewdata',
  templateUrl: './viewdata.component.html',
  styleUrls: ['./viewdata.component.scss']
})
export class ViewdataComponent implements OnInit,OnChanges
{

	@Input('arrFromParent')
	myProdData:any;

	@Input('searchQueryDto')
	searchQueryDto:any;
	
	productData:any=[];

	gridApi:any;

	public columnDefs: ColDef[] = [
	  { field:'id', headerName: 'ID' },
	  { field:'sid', headerName: 'Store Id'},
	  { field:'countryCode', headerName: 'Country Code' },
	  { field:'sku', headerName: 'SKU' },
	  { field:'prodName', headerName: 'Product Name' },
	  { field:'price', headerName: 'Price'},
	  { field:'date', headerName: 'Created Date' }
	];
  
	public defaultColDef: ColDef = {
		editable: true,
		enableRowGroup: true,
		enablePivot: true,
		enableValue: true,
		sortable: true,
		resizable: true,
		filter: true,
		flex: 1,
		minWidth: 100,
	};

	public rowSelection: 'single' | 'multiple' = 'single';
	public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
	public pivotPanelShow: 'always' | 'onlyWhenPivoting' | 'never' = 'always';

	ngOnInit(): void {
		
		this.productData = this.myProdData;

	}

	constructor(
		private matdialog:MatDialog,
		private httpapi:HttpapiService)
	{  
		console.log('constructor#'+this.myProdData);
	}  

	ngOnChanges(changes: SimpleChanges): void 
	{
		//this.productData = this.myProdData;
		//console.log('ngOnChanges#'+JSON.stringify(this.productData));
	}
	
	onGridReady(params: GridReadyEvent)
	{
		this.gridApi = params.api;
		this.gridApi.sizeColumnsToFit();

	}

	
	rowSelectEvent(event: RowSelectedEvent) {
		let rowDto:Isearchresdto =this.gridApi.getSelectedRows()[0];
		let self = this;
		this.matdialog.open(UpdateComponent,
		{width:'100%',height:'100%',
		enterAnimationDuration:'1000ms',
		exitAnimationDuration:'1000ms',
		data:{'prodDto':rowDto,
			'viewCom':self},
		panelClass: 'bg-color'
	  	}
	  );
	}

	onSearch()
   {
	console.log('call from dialog compoenet');
      this.httpapi
      .getSearchData( this.searchQueryDto)
      .subscribe(
        (res) =>
        { 
          this.productData= res['productList'];  
        }
      );
    }
 }


 