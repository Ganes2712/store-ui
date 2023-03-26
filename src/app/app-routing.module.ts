import { ViewdataComponent } from './component/viewdata/viewdata.component';
import { UploadComponent } from './component/upload/upload.component';
import { SearchComponent } from './component/search/search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', component: SearchComponent},
  { path:'search', component: SearchComponent},
  { path:'upload', component: UploadComponent} ,
  { path:'view', component: ViewdataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
