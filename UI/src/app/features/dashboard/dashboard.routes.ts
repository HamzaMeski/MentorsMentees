import {DashboardComponent} from "./dashboard.component";
import {Routes} from "@angular/router";

export const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: 'mentor',
				loadChildren: () => import('./mentor/mentor.routes')
					.then(res => res.mentorRoutes)
			}
		]
	},
]