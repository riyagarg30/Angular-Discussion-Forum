import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

  login(): void{
    this.commonService.loginWithGoogle();
  }

}
