import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  userDetails;
  openNavbar: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showNavbar(): void{
    this.openNavbar = !this.openNavbar;
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  inputFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const foto = event.target.files[0];

      const formData = new FormData();
      formData.append('foto', foto);

      this.userService.adicionarFoto(formData).subscribe(resposta => console.log('Upload ok.'));
    }
  }

}
