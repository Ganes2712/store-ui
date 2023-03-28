
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
  uploadedFiles: any[] = [];
  filesize:number=1000000;


  uploadFiles(event: any) {
    console.log('uploadFiles');

    this.file = event.target.files[0];
    this.uploadedFiles = [];
    this.uploadedFiles.push(this.file);
    
  }

   serverCall(event: any){
    console.log('servercall');
    for(let file of event.files) {
      this.file = file;
    }

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
