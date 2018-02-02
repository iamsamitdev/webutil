import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) { }


  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    // ตัวแปรเก็บภาพไอคอนของพิกัด
    var im = 'https://elanmakeup.com/wp-content/uploads/sites/46/2017/10/location-icon.png';

    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
      // ปักหมุดด้วยรูปที่เรากำหนด
      new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: im
      });
 
    }, (err) => {
      console.log(err);
      //alert(err);
    });
  }

  // ฟังก์ชันในการปักหมุดพิกัดที่แสดง
  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }



}// end class
