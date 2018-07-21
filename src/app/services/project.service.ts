import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../domain';
import { Observable } from 'rxjs';


@Injectable()
export class ProjectService {
  private readonly domain = 'projects';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {

  }

  // GET
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: {'members_like': userId } })
      .map(res => res.json() as Project[]);
  }

  // POST
  add(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project), { headers:  this.headers })
      .map(res => res.json());
  }

  // PUT
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg,
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), { headers:  this.headers })
      .map(res => res.json());
  }

  // DELETE
  del(project: Project): Observable<Project> {
    const delTask$ = Observable.from(project.taskLists ? project.taskLists : [])
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
      .count();
    return delTask$
      .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
      .mapTo(project);
  }


}