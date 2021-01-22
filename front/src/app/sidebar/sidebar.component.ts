import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userDetails;
  info = <any>[];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];
        var str = this.userDetails.fullName.indexOf(" ", this.userDetails.fullName.indexOf(" ") + 0);
        var removeFullName = this.userDetails.fullName.substring(0, 6);
        var result = removeFullName.replace(/\s/g, '');

        this.userDetails.fullName = result;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
