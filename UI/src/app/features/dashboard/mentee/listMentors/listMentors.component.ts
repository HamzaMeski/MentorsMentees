import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {
	selectGetMentorsOfMenteeError,
	selectGetMentorsOfMenteeLoading,
	selectGetMentorsOfMenteeResponse
} from "../../../../ngrx/selectors/mentoring/mentoring.selectors";
import {getMenteesOfMentor, getMentorsOfMentee} from "../../../../ngrx/actions/mentoring/mentoring.actions";


@Component({
	standalone: true,
	selector: 'list-mentors',
	imports: [
	],
	template: `
		Mentee section
	`
})
export class ListMentorsComponent implements OnInit{
	mentorsOfMenteeResponse$
	mentorsOfMenteeLoading$
	mentorsOfMenteeError$

	constructor(private store:Store) {
		this.mentorsOfMenteeResponse$ = store.select(selectGetMentorsOfMenteeResponse)
		this.mentorsOfMenteeLoading$ = store.select(selectGetMentorsOfMenteeLoading)
		this.mentorsOfMenteeError$ = store.select(selectGetMentorsOfMenteeError)
	}

	ngOnInit() {
		this.store.dispatch(getMentorsOfMentee())

		this.mentorsOfMenteeResponse$.subscribe(val=> {
			console.log(val)
		})
	}
}