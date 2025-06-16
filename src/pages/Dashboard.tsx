import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ratingsService } from '../lib/services';
import Navbar from '../components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Star, Trash2, Film, Tv } from 'lucide-react';
import type { Rating, RatingCreate } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<RatingCreate>({
    title: '',
    genre: '',
    rating: 0
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const genres: string[] = [
    'Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica',
    'Terror', 'Romance', 'Thriller', 'Documentário', 'Animação',
    'Crime', 'Fantasia', 'Guerra', 'Musical', 'Mistério'
  ];

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async (): Promise<void> => {
    try {
      const data = await ratingsService.getUserRatings();
      setRatings(data);
    } catch (error) {
      setError('Erro ao carregar avaliações');
      console.error('Erro ao carregar avaliações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) || 0 : value
    }));
  };

  const handleGenreChange = (value: string): void => {
    setFormData(prev => ({ ...prev, genre: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await ratingsService.createRating(formData);
      
      setFormData({ title: '', genre: '', rating: 0 });
      setIsDialogOpen(false);
      await loadRatings();
    } catch (error: any) {
      setError(error.response?.data?.detail || 'Erro ao criar avaliação');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (title: string): Promise<void> => {
    if (!confirm(`Tem certeza que deseja excluir a avaliação de "${title}"?`)) {
      return;
    }

    try {
      await ratingsService.deleteRating(title);
      await loadRatings();
    } catch (error) {
      setError('Erro ao excluir avaliação');
      console.error('Erro ao excluir avaliação:', error);
    }
  };

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user?.name || user?.email}!
          </h1>
          <p className="text-gray-600">
            Gerencie suas avaliações de filmes e séries
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
              <Film className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ratings.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nota Média</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ratings.length > 0 
                  ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1)
                  : '0.0'
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gêneros Únicos</CardTitle>
              <Tv className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(ratings.map(r => r.genre)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Rating Button */}
        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Nova Avaliação</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Nova Avaliação</DialogTitle>
                <DialogDescription>
                  Avalie um filme ou série que você assistiu recentemente
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Nome do filme ou série"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre">Gênero</Label>
                  <Select value={formData.genre} onValueChange={handleGenreChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Nota (0-10)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={formData.rating || ''}
                    onChange={handleInputChange}
                    placeholder="Ex: 8.5"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Salvando...' : 'Salvar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Ratings List */}
        <div className="space-y-4">
          {ratings.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Film className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhuma avaliação ainda
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Comece avaliando seus filmes e séries favoritos
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    Adicionar primeira avaliação
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ratings.map((rating, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{rating.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {rating.genre}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(rating.title)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(rating.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {rating.rating}/10
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

