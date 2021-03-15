import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { genreContext } from "./GenreContext";

interface MoviesContextData{
    movies: MovieProps[]
}

interface MoviesProviderProps {
    children: ReactNode
}

interface MovieProps {
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
    imdbID: string;
}  

export const moviesContext = createContext({} as MoviesContextData)

export function MoviesProvider({ children }: MoviesProviderProps){

    const { selectedGenreId } = useContext(genreContext);

    const [movies, setMovies] = useState<MovieProps[]>([]);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
          setMovies(response.data);
        });

    }, [selectedGenreId]);

    return(
        <moviesContext.Provider value={{
            movies
        }}>
            { children }
        </moviesContext.Provider>
    )
}