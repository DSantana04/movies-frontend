import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎬 CineRate
          </h1>
          <p className="text-gray-600">
            Sua plataforma de avaliações de filmes e séries
          </p>
        </div>
        
        {isLogin ? (
          <Login onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;

