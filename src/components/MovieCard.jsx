import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Trash2 } from 'lucide-react';
import { API_CONFIG, getAuthHeaders } from '../lib/api';

const MovieCard = ({ movie, onMovieDeleted }) => {
  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir "${movie.title}"?`)) {
      try {
        const response = await fetch(`${API_CONFIG.RATINGS_BASE_URL}/${encodeURIComponent(movie.title)}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });

        if (response.ok) {
          onMovieDeleted();
        } else {
          alert('Erro ao excluir filme');
        }
      } catch (error) {
        alert('Erro de conexão');
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{movie.title}</CardTitle>
            <CardDescription className="mt-1">
              <Badge variant="secondary">{movie.genre}</Badge>
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {renderStars(movie.rating)}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {movie.rating}/10
            </span>
          </div>
          
          {movie.review && (
            <div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {movie.review}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;

