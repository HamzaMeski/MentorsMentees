import {ApplicationConfig, provideZoneChangeDetection, isDevMode, inject} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import {registerReducers} from "./ngrx/reducers/auth/register.reducers";
import {RegisterEffects} from "./ngrx/effects/auth/register.effects";
import {HttpHandlerFn, provideHttpClient, withInterceptors} from "@angular/common/http";
import {loginReducers} from "./ngrx/reducers/auth/login.reducers";
import {LoginEffects} from "./ngrx/effects/auth/login.effects";
import {
    userProfileGetReducer,
    userProfileUpdateReducer
} from "./ngrx/reducers/userProfile/userProfile.reducers";
import {UserProfileEffects} from "./ngrx/effects/userProfile/userProfile.effects";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {
    createMentoringReducer,
    getMenteesOfMentorReducer,
    getMentorsOfMenteeReducer
} from "./ngrx/reducers/mentoring/mentoring.reducers";
import {MentoringEffects} from "./ngrx/effects/mentoring/mentoring.effects";
import {
    createSessionReducer,
    getMenteeSessionsReducer,
    getMentorSessionsReducer
} from "./ngrx/reducers/session/session.reducers";
import {SessionEffects} from "./ngrx/effects/session/session.effects";



export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([
                (req, next: HttpHandlerFn)=>
                    inject(AuthInterceptor).intercept(req, { handle: next}
                )
            ])
        ),
        provideStore({
            register: registerReducers,
            login: loginReducers,
            getUserProfile: userProfileGetReducer,
            updateUserProfile: userProfileUpdateReducer,
            createMentoring: createMentoringReducer,
            getMenteesOfMentor: getMenteesOfMentorReducer,
            getMentorsOfMentee: getMentorsOfMenteeReducer,
            createSession: createSessionReducer,
            getMentorSessions: getMentorSessionsReducer,
            getMenteeSessions: getMenteeSessionsReducer
        }),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideEffects([
            RegisterEffects,
            LoginEffects,
            UserProfileEffects,
            MentoringEffects,
            SessionEffects
        ])
    ]
};
