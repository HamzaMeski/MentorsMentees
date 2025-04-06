import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  selector: 'guest-page',
  imports: [
    RouterLink,
  ],
  template: `
    <section class="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-zinc-800 text-gray-100 font-sans relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <!-- Hero Section -->
      <main class="relative flex flex-col-reverse lg:flex-row justify-between items-center px-6 lg:px-20 py-20 max-w-screen-xl mx-auto">
        <!-- Text Content -->
        <div class="w-full lg:w-1/2 mt-12 lg:mt-0 animate-fade-in-up">
          <div class="space-y-2 mb-4">
        <span class="inline-block px-4 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-medium">
          Platform Launch 2024 🚀
        </span>
          </div>

          <h1 class="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 bg-gradient-to-r from-white via-gray-100 to-indigo-200 bg-clip-text text-transparent">
            Empower Growth Through <span class="text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text">Mentorship</span>
          </h1>

          <p class="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
            Whether you're a mentor or a mentee, MenTex provides the tools you need to connect, schedule, and thrive through meaningful sessions.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <a
                routerLink="/auth/register"
                class="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium transition-all duration-300 shadow-xl hover:shadow-indigo-500/25 transform hover:scale-105 hover:-translate-y-0.5"
            >
              <span class="relative z-10">Get Started Free</span>
              <div class="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a
                routerLink="/auth/login"
                class="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-gray-300 hover:text-white font-medium transition-all duration-300 border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 backdrop-blur-sm"
            >
              Already have an account?
            </a>
          </div>

          <!-- Social Proof -->
          <div class="mt-12 pt-8 border-t border-gray-800">
            <p class="text-sm text-gray-400 mb-4">Trusted by leading companies</p>
            <div class="flex items-center gap-6 opacity-50 hover:opacity-100 transition-opacity duration-300">
              <!-- Add company logos here -->
            </div>
          </div>
        </div>

        <!-- Image / Visual -->
        <div class="w-full lg:w-1/2 flex justify-center animate-fade-in">
          <div class="relative w-[400px] h-[400px] group">
            <!-- Glass Card Effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl transform transition-all duration-500 group-hover:scale-105"></div>

            <!-- Image Container -->
            <div class="relative w-full h-full rounded-3xl overflow-hidden">
              <img
                  src="images/mentor.avif"
                  alt="Mentoring Illustration"
                  class="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </main>
    </section>
  `
})
export class GuestPageComponent  {}
