import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet],
    template: `
        <section class="bg-zinc-900 text-gray-100 max-h-dvh">
            <router-outlet></router-outlet>
        </section>
    `
})
export class AppComponent{
}
