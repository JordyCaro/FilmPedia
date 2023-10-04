import { Component, OnInit } from '@angular/core';
import { ThemoviesdbService } from '../themoviesdb.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movieList: any;
  options = { page: 1}
  pager = { currentPage: 1, totalPages: 0 };



  constructor(
    private theMovieDBService: ThemoviesdbService,
    private router: Router) {
    this.getDiscover(this.options);
  }

  ngOnInit(): void {
  }

  getDiscover(options: any) {
    this.theMovieDBService.getDiscover('movie', options).subscribe(
      (res: any) => {
        console.log('Response from getDiscover:', res);
        this.pager.totalPages = res.total_pages;
        if(this.movieList == undefined) {
          this.movieList = res.results;
        } else {
          this.movieList.push(...res.results);
        }

        this.movieList.forEach((movie: any) => {
          movie.poster_path = `${environment.imgUrl}${movie.poster_path}`;
          movie.backdrop_path = `${environment.imgUrl}${movie.backdrop_path}`;
        })
      },
      (error) => {
        console.error('Error in getDiscover:', error);
      },
    );
  }

  showOverlay(event: any) {
    const overlay = event.target.querySelector('.pelicula__overlay');
    const excerpt = event.target.querySelector('.pelicula__overlay-excerpt');
    overlay.style.opacity = '1';
    excerpt.style.maxHeight = '50px';
}

hideOverlay(event: any) {
    const overlay = event.target.querySelector('.pelicula__overlay');
    const excerpt = event.target.querySelector('.pelicula__overlay-excerpt');
    overlay.style.opacity = '0';
    excerpt.style.maxHeight = '0';
}


  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details', movie.id]);
  }

  loadMore() {
    this.options.page++;
    this.getDiscover(this.options);
  }
}
