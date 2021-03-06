import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
// import { ProjectModule } from './project/project.module';
// import { TaskModule } from './task/task.module'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    LoginModule,
    // ProjectModule,
    // TaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
