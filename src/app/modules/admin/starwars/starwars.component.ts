import {  Component,  OnDestroy, OnInit,  ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import {  Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import {
    Films, People, Planets, Species, StarShips, Vehicles
} from 'app/modules/admin/starwars/starwars.types';
import { StarwarsService } from './starwars.service';

@Component({
  selector: 'app-starwars',
  templateUrl: './starwars.component.html',
   styleUrls: ['./starwars.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class StarwarsComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    listPeople$: Observable<People[]>;
    listFilms$: Observable<Films[]>;
    listPlanets$: Observable<Planets[]>;
    listStarShips$: Observable<StarShips[]>;
    listSpecies$: Observable<Species[]>;
    listVehicles$: Observable<Vehicles[]>;

    people$: Observable<People>;
    films$: Observable<Films>;
    planets$: Observable<Planets>;
    species$: Observable<Species>;
    starships$: Observable<StarShips>;
    vehicles$: Observable<Vehicles>;

    searchInputControl: FormControl = new FormControl();

    constructor(
        private _starwarsService: StarwarsService
    ) {

    }

    ngOnInit(): void {

        // Inital setter
        this._starwarsService.getAllList();

        // Get All list
        this.listPeople$ = this._starwarsService.peoples$;
        this.listFilms$ = this._starwarsService.films$;
        this.listPlanets$ = this._starwarsService.planets$;
        this.listStarShips$ = this._starwarsService.starships$;
        this.listSpecies$ = this._starwarsService.species$;
        this.listVehicles$ = this._starwarsService.vehicles$;

        // Data checkers
        //this.people$.subscribe(res => {
        //    console.log('people result', res);
        //});
        //this.listPeople$.subscribe(res => {
        //    console.log('Peoples >>>> 111111111111111', res);
        //});


        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap(query =>

                    // Search
                    this._starwarsService.getPeoples()
                )
            )
            .subscribe();

      }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
