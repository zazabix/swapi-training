import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';

import { StarwarsComponent } from './starwars.component';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';
import { PeopleComponent } from './people/people.component';
import { StarwarsResolverPeople } from './starwars.resolver';


import { SharedModule } from 'app/shared/shared.module';



const starwarsRoutes: Route[] = [
    {
        path: '',
        component: StarwarsComponent,
        children: [
            {
                path: '',
                component: PeopleComponent,
                resolve: {
                    people: StarwarsResolverPeople
                }
            }
        ]
    }
];

@NgModule({
    declarations: [
        StarwarsComponent,
        LazyLoadComponent,
        PeopleComponent
    ],
  imports: [
      RouterModule.forChild(starwarsRoutes),
      MatButtonModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatRippleModule,
      MatSortModule,
      MatSelectModule,
      MatSlideToggleModule,
      MatTooltipModule,
      MatTableModule,
      SharedModule
    ],
    bootstrap: [
        PeopleComponent
    ]
})
export class StarwarsModule {
}
