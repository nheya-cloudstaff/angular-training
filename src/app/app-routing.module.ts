import { NgModule, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { MyclientsComponent } from './pages/myclients/myclients.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { ViewticketComponent } from './pages/viewticket/viewticket.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'my-profile', component: MyprofileComponent
  },
  {
    path: 'my-client', component: MyclientsComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'ticket', component: TicketComponent
  },
  {
    path: 'view-ticket/:id', component: ViewticketComponent
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
