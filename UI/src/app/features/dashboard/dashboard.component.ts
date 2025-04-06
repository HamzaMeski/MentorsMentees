import {Component} from "@angular/core";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
	faHouse,
	faUsers,
	faChalkboardTeacher,
	faUser,
	faCog,
	faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

@Component({
	standalone: true,
	selector: 'dashboard',
	imports: [
		RouterOutlet,
		FontAwesomeModule,
		RouterLink
	],
	template: `
        <section class="h-dvh flex bg-[#1e1f22] text-white">
            <!-- Sidebar -->
            <aside class="w-64 bg-[#2e2f33] p-4 border-r border-[#3a3b3f]">
                <h2 class="text-xl font-semibold mb-6">Dashboard</h2>
                <nav class="flex flex-col gap-4">
                    <a routerLink="/dashboard/about" class="hover:text-blue-400 transition cursor-pointer flex items-center gap-2">
                        <fa-icon [icon]="faHouse" class="text-lg"></fa-icon>
                        <span>About</span>
                    </a>
                    <a routerLink="/dashboard/myMentees" class="hover:text-blue-400 transition cursor-pointer flex items-center gap-2">
                        <fa-icon [icon]="faUsers" class="text-lg"></fa-icon>
                        <span>My Mentees</span>
                    </a>
                    <a routerLink="/dashboard/myMentors" class="hover:text-blue-400 transition cursor-pointer flex items-center gap-2">
                        <fa-icon [icon]="faChalkboardTeacher" class="text-lg"></fa-icon>
                        <span>My Mentors</span>
                    </a>
                    <a routerLink="/dashboard/profile" class="hover:text-blue-400 transition cursor-pointer flex items-center gap-2">
                        <fa-icon [icon]="faUser" class="text-lg"></fa-icon>
                        <span>Profile</span>
                    </a>
                    <a routerLink="/settings" class="hover:text-blue-400 transition cursor-pointer flex items-center gap-2">
                        <fa-icon [icon]="faCog" class="text-lg"></fa-icon>
                        <span>Settings</span>
                    </a>
                    <div (click)="logout()" class="hover:text-red-400 transition cursor-pointer flex items-center gap-2">
                        <fa-icon [icon]="faRightFromBracket" class="text-lg"></fa-icon>
                        <span>Logout</span>
                    </div>
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 overflow-auto p-6">
                <router-outlet></router-outlet>
            </main>
        </section>
	`
})
export class DashboardComponent {
	// FontAwesome Icons
	protected readonly faHouse = faHouse;
	protected readonly faUsers = faUsers;
	protected readonly faChalkboardTeacher = faChalkboardTeacher;
	protected readonly faUser = faUser;
	protected readonly faCog = faCog;
	protected readonly faRightFromBracket = faRightFromBracket;

	constructor(private router: Router) {
		// this.router.navigate(["/dashboard/yourMentees"]);
	}

	logout() {
		this.router.navigate(['/login']);
	}
}
