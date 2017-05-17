import { NgModule, ModuleWithProviders, Injector, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// TODO: how should we link modules together?
import { NgaLayoutModule } from '../theme/components/layout/layout.module';

import { NgaAuthService } from './services/auth.service';
import { NgaDummyAuthProvider } from './providers/dummy-auth.provider';
import { NgaEmailPassAuthProvider } from './providers/email-pass-auth.provider';

import { NgaAuthOptions, ngaAuthOptionsToken } from './auth.options';

import { NgaAuthComponent } from './components/auth.component';
import { NgaTokenService } from './services/token.service';
import { NgaSecuredHttp } from './services/secured-http';

import { NgaAuthBlockComponent } from './components/auth-block/auth-block.component';
import { NgaLoginComponent } from './components/login/login.component';
import { NgaRegisterComponent } from './components/register/register.component';
import { NgaLogoutComponent } from './components/logout/logout.component';
import { NgaRequestPasswordComponent } from './components/request-password/request-password.component';
import { NgaResetPasswordComponent } from './components/reset-password/reset-password.component';

import { routes } from './auth.routes';

export function ngaAuthServiceFactory(config: any, tokenService: NgaTokenService, injector: Injector) {
  const providers = config.providers || {};

  for (const key in providers) {
    if (providers.hasOwnProperty(key)) {
      const provider = providers[key];
      provider.object = injector.get(provider.service);
      provider.object.setConfig(provider.config || {});
    }
  }

  return new NgaAuthService(providers, tokenService);
}

@NgModule({
  imports: [
    CommonModule,
    NgaLayoutModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpModule,
  ],
  declarations: [
    NgaAuthComponent,
    NgaAuthBlockComponent,
    NgaLoginComponent,
    NgaRegisterComponent,
    NgaRequestPasswordComponent,
    NgaResetPasswordComponent,
    NgaLogoutComponent,
  ],
  exports: [
    NgaAuthComponent,
    NgaAuthBlockComponent,
    NgaLoginComponent,
    NgaRegisterComponent,
    NgaRequestPasswordComponent,
    NgaResetPasswordComponent,
    NgaLogoutComponent,
  ],
})
export class NgaAuthModule {

  constructor(@Optional() @SkipSelf() parentModule: NgaAuthModule) {
    if (parentModule) {
      throw new Error('NgaAuthModule is already loaded. Import it in the AppModule only.');
    }
  }

  static forRoot(ngaAuthOptions?: NgaAuthOptions): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaAuthModule,
      providers: [
        { provide: ngaAuthOptionsToken, useValue: ngaAuthOptions },
        {
          provide: NgaAuthService,
          useFactory: ngaAuthServiceFactory,
          deps: [ngaAuthOptionsToken, NgaTokenService, Injector],
        },
        NgaTokenService,
        NgaSecuredHttp,
        NgaDummyAuthProvider,
        NgaEmailPassAuthProvider,
      ],
    };
  }
}
