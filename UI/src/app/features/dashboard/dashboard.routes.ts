import {DashboardComponent} from "./dashboard.component";
import {Routes} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {ProfileComponent} from "./profile/profile.component";

export const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: 'about',
				component: AboutComponent
			},
			{
				path: 'myMentees',
				loadChildren: () => import('./mentor/mentor.routes')
					.then(res => res.mentorRoutes)
			},
			{
				path: 'myMentors',
				loadChildren: () => import('./mentee/mentee.routes')
					.then(res => res.menteeRoutes)
			},
			{
				path: 'profile',
				component: ProfileComponent
			}
		]
	},
]