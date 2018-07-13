import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { loadSvgResources } from '../utils/svg.utils';

import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent]
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
