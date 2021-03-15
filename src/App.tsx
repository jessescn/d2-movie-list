import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { GenreProvider } from './contexts/GenreContext';
import { MoviesProvider } from './contexts/MoviesContext';

import './styles/global.scss';

export function App() {

  return (
    <GenreProvider>
      <MoviesProvider>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SideBar />
          <Content />
        </div>
      </MoviesProvider>
  </GenreProvider>   
  )
}