import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from '../services/api';

interface genreContextData {
    selectedGenreId: number;
    genres: GenreResponseProps[];
    selectedGenre: GenreResponseProps;
    handleClickButton: (id: number) => void;
    setSelectedGenre: (selectedGenre: GenreResponseProps) => void
}

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface genreProviderProps {
    children: ReactNode;
}

export const genreContext = createContext({} as genreContextData);

export function GenreProvider({ children }: genreProviderProps){

    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {            
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {    
        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
          setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <genreContext.Provider value={{
            selectedGenreId,
            genres,
            selectedGenre,
            setSelectedGenre,
            handleClickButton
        }}>
            { children }
        </genreContext.Provider>
    )
}