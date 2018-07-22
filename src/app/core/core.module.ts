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
import { AppStoreModule } from '../reducers';
import { AppEffectsModule } from '../effects';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/from';


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
    AppStoreModule,
    AppEffectsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BrowserAnimationsModule,
    AppRoutingModule,
    // AppStoreModule,
    // AppEffectsModule
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
