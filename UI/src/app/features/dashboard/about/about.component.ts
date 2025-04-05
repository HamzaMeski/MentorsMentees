import { Component } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faUsers, faHandshake, faRocket } from "@fortawesome/free-solid-svg-icons";

@Component({
	standalone: true,
	selector: 'about',
	imports: [FontAwesomeModule],
	template: `
    <section class="min-h-dvh bg-white text-gray-800 p-6 lg:p-12">
      <div class="max-w-5xl mx-auto text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-blue-600 mb-4">Welcome to MentorConnect</h1>
        <p class="text-lg lg:text-xl text-gray-600 mb-10">
          Empowering growth through meaningful mentorship.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div class="bg-blue-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <fa-icon [icon]="faUsers" class="text-blue-500 text-3xl mb-4"></fa-icon>
            <h3 class="text-xl font-semibold mb-2">Community of Learners</h3>
            <p class="text-sm text-gray-700">
              Connect with mentors and mentees from all walks of life, building a diverse learning environment.
            </p>
          </div>

          <div class="bg-blue-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <fa-icon [icon]="faHandshake" class="text-blue-500 text-3xl mb-4"></fa-icon>
            <h3 class="text-xl font-semibold mb-2">Trusted Relationships</h3>
            <p class="text-sm text-gray-700">
              Our platform is built on trust, respect, and the genuine desire to help each other grow.
            </p>
          </div>

          <div class="bg-blue-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <fa-icon [icon]="faRocket" class="text-blue-500 text-3xl mb-4"></fa-icon>
            <h3 class="text-xl font-semibold mb-2">Achieve Your Goals</h3>
            <p class="text-sm text-gray-700">
              Whether you're a mentor or a mentee, we provide tools to help you track progress and success.
            </p>
          </div>
        </div>

        <div class="mt-12">
          <a routerLink="/mentees" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition shadow-md">
            Get Started
          </a>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
	protected readonly faUsers = faUsers;
	protected readonly faHandshake = faHandshake;
	protected readonly faRocket = faRocket;
}
