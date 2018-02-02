import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-postdata',
  templateUrl: 'postdata.html',
})
export class PostdataPage {

  data: any = {};

  constructor(public navCtrl: NavController, public http: Http) {
    this.data.fullname = '';
    this.data.email = '';
    this.data.response = '';
    this.http = http;
  }

  submit() {
    var link = 'http://localhost/postdataapi/api.php';
    var myData = JSON.stringify({ 
      fullname: this.data.fullname,
      email:this.data.email 
    });

    this.http.post(link, myData)
      .subscribe(data => {
        this.data.response = data["_body"];
      }, error => {
        console.log("Oooops!");
      });
  }
}
