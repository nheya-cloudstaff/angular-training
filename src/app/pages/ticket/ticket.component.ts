import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  allData: any;
  constructor(private service: GlobalService, private route:Router) { }

  ngOnInit(): void {
    this.service.httpGetTicket();

    this.service.onHttpGetTicket.subscribe(
      (ticket: any) => {
        console.log('this is from my Ticket ts', ticket);
        this.allData = ticket;
      }
    )
  }
  onLogout(): void {
    this.service.deleteToken();
    this.route.navigate(['/']);
  }

}
