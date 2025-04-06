import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {
	selectGetMenteesOfMentorError,
	selectGetMenteesOfMentorLoading,
	selectGetMenteesOfMentorResponse
} from "../../../../../ngrx/selectors/mentoring/mentoring.selectors";
import {getMenteesOfMentor} from "../../../../../ngrx/actions/mentoring/mentoring.actions";


@Component({
	standalone: true,
	selector: 'list-mentor-sessions',
	imports: [

	],
	template: `
        List Mentor Sessions
	`
})
export class ListMentorSessionsComponent implements OnInit {
	menteesOfMentorResponse$
	menteesOfMentorLoading$
	menteesOfMentorError$

	constructor(private store:Store) {
		this.menteesOfMentorResponse$ = store.select(selectGetMenteesOfMentorResponse)
		this.menteesOfMentorLoading$ = store.select(selectGetMenteesOfMentorLoading)
		this.menteesOfMentorError$ = store.select(selectGetMenteesOfMentorError)
	}

	ngOnInit() {
		this.store.dispatch(getMenteesOfMentor())

		this.menteesOfMentorResponse$.subscribe(val=> {
			console.log(val)
		})
	}
}