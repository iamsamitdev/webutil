import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { BarcodePage} from '../barcode/barcode'
import { LocationPage } from '../location/location';
import { PostdataPage } from '../postdata/postdata';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BarcodePage;
  tab3Root = LocationPage;
  tab4Root = PostdataPage;

  constructor() {

  }
}
