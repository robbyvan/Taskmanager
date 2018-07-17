import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { loadSvgResources } from '../utils/svg.utils';

import { AppRoutingModule } from '../app-routing.module';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ServicesModule } from '../services/services.module';
import '../utils/debug.util';

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ServicesModule.forRoot(),
    HttpModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  providers: [
    { provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:3000',
      }
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer,
  ) {
    if (parent) {
      throw new Error('Core module already exists.');
    }
    loadSvgResources(ir, ds);
  }
}
