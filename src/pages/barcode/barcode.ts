import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class BarcodePage {

  // สร้างตัวแปร data ไว้เก็บข้อมูลที่สแกนได้
  data = [];

  constructor(private barcodeScanner:BarcodeScanner, public navCtrl: NavController) {}

  ionViewDidLoad() {
    // เรียกใช้งานฟังก์ชัน scan() ตอนเริ่มเปิดหน้าเพจ
    // this.scan();
  }

  // ฟังก์ชันเรียกใช้สแกนบาร์โค๊ด
  scan(){
    this.barcodeScanner.scan().then((barcodeData) =>{
       // Success ! Barcode data is here
       this.data.push(barcodeData.text);
    },(err) => {
        // An error occured
    });
  }
 
}
