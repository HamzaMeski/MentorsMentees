import {Routes} from "@angular/router";
import {MenteeComponent} from "./mentee.component";
import {MenteeSessionComponent} from "./menteeSession/menteeSession.component";


export const menteeRoutes: Routes = [
	{
		path: '',
		component: MenteeComponent
	},
	{
		path: 'menteeSession/:id',
		component: MenteeSessionComponent
	}
]
