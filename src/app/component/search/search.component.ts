import { ColDef } from '@ag-grid-community/core';
import { HttpapiService } from './../../service/httpapi.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  
  constructor(private httpAPI:HttpapiService)
 { }

  searchForm :FormGroup;

  isSubmit:boolean = false;
  isDataLoaded:boolean = false;

  searchQueryDto:any;

  rowData:any=[];

  searchList =[
    {name:"Select field",value:null},
    {name:"Store Id",value:"sid"},
    {name:"SKU",value:"sku"},
    {name:"Product Name",value:"prodName"},
    {name:"Price",value:"price"},
    {name:"Created Date",value:"date"},
    {name:"Country Code",value:"countryCode"}
  ];

  operatorList =[
    {name:"Select Operator",value:null},
    {name:" > ",value:"GT"},
    {name:" < ",value:"LT"},
    {name:" >= ",value:"GTE"},
    {name:" <= ",value:"LTE"},
    {name:" != ",value:"NE"},
    {name:" = ",value:"E"}
  ];

  ngOnInit(): void {
    this.isSubmit= false;
    this.searchForm = new FormGroup({
      searchDD : new FormControl(this.searchList[0].value,[Validators.required, Validators.minLength(1)]),
      operatorDD : new FormControl(this.operatorList[0].value,[Validators.required, Validators.minLength(1)]),
      searchTxt : new FormControl('',Validators.required)
    });
  }

  get f(){
    return this.searchForm.controls;
  }


  onReset(){
    this.searchForm.reset();  
    this.isSubmit = false;
    this.isDataLoaded = true;
  }


  onSearch()
  {
    this.isSubmit= true;    
    this.isDataLoaded= false; 

    if (this.searchForm.valid) 
    {
      let StoreReqPageDto = {
        kvo:this.searchForm.controls['searchDD'].value
        +"~"+this.searchForm.controls['searchTxt'].value
        +"~"+this.searchForm.controls['operatorDD'].value,
        pageNo:null,
        pageSize:null,
        sortBy:null,
        sortType:null      
      }

      this.searchQueryDto = StoreReqPageDto
      console.log(JSON.stringify(StoreReqPageDto));

      this.httpAPI
      .getSearchData(StoreReqPageDto)
      .subscribe(
        (res) =>
        { 
          this.rowData= res['productList'];

          console.log("rowData#"+JSON.stringify(this.rowData));
          // let self = this;
          // setTimeout(()=>{
          //   self.isDataLoaded= true;
          //   console.log('timeout');
          // },10000
          // );
          console.log('api completed here');
          this.isDataLoaded =true;
          
        }
      );
    }else{
      /*Swal.fire(
        'Pls Enter Required Fields',
        '',
        'info'
      );*/
  }
}


  public columnDefs: ColDef[] = [
	  { field:'id', headerName: 'ID'},
	  { field:'sid', headerName: 'Store Id'},
	  { field:'countryCode', headerName: 'Country Code' },
	  { field:'sku', headerName: 'SKU' },
	  { field:'prodName', headerName: 'Product Name' },
	  { field:'price', headerName: 'Price'},
	  { field:'date', headerName: 'Created Date' }
	];
}