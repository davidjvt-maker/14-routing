import { Component, computed, input } from '@angular/core';
import { inject } from '@angular/core';
import { UsersService } from '../users.service';
import { RouterLink, RouterOutlet, ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';


@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent {
  userId = input.required<string>();
  private usersService = inject(UsersService)
  //userName = computed(() => this.usersService.users.find((u) => u.id === this.userId())?.name)
  userName = input.required<string>();
}


export const resolveUserName: ResolveFn<string> = (activatedRouter: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  return usersService.users.find((u) => u.id === activatedRouter.params['userId'])?.name || ''
}

export const resolveTitle: ResolveFn<string> = (activatedRouter: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return resolveUserName(activatedRouter, state) + '\'s Tasks'
}
