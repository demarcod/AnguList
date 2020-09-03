import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username;
  email;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(){
    this.authService.getProfile().subscribe(profile => {
      JSON.stringify(profile.username);
      this.username = profile.username;
      this.email = profile.email;
      console.log(profile.message);
    });
  }

}
