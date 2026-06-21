import { RedirectCommand, Routes } from "@angular/router";
import { TaskComponent } from "./tasks/task/task.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent, resolveTitle, resolveUserName } from "./users/user-tasks/user-tasks.component";
import { TasksComponent, resolveUserTasks } from "./tasks/tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { CanMatchFn, Router } from "@angular/router";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const routerr = inject(Router);
    const shouldGetAccess = Math.random()
    if (shouldGetAccess) {
        return true;
    } else {
        return new RedirectCommand(routerr.parseUrl('unauthorized'));
    }
}


export const routes: Routes = [
    { path: '', component: NoTaskComponent, title: 'No Task' },
    { path: 'tasks', component: TaskComponent, title: 'All Tasks' },
    {
        path: 'users/:userId', component: UserTasksComponent, canMatch: [dummyCanMatch], resolve: {
            userName: resolveUserName
        }, children: [
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'full',
            },
            {
                path: 'tasks', // <your-domain>/users/<uid>/tasks
                component: TasksComponent,
                runGuardsAndResolvers: 'always',
                resolve: {
                    userTasks: resolveUserTasks,
                },
                title: resolveTitle
            },
            {
                path: 'tasks/new',
                component: NewTaskComponent,
                canDeactivate: [canLeaveEditPage]
            },
        ]
    },
    {
        path: '**', component: NotFoundComponent,
    }
]