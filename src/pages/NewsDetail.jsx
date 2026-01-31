import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { LoadingSpinner, ErrorMessage } from '../components/common';
import { API_URL } from '../config/constants';

export const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/news/${id}`);

        if (response.ok) {
          const data = await response.json();
          setNews(data);
        } else if (response.status === 404) {
          setError('Noticia no encontrada');
        } else {
          setError('Error al cargar la noticia');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error de conexión con el servidor');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <LoadingSpinner message="Cargando noticia..." />
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error || 'Noticia no encontrada'}>
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-cyan-600 hover:text-cyan-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Noticias
          </button>
        </ErrorMessage>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Botón Volver */}
      <div className="container-custom py-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/blog')}
          className="flex items-center text-gray-600 hover:text-cyan-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a Noticias
        </motion.button>
      </div>

      {/* Contenido de la Noticia */}
      <article className="container mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Imagen Principal */}
          {news.imageUrl ? (
            <div className="h-96 overflow-hidden">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%2306b6d4" width="800" height="400"/%3E%3Ctext fill="white" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImpo Escobedo de Lagos%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          ) : (
            <div className="h-96 bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold">Impo Escobedo de Lagos</h2>
                <p className="mt-2 text-cyan-50">Comercio Internacional</p>
              </div>
            </div>
          )}

          {/* Contenido */}
          <div className="p-8 md:p-12">
            {/* Categoría y Fecha */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-cyan-700 bg-cyan-50">
                <Tag className="h-4 w-4 mr-2" />
                {news.category}
              </span>
              <span className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(news.createdAt).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {news.title}
            </h1>

            {/* Extracto */}
            <p className="text-xl text-gray-600 mb-8 pb-8 border-b border-gray-200 leading-relaxed">
              {news.excerpt}
            </p>

            {/* Contenido Completo */}
            <div className="prose prose-lg max-w-none">
              {news.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))}
            </div>

            {/* Autor */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                <span className="font-semibold">Publicado por:</span> {news.author || 'Equipo Impo Escobedo'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Botón Volver al final */}
        <div className="max-w-4xl mx-auto mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/blog')}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
          >
            ← Volver a todas las Noticias
          </motion.button>
        </div>
      </article>
    </div>
  );
};
