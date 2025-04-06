import {Component} from "@angular/core";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
	faHouse,
	faUsers,
	faChalkboardTeacher,
	faUser,
	faCog,
	faRightFromBracket, faBars
} from "@fortawesome/free-solid-svg-icons";
import {LogoutService} from "../../core/services/helpers/logout.service";
import {Store} from "@ngrx/store";

@Component({
	standalone: true,
	selector: 'dashboard',
	imports: [
		RouterOutlet,
		FontAwesomeModule,
		RouterLink
	],
	template: `
        <section class="h-dvh flex bg-gradient-to-br from-gray-900 to-zinc-900 text-gray-100">
            <!-- Sidebar -->
            <aside class="w-72 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700/50 flex flex-col">
                <!-- Brand/Logo Area -->
                <div class="p-6 border-b border-gray-700/50">
                    <h2 class="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Dashboard
                    </h2>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 p-4 space-y-2">
                    <!-- Navigation Group -->
                    <div class="space-y-2">
                        <a routerLink="/dashboard/about"
                           routerLinkActive="bg-indigo-500/10 text-indigo-400 border-indigo-500"
                           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-gray-700/50 border border-transparent group">
                            <fa-icon [icon]="faHouse" class="text-lg w-5 h-5 transition-transform group-hover:scale-110"></fa-icon>
                            <span>About</span>
                        </a>

                        <a routerLink="/dashboard/myMentees"
                           routerLinkActive="bg-indigo-500/10 text-indigo-400 border-indigo-500"
                           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-gray-700/50 border border-transparent group">
                            <fa-icon [icon]="faUsers" class="text-lg w-5 h-5 transition-transform group-hover:scale-110"></fa-icon>
                            <span>My Mentees</span>
                        </a>

                        <a routerLink="/dashboard/myMentors"
                           routerLinkActive="bg-indigo-500/10 text-indigo-400 border-indigo-500"
                           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-gray-700/50 border border-transparent group">
                            <fa-icon [icon]="faChalkboardTeacher" class="text-lg w-5 h-5 transition-transform group-hover:scale-110"></fa-icon>
                            <span>My Mentors</span>
                        </a>
	                    
                        <a routerLink="/dashboard/profile"
                           routerLinkActive="bg-indigo-500/10 text-indigo-400 border-indigo-500"
                           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-gray-700/50 border border-transparent group">
                            <fa-icon [icon]="faUser" class="text-lg w-5 h-5 transition-transform group-hover:scale-110"></fa-icon>
                            <span>Profile</span>
                        </a>

                        <a routerLink="/settings"
                           routerLinkActive="bg-indigo-500/10 text-indigo-400 border-indigo-500"
                           class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-gray-700/50 border border-transparent group">
                            <fa-icon [icon]="faCog" class="text-lg w-5 h-5 transition-transform group-hover:scale-110"></fa-icon>
                            <span>Settings</span>
                        </a>
                    </div>
                </nav>

                <!-- Bottom Section with Logout -->
                <div class="p-4 border-t border-gray-700/50">
                    <button (click)="logout()"
                            class="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-300 hover:text-red-400 text-gray-400 group">
                        <fa-icon [icon]="faRightFromBracket" class="text-lg w-5 h-5 transition-transform group-hover:scale-110"></fa-icon>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 overflow-auto">
                <!-- Page Content -->
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

	constructor(
		private logoutService: LogoutService,
		private router: Router,
		private store: Store
	) {
		// this.router.navigate(["/dashboard/yourMentees"]);
	}

	logout() {
		this.logoutService.logout()
	}

	protected readonly faBars = faBars;
}
