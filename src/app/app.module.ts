import { HttpapiService } from './service/httpapi.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './component/search/search.component';
import { UploadComponent } from './component/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewdataComponent } from './component/viewdata/viewdata.component';
import { ModuleRegistry } from '@ag-grid-community/core';     // @ag-grid-community/core will always be implicitly available
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridModule } from '@ag-grid-community/angular';
import { UpdateComponent } from './component/update/update.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './common/material/material.module';
// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';

// import and register filepond file type validation plugin
import  * as FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import  * as FilepondPluginImageEdit from 'filepond-plugin-image-edit';
import  * as FilepondPluginImagePreview from 'filepond-plugin-image-preview';
import { Ngprime } from './common/ngprime';
import { ButtonModule } from 'primeng/button';


registerPlugin(FilePondPluginFileValidateType,FilepondPluginImageEdit,FilepondPluginImagePreview);

ModuleRegistry.registerModules([
  ClientSideRowModelModule
]);


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    UploadComponent,
    ViewdataComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    AgGridModule,
    NoopAnimationsModule,
    MaterialModule,
    FilePondModule,
    Ngprime,
    ButtonModule
  ],
  providers: [HttpapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
