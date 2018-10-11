import { Routes } from '@angular/router';
import { TableComponent } from '../table/table.component';
// import { InfoBarComponent } from '../info-bar/info-bar.component';
import { ReactFormComponent } from '../react-form/react-form.component';

export const appRoutes: Routes = [
    { path: 'main', component: TableComponent },
    { path: 'feature', component: ReactFormComponent },
];
