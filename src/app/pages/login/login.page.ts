import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginPageForm} from "./login.page.form";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/AppState";
import {recoverPassword, recoverPasswordFail, recoverPasswordSuccess} from "../../../store/login/login.actions";
import {hide, show} from "../../../store/loading/loading.actions";
import {ToastController} from "@ionic/angular";
import {LoginState} from "../../../store/login/LoginState";
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form!: FormGroup;
  loginStateSubscription!: Subscription;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private store: Store<AppState>,
              private toastController: ToastController,
              private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm()

    this.store.select('login').subscribe(loginState => {
      this.onIsRecoveringPassword(loginState);
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoverPasswordFail(loginState)
    })
  }

  private onIsRecoveringPassword(loginState: LoginState) {
    if (loginState.isRecoveringPassword) {
      this.store.dispatch(show())

      this.authService.recoverEmailPassword(this.form.get('email')?.value).subscribe(() => {
        this.store.dispatch(recoverPasswordSuccess())
      }, error => {
        this.store.dispatch(recoverPasswordFail({error}))
      })
    }
  }

  private async onIsRecoverPasswordFail(loginState: LoginState) {
    console.log("loginState", loginState)
    if (loginState.error) {
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: 'danger'
      })
      toaster.present();
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword) {
      this.store.dispatch(hide())
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Recovery email sent',
        color: 'primary'
      })
      toaster.present();
    }
  }


  login() {
    this.router.navigate(['home']);
  }

  forgotEmailOrPassword() {
    this.store.dispatch(recoverPassword());

  }

  signUp() {
    this.router.navigate(['register']);
  }

  ngOnDestroy() {
    if (this.loginStateSubscription) this.loginStateSubscription.unsubscribe();
  }
}
