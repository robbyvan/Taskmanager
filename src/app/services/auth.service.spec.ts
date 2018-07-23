import { Injectable, Injector } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { User } from '../domain/user.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'BASE_CONFIG', useValue: { uri: 'http://localhost:3000' } },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        Http,
        AuthService,
      ],
    });

    this.service = TestBed.get(AuthService);
    this.backend = TestBed.get(ConnectionBackend);
  });

  it('注册后应该返回一个Observable<Auth>', inject([AuthService, 'BASE_CONFIG'], (service: AuthService) => {
    const mockUser: User = {
      name: 'someuser@dev.local',
      password: '123abc',
      email: 'someuser@dev.local',
    };
    const mockResponse = {
      id: 'obj123abc',
      name: 'someuser@dev.local',
      email: 'someuser@dev.local',
      password: '123abc',
    };

    this.backend.connections.subscribe((connection: any) =>
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })))
    );

    service.register(mockUser).subscribe(auth => {
      expect(auth.token).toBeDefined();
      expect(auth.user).toBeDefined();
      expect(auth.user.id).toEqual(mockResponse.id);
    });

  }));
});