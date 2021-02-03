import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-myclients',
  templateUrl: './myclients.component.html',
  styleUrls: ['./myclients.component.css']
})
export class MyclientsComponent implements OnInit {
  allTag: any;
  allClients: any;
  constructor(private service: GlobalService, private route:Router) { }

  ngOnInit(): void {
    this.service.httpGetProfile();

    this.service.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log('this is from my profile ts', profile);
        this.allTag = profile.tag.groups;
        this.allClients = profile.tag.accounts;
      }
    )
  }
  onLogout(): void {
    this.service.deleteToken();
    this.route.navigate(['/']);
  }


}
