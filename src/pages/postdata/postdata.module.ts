import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostdataPage } from './postdata';

@NgModule({
  declarations: [
    PostdataPage,
  ],
  imports: [
    IonicPageModule.forChild(PostdataPage),
  ],
})
export class PostdataPageModule {}
