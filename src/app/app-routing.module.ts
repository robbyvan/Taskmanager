import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'project', loadChildren: './project/project.module#ProjectModule', pathMatch: 'full', canActivate:[AuthGuardService] },
  { path: 'tasklist/:id', loadChildren: './task/task.module#TaskModule', pathMatch: 'full', canActivate:[AuthGuardService]  },
  { path: 'mycalendar/:view', loadChildren: './my-calendar/my-calendar.module#MyCalendarModule', pathMatch: 'full', canActivate:[AuthGuardService]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}