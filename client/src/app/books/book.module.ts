
import { NgModule } from '@angular/core';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { BooksComponent } from './books.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        BooksComponent,
        AddComponent,
        DetailComponent,
        EditComponent,
    ],
    imports: [
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
