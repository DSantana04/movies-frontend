import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import AddMovieDialog from './AddMovieDialog';
import MovieCard from './MovieCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Film } from 'lucide-react';
import { API_CONFIG, getAuthHeaders } from '../lib/api';

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const { user } = useAuth();

  const genres = [
    'Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica',
    'Terror', 'Romance', 'Thriller', 'Documentário', 'Animação'
  ];

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_CONFIG.RATINGS_BASE_URL, {
        headers: getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data);
      } else {
        console.error('Erro ao buscar filmes');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genreFilter !== 'all') {
      filtered = filtered.filter(movie => movie.genre === genreFilter);
    }

    setFilteredMovies(filtered);
  }, [movies, searchTerm, genreFilter]);

  const handleMovieAdded = () => {
    fetchMovies();
  };

  const handleMovieDeleted = () => {
    fetchMovies();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Minhas Avaliações
          </h2>
          <p className="text-gray-600">
            Gerencie suas avaliações de filmes e séries
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={genreFilter} onValueChange={setGenreFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por gênero" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os gêneros</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <AddMovieDialog onMovieAdded={handleMovieAdded} />
        </div>

        {filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <Film className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {movies.length === 0 ? 'Nenhuma avaliação ainda' : 'Nenhum resultado encontrado'}
            </h3>
            <p className="text-gray-600 mb-4">
              {movies.length === 0 
                ? 'Comece adicionando sua primeira avaliação de filme!'
                : 'Tente ajustar os filtros de busca.'
              }
            </p>
            {movies.length === 0 && (
              <AddMovieDialog onMovieAdded={handleMovieAdded} />
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie, index) => (
              <MovieCard
                key={`${movie.title}-${index}`}
                movie={movie}
                onMovieDeleted={handleMovieDeleted}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

