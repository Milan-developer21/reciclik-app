import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginPageForm} from "./login.page.form";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/AppState";
import {hide, show} from "../../../store/loading/loading.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private store: Store<AppState>,) {
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm()
  }

  login() {
    this.router.navigate(['home']);
  }

  forgotEmailOrPassword(){
    this.store.dispatch(show());

    setTimeout(() => {
      this.store.dispatch(hide());
    },3000)
  }

  signUp() {
    this.router.navigate(['register']);
  }
}
