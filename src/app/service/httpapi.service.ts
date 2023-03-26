import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpapiService {

  constructor(private http:HttpClient) 
  {
    
  }

  public updateData(updateDto:any):Observable<any>
  {
    const headers = { 'content-type': 'application/json'};   
    return this.http.post(environment.baseurl+'/store/update', updateDto);
  }

  getSearchData(searchDto:any):Observable<any>
  {
    return this.http.post<any>(environment.baseurl+'/store/getProduct',searchDto);
  }

  public uploadFile(file: File):Observable<any> {
  
    const formData = new FormData();    
    formData.append("file", file);
    formData.append("userId",'1001');
    return this.http.post(environment.baseurl+'/store/upload', formData);
  }

}
