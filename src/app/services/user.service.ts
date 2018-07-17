import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User, Project } from '../domain';
import { Observable, of, from } from 'rxjs';


@Injectable()
export class UserService {
  private readonly domain = 'users';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

  searchUsers(filter: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { 'email_like': filter } })
      .map(res => res.json() as User[])
  }

  getUsersByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { 'projectId': projectId } })
      .map(res => res.json() as User[]);
  }

  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`
    const projectIds = user.projectIds ? user.projectIds : [];
    if (projectIds.indexOf(projectId) !== -1) {
      return of(user);
    }
    return this.http
      .patch(uri, JSON.stringify({ projectIds: [...projectIds, projectId] }), { headers:  this.headers })
      .map(res => res.json() as User);
  }

  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if (index === -1) {
      return of(user);
    }
    const touUpdate = [ ...projectIds.slice(0, index), ...projectIds.slice(index + 1) ];
    return this.http
      .patch(uri, JSON.stringify({ projectIds: touUpdate }), { headers:  this.headers })
      .map(res => res.json() as User);
  }

  batchUpdateProjectRef(project: Project): Observable<User[]> {
    const projectId = project.id;
    const membersIds = project.members ? project.members : [];
    return from(membersIds)
      .switchMap(id => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get(uri).map(res => res.json() as User);
      })
      .filter(user => user.projectIds.indexOf(projectId) === -1)
      .switchMap(u => this.addProjectRef(u, projectId))
      .reduce((arr, curr) => [ ...arr, curr ], []);
  }
  
}