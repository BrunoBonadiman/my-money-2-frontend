import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Integrantes } from '../../apis/model/integrantes-model';
import { IntegrantesService } from '../../apis/service/integrantes.service';
import { UserService } from '../../shared/user.service';

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

  myScriptElement: HTMLScriptElement;

  openNavbar: boolean;

  @ViewChild('nav-bar', { static: true }) navBac: any;

  constructor(
    private userService: UserService,
    private integrantesService: IntegrantesService,
    private router: Router
  ) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = "src/assets/js/main.js";
    document.body.appendChild(this.myScriptElement);
  }

  showNavbar(): void{
    this.openNavbar = !this.openNavbar;
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];

        var str = this.userDetails.fullName.indexOf(" ", this.userDetails.fullName.indexOf(" ") + 0);

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
