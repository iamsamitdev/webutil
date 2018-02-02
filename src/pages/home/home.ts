import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // ประกาศตัวแปรไว้เก็บข้อมูลรูปที่ถ่ายล่าสุด
  lastImage: string = null;
  // ประกาศตัวแปรไว้แสดงผลการโหลดข้อมูล
  loading: Loading;

  constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) { }

  // สร้างฟังก์ชันในการเลือกแหล่งข้อมูลรูป (จาก gallery หรือ กล้องถ่ายรูป)
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
    }


   // สร้างฟังก์ชันในการเรียกกล้องถ่ายรูป
   public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false, // จะบันทึกลงเครื่องหรือไม่ (true , false)
      correctOrientation: true
    };
 
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }


  // ฟังก์ชันในการตั้งชื่อรูป
  private createFileName() {
    var d = new Date(),
      n = d.getTime(), 
      newFileName = n + ".jpg";
    return newFileName;
  }


  // ฟังก์ชันในการเรียกดู path ของรูปที่ถ่าย
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  // ฟังก์ชันในการแสดง popup
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // ฟังก์ชันในการตรวจเช็คโฟลเดอร์
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }


  // ฟังก์ชันอัพโหลดภาพขึ้นไว้บน Server
  public uploadImage() {
    // Destination URL
    //var url = "http://localhost:8080/uploadimageapi/upload.php";
    var url = "https://www.itgenius.co.th/uploadimageapi/upload.php";
  
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
  
    // File name only
    var filename = this.lastImage;
  
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
  
    const fileTransfer: TransferObject = this.transfer.create();
  
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
  
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }
 


} // ปิด class
