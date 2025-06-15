import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Star } from 'lucide-react';
import { API_CONFIG, getAuthHeaders } from '../lib/api';

const AddMovieDialog = ({ onMovieAdded }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const genres = [
    'Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica',
    'Terror', 'Romance', 'Thriller', 'Documentário', 'Animação'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(API_CONFIG.RATINGS_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          title,
          genre,
          rating: parseFloat(rating),
          review
        }),
      });

      if (response.ok) {
        setTitle('');
        setGenre('');
        setRating('');
        setReview('');
        setOpen(false);
        onMovieAdded();
      } else {
        const error = await response.json();
        setError(error.detail || 'Erro ao adicionar filme');
      }
    } catch (error) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Adicionar Filme</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Avaliação</DialogTitle>
          <DialogDescription>
            Adicione um novo filme ou série à sua lista de avaliações.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Nome do filme ou série"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="genre">Gênero</Label>
            <Select value={genre} onValueChange={setGenre} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um gênero" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rating">Nota (0-10)</Label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="10"
              step="0.1"
              placeholder="8.5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="review">Resenha (opcional)</Label>
            <Textarea
              id="review"
              placeholder="Escreva sua opinião sobre o filme..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovieDialog;

