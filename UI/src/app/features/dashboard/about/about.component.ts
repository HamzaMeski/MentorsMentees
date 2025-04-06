import { Component } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faUsers, faHandshake, faRocket } from "@fortawesome/free-solid-svg-icons";

@Component({
	standalone: true,
	selector: 'about',
	imports: [FontAwesomeModule],
	template: `
        <section class="h-dvh bg-gradient-to-br from-gray-900 via-zinc-900 to-gray-900 text-gray-100 relative overflow-hidden">
            <!-- Background Elements -->
            <div class="absolute inset-0 overflow-hidden">
                <div class="absolute top-0 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>

            <!-- Content -->
            <div class="relative px-6 lg:px-12 py-20 lg:py-32">
                <div class="max-w-6xl mx-auto">
                    <!-- Header Section -->
                    <div class="text-center space-y-6 mb-16">
                      

                        <h1 class="text-4xl lg:text-6xl font-bold tracking-tight lowercase">
                            Welcome to
                            <span class="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        MentorConnect
                    </span>
                        </h1>

                        <p class="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Empowering growth through meaningful mentorship
                        </p>
                    </div>

                    <!-- Features Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <!-- Community Card -->
                        <div class="group relative">
                            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                            <div class="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 h-full">
                                <div class="p-3 bg-blue-500/10 rounded-xl w-max mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <fa-icon [icon]="faUsers" class="text-blue-400 text-2xl"></fa-icon>
                                </div>
                                <h3 class="text-xl lg:text-2xl font-semibold mb-4 text-white">Community of Learners</h3>
                                <p class="text-gray-400 leading-relaxed">
                                    Connect with mentors and mentees from all walks of life, building a diverse learning environment.
                                </p>
                            </div>
                        </div>

                        <!-- Relationships Card -->
                        <div class="group relative">
                            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                            <div class="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 h-full">
                                <div class="p-3 bg-blue-500/10 rounded-xl w-max mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <fa-icon [icon]="faHandshake" class="text-blue-400 text-2xl"></fa-icon>
                                </div>
                                <h3 class="text-xl lg:text-2xl font-semibold mb-4 text-white">Trusted Relationships</h3>
                                <p class="text-gray-400 leading-relaxed">
                                    Our platform is built on trust, respect, and the genuine desire to help each other grow.
                                </p>
                            </div>
                        </div>

                        <!-- Goals Card -->
                        <div class="group relative">
                            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                            <div class="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 h-full">
                                <div class="p-3 bg-blue-500/10 rounded-xl w-max mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <fa-icon [icon]="faRocket" class="text-blue-400 text-2xl"></fa-icon>
                                </div>
                                <h3 class="text-xl lg:text-2xl font-semibold mb-4 text-white">Achieve Your Goals</h3>
                                <p class="text-gray-400 leading-relaxed">
                                    Whether you're a mentor or mentee, we provide tools to help you track progress and success.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- CTA Section -->
                    <div class="text-center space-y-8">
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a routerLink="/mentees"
                               class="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                <span class="relative flex items-center gap-2">
                            Get Started
                            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                        </span>
                            </a>

                            <a href="#learn-more"
                               class="px-8 py-4 rounded-xl border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium text-lg transition-all duration-300">
                                Learn More
                            </a>
                        </div>

                        <!-- Trust Indicators -->
                        <div class="pt-12 border-t border-gray-800">
                            <p class="text-gray-400 mb-6">Trusted by mentors and mentees worldwide</p>
                            <div class="flex flex-wrap justify-center items-center gap-8">
                                <div class="flex items-center gap-2">
                                    <div class="text-2xl font-bold text-white">500+</div>
                                    <div class="text-sm text-gray-400">Active Mentors</div>
                                </div>
                                <div class="w-px h-8 bg-gray-700"></div>
                                <div class="flex items-center gap-2">
                                    <div class="text-2xl font-bold text-white">1000+</div>
                                    <div class="text-sm text-gray-400">Successful Matches</div>
                                </div>
                                <div class="w-px h-8 bg-gray-700"></div>
                                <div class="flex items-center gap-2">
                                    <div class="text-2xl font-bold text-white">95%</div>
                                    <div class="text-sm text-gray-400">Satisfaction Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
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
