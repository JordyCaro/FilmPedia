import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  {
    path: '**',
    redirectTo: '',
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      /* Activa las anclas en angular */
      anchorScrolling: 'enabled',
      /* Restaura el scroll a la posición inicial */
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
