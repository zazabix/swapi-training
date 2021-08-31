import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, merge, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import {
    Films, People, Planets, Species, StarShips, Vehicles
} from 'app/modules/admin/starwars/starwars.types';

@Injectable({
    providedIn: 'root'
})
export class StarwarsService {

    // Private
    private _film: BehaviorSubject<Films | null> = new BehaviorSubject(null);
    private _films: BehaviorSubject<Films[] | null> = new BehaviorSubject(null);

    private _people: BehaviorSubject<People | null> = new BehaviorSubject(null);
    private _peoples: BehaviorSubject<People[] | null> = new BehaviorSubject(null);

    private _planet: BehaviorSubject<Planets | null> = new BehaviorSubject(null);
    private _planets: BehaviorSubject<Planets[] | null> = new BehaviorSubject(null);

    private _specie: BehaviorSubject<Species | null> = new BehaviorSubject(null);
    private _species: BehaviorSubject<Species[] | null> = new BehaviorSubject(null);

    private _starship: BehaviorSubject<StarShips | null> = new BehaviorSubject(null);
    private _starships: BehaviorSubject<StarShips[] | null> = new BehaviorSubject(null);

    private _vehicle: BehaviorSubject<Vehicles | null> = new BehaviorSubject(null);
    private _vehicles: BehaviorSubject<Vehicles[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for film
     */
    get film$(): Observable<Films> {
        return this._film.asObservable();
    }

    /**
     * Getter for films
     */
    get films$(): Observable<Films[]> {
        return this._films.asObservable();
    }

    /**
     * Getter for people
     */
    get people$(): Observable<People> {
        return this._people.asObservable();
    }

    /**
     * Getter for peoples
     */
    get peoples$(): Observable<People[]> {
        return this._peoples.asObservable();
    }

    /**
     * Getter for planet
     */
    get planet$(): Observable<Planets> {
        return this._planet.asObservable();
    }

    /**
     * Getter for planets
     */
    get planets$(): Observable<Planets[]> {
        return this._planets.asObservable();
    }

    /**
     * Getter for specie
     */
    get specie$(): Observable<Species> {
        return this._specie.asObservable();
    }

    /**
     * Getter for species
     */
    get species$(): Observable<Species[]> {
        return this._species.asObservable();
    }

    /**
     * Getter for starship
     */
    get starship$(): Observable<StarShips> {
        return this._starship.asObservable();
    }

    /**
     * Getter for starships
     */
    get starships$(): Observable<StarShips[]> {
        return this._starships.asObservable();
    }

    /**
     * Getter for vehicle
     */
    get vehicle$(): Observable<Vehicles> {
        return this._vehicle.asObservable();
    }

    /**
     * Getter for vehicles
     */
    get vehicles$(): Observable<Vehicles[]> {
        return this._vehicles.asObservable();
    }

    addData(dataObj, existObj) {
        const currentValue = existObj;
        const updatedValue = [...currentValue, dataObj];
        existObj.next(updatedValue);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getAllList()
    {
        this.getFilmList();
        this.getPeopleList();
        this.getPlanetList();
        this.getSpeciesList();
        this.getStarshipsList();
        this.getVehicleList();
    }


    /**
    * Get films
    */
    getFilms(id: number = 1): Observable<Films[]> {

        let url = !id ? "https://swapi.dev/api/films/?page=" + id
            : "https://swapi.dev/api/films";

        return this._httpClient.get<Films[]>(url).pipe(
            map(res => res['results'])
        );
    }

    /**
    * Get films
    */
    getFilmList() {

        return forkJoin(
            [
                this.getFilms(1),
            ]
        ).pipe(
            map(([list]) => {

                return list;
            })
        );

    }

    /**
     * Get film by Id
     */
    getFilmById(id: number): Observable<Films> {

        return this._httpClient.get<Films>('https://swapi.dev/api/films/' + id).pipe(
            tap((film) => {
                this._film.next(film);
            })
        );
    }

    /**
     * Get Peoples
     */
    getPeoples(id?: number): Observable<People[]> {

        let url = "https://swapi.dev/api/people/?page=" + id;

        return this._httpClient.get<People[]>(url).pipe(
            map(res => res['results'])
        );
       
    }


    getPeopleList() {

       return forkJoin(
            [
                this.getPeoples(1),
                this.getPeoples(2),
                this.getPeoples(3),
                this.getPeoples(4),
                this.getPeoples(5),
                this.getPeoples(6),
                this.getPeoples(7),
                this.getPeoples(8),
                this.getPeoples(9)
            ]
        ).pipe(
            map(([list1, list2, list3, list4, list5, list6, list7, list8, list9]) => {

                var mergelist = [...list1, ...list2, ...list3, ...list4, ...list5,
                    ...list6, ...list7, ...list8, ...list9];

                return mergelist;
            })
        );

    }

    /**
     * Get People by Id
     */
    getPeopleById(id: number): Observable<People> {

        return this._httpClient.get<People>('https://swapi.dev/api/people/' + id).pipe(
            tap((people) => {
                this._people.next(people);
            })
        );
    }



    /**
     * Get Planets
     */
    getPlanets(id?: number): Observable<Planets[]> {

        let url = !id ? "https://swapi.dev/api/planets/?page=" + id
            : "https://swapi.dev/api/planets";

        return this._httpClient.get<Planets[]>(url).pipe(
            map(res => res['results'])
        );
    }

    getPlanetList() {

        return forkJoin(
            [
                this.getPlanets(1),
                this.getPlanets(2),
                this.getPlanets(3),
                this.getPlanets(4),
                this.getPlanets(5),
                this.getPlanets(6)
            ]
        ).pipe(
            map(([list1, list2, list3, list4, list5, list6]) => {

                var mergelist = [...list1, ...list2, ...list3, ...list4, ...list5, ...list6];

                return mergelist;
            })
        );

    }

    /**
     * Get planet by Id
     */
    getPlanetById(id: number): Observable<People> {

        return this._httpClient.get<People>('https://swapi.dev/api/people/' + id).pipe(
            tap((people) => {
                this._people.next(people);
            })
        );
    }

    /**
     * Get Species
     */
    getSpecies(id?: number): Observable<Species[]> {

        let url = !id ? "https://swapi.dev/api/species/?page=" + id
            : "https://swapi.dev/api/species";

        return this._httpClient.get<Species[]>(url).pipe(
            map(res => res['results'])
        );
    }

    /**
     * Get List Species
     */
    getSpeciesList() {

        return forkJoin(
            [
                this.getSpecies(1),
                this.getSpecies(2),
                this.getSpecies(3),
                this.getSpecies(4)
              
            ]
        ).pipe(
            map(([list1, list2, list3, list4]) => {

                var mergelist = [...list1, ...list2, ...list3, ...list4];

                return mergelist;
            })
        );

    }

    /**
     * Get Specie by Id
     */
    getSpecieById(id: number): Observable<Species> {

        return this._httpClient.get<Species>('https://swapi.dev/api/species/' + id).pipe(
            tap((specie) => {
                this._specie.next(specie);
            })
        );
    }

    /**
     * Get Starships
     */
    getStarships(id?: number): Observable<StarShips[]> {

        let url = !id ? "https://swapi.dev/api/starships/?page=" + id
            : "https://swapi.dev/api/starships";

        return this._httpClient.get<StarShips[]>(url).pipe(
            map(res => res['results'])
        );
    }

    /**
     * Get Starship list
     */

    getStarshipsList() {

        return forkJoin(
            [
                this.getStarships(1),
                this.getStarships(2),
                this.getStarships(3),
                this.getStarships(4)
            ]
        ).pipe(
            map(([list1, list2, list3, list4]) => {

                var mergelist = [...list1, ...list2, ...list3, ...list4];

                return mergelist;
            })
        );

    }

    /**
     * Get Starship by Id
     */
    getStarshipById(id: number): Observable<StarShips> {

        return this._httpClient.get<StarShips>('https://swapi.dev/api/starships/' + id).pipe(
            tap((starship) => {
                this._starship.next(starship);
            })
        );
    }


    /**
     * Get Vehicles
     */
    getVehicles(id?: number): Observable<Vehicles[]> {

        let url = !id ? "https://swapi.dev/api/vehicles/?page=" + id
            : "https://swapi.dev/api/vehicles";

        return this._httpClient.get<Vehicles[]>(url).pipe(
            map(res => res['results'])
        );
    }

    getVehicleList() {

        return  forkJoin(
            [
                this.getVehicles(1),
                this.getVehicles(2),
                this.getVehicles(3),
                this.getVehicles(4)
            ]
        ).pipe(
            map(([list1, list2, list3, list4]) => {

                var mergelist = [...list1, ...list2, ...list3, ...list4];

                return mergelist;
            })
        );

    }

    /**
     * Get Vehicle by Id
     */
    getVehicleById(id: number): Observable<Vehicles> {

        return this._httpClient.get<Vehicles>('https://swapi.dev/api/vehicle/' + id).pipe(
            tap((vehicle) => {
                this._vehicle.next(vehicle);
            })
        );
    }



}
