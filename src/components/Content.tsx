import { useContext } from "react";
import { genreContext } from "../contexts/GenreContext";
import { moviesContext } from "../contexts/MoviesContext";
import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

export function Content() {

  const { selectedGenre } = useContext(genreContext);
  const { movies } = useContext(moviesContext);

  return(
    <div className="container">
    <header>
      <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    </header>

    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  </div>
  )
}