import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CollectionListComponent } from './home/collection-list.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProjectsComponent } from './projects/projects.component';
import { InjectionsService } from './injections.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CollectionListComponent,
    FetchDataComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: CollectionListComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'projects', component: ProjectsComponent }
    ])
  ],
  providers: [InjectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
