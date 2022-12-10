import { Routes } from '@angular/router';

import { ChatComponent } from '../../pages/chat/chat.component';
export const SupportLayoutRoutes: Routes = [
    { path: 'chat/:id',          component: ChatComponent },
];
