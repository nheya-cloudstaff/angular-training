import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.scss']
})
export class ViewticketComponent implements OnInit {

  allData: any;
  constructor(
    private service: GlobalService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.httpViewTicket(id);

    this.service.onHttpViewTicket.subscribe(
      (ticket: any) => {
        console.log('this is from my Ticket ts', ticket);
        this.allData = ticket;
      }
    )
  }


}
