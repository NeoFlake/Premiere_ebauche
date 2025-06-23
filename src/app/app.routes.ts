import { Routes } from '@angular/router';
import { DetailCarteComponent } from './components/detail-carte-component/detail-carte-component';
import { PremierComposant } from './components/premier-composant/premier-composant';

export const routes: Routes = [
    { path: "", component: PremierComposant },
    { path: "carte/:id", component: DetailCarteComponent },
    { path: "**", redirectTo: "" }
];
