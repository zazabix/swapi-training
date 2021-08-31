import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort'

import {
    Films, People, Planets, Species, StarShips, Vehicles
} from 'app/modules/admin/starwars/starwars.types';

import { StarwarsService } from './../starwars.service';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],

})
export class PeopleComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    listPeople: People[];

    people$: Observable<People>;

    displayedColumns = ['name', 'height', 'hair_color', 'skin_color', 'birth_year', 'gender'];

    dataSource: MatTableDataSource<People>;

    start: number = 0;
    limit: number = 10;
    end: number = this.limit + this.start;
    selectedRowIndex: number = null;

    @ViewChild(MatSort) sort: MatSort;

    expandedElement: People | null;

    selectedPeopleForm: FormGroup;


    constructor(
        private _starwarsService: StarwarsService,
        private _formBuilder: FormBuilder,
    ) {

    }

    ngOnInit(): void {

        // Create the selected people form
        this.selectedPeopleForm = this._formBuilder.group({
            name: [''],
            height: [''],
            mass: ['', [Validators.required]],
            hair_color: [''],
            skin_color: [[]],
            birth_year: [''],
            gender: [''],
            homeworld: [''],
            films: [[]],
            species: [[]],
            vehicles: [[]],
            starships: [[]],
            created: [''],
            edited: [''],
            url: ['']
        });


        this._starwarsService.getPeopleList().subscribe(res => {
            this.listPeople = res;

                this.dataSource = new MatTableDataSource<People>(this.getTableData(this.start, this.end));

                this.dataSource.sort = this.sort;

                this.updateIndex();
        });


    }

    onTableScroll(e) {
/*        console.log(e)*/
        const tableViewHeight = e.target.offsetHeight // viewport
        const tableScrollHeight = e.target.scrollHeight // length of all table
        const scrollLocation = e.target.scrollTop; // how far user scrolled

        // If the user has scrolled within 200px of the bottom, add more data
        const buffer = 200;
        const limit = tableScrollHeight - tableViewHeight - buffer;
        if (scrollLocation > limit) {
            let data = this.getTableData(this.start, this.end);

            this.dataSource.data.push(...data);

            this.dataSource = new MatTableDataSource<People>(this.dataSource.data);

            this.dataSource.sort = this.sort;

            this.updateIndex();
        }
    }

    getTableData(start, end) {

        var peoplelist = this.listPeople.filter((value, index) => index >= start && index < end);
        
        return peoplelist;
    }

    updateIndex() {
        this.start = this.end;
        this.end = this.limit + this.start;
    }

    selectedRow(row, row1) {
        /*console.log('selectedRow', row, ' >>> Index : ', i) // why index is undefined???*/

        console.log('row  >>', row, 'row1 >>>', row1);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;

        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
