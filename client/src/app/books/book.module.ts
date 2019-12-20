
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
// import { FormsModule } from "@angular/forms";
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { BooksComponent } from './books.component';
import { RouterModule } from '@angular/router';
import {
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
  } from "@angular/material";

@NgModule({
    declarations: [
        BooksComponent,
        AddComponent,
        DetailComponent,
        EditComponent,
    ],
    imports: [
        MatProgressSpinnerModule,
        CommonModule,
        // FormsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,

        RouterModule.forRoot([
            { path: '', component: BooksComponent },
            { path: 'add', component: AddComponent },
            { path: 'detail/:id', component: DetailComponent },
            { path: 'edit/:id', component: EditComponent },
        ])
    ],
    providers: [],
    bootstrap: []
})
export class BookModule {
}
