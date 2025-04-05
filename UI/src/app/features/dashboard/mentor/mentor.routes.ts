import {Routes} from "@angular/router";
import {MentorComponent} from "./mentor.component";
import {MentorSessionComponent} from "./mentorSession/mentorSession.component";

export const mentorRoutes: Routes = [
	{
		path: '',
		component: MentorComponent
	},
	{
		path: 'mentorSession/:id',
		component: MentorSessionComponent
	}
]
