import { TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        CoreModule,
        RouterModule.forRoot([]),
        MatSidenavModule,
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ],
    }).compileComponents();
  }));

  it('应该创建应用', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('应该有.site元素', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.site').textContent).toBeTruthy();
  }));
});
