import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'foodapp';
  
  loadedFeature='recipe';

  ngOnInit()
  {
    firebase.initializeApp({
      apiKey:"AIzaSyBgLe6olzg8rE0Hp5w72S6ZItjqA9Hr_l8",
      authDomain:"ang-recipebook1993.firebaseapp.com"

    })
  }
    onNavigate(feature:string)
    {
  this.loadedFeature=feature;
    }
  
}
