import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Integrantes } from '../model/integrantes-model';
import { IntegrantesService } from '../service/integrantes.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userDetails;
  integrantesDetails;
  info = <any>[];
  integrantes: Integrantes[];

  constructor(
    private userService: UserService,
    private integrantesService: IntegrantesService,
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

    this.integrantesService.getIntegrantes().subscribe(
      (res) => {
        this.integrantes = res;
        this.integrantesDetails = this.integrantes;
      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
