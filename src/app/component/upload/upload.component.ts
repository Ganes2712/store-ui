
import { Component, ViewChild } from '@angular/core';
import { FilePond, FilePondOptions } from 'filepond';
import { FilePondComponent } from 'ngx-filepond';
import { HttpapiService } from 'src/app/service/httpapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  constructor(private httpapi :HttpapiService)
  {}

  file: File = null;


  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }

   uploadFiles(){
    if (this.file) {
     this.httpapi.uploadFile(this.file).subscribe(
      
      resp => {
        console.log(JSON.stringify(resp.data));
                if(resp.status){
                  Swal.fire(
                    'Uploaded Successfully',
                    '',
                    'success'
                  );
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Error in Process',
                    text: resp.data,
                  });
                }

                  
                },
      (error)=>{
        Swal.fire(
          'Error in Process',
          '',
          'error'
        );
      }
     )
    }
  }
  
}
