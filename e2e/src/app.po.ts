import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root mat-sidenav-container')).getText();
  }

  filInfo() {
    element(by.id('mat-input-0')).sendKeys('wpcfan@163.com');
    element(by.id('mat-input-1')).sendKeys('wp123456');
    element(by.buttonText('登录')).click();
    return browser.takeScreenshot();
  }
}
