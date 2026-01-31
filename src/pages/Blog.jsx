import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { PageHero, LoadingSpinner, ErrorMessage } from '../components/common';
import { API_URL } from '../config/constants';

export const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/news`);

        if (response.ok) {
          const data = await response.json();
          // Asegurar que data es un array
          setPosts(Array.isArray(data) ? data : []);
        } else {
          setError('No se pudieron cargar las noticias');
          setPosts([]);
        }
      } catch (error) {
        console.error('Error al cargar noticias:', error);
        setError('Error de conexión con el servidor');
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-20">
      <PageHero
        title="Noticias"
        subtitle="Mantente actualizado con las últimas tendencias, tips y noticias del comercio internacional"
      />

      {/* Posts Grid */}
      <section className="section section-gray">
        <div className="container-custom">
          {isLoading ? (
            <LoadingSpinner message="Cargando noticias..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No hay noticias publicadas aún.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post._id}
                  onClick={() => navigate(`/blog/${post._id}`)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Imagen de la noticia */}
                  {post.imageUrl ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentElement.innerHTML = '<div class="h-48 bg-gradient-to-br from-cyan-500 to-blue-500"></div>';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-cyan-500 to-blue-500"></div>
                  )}

                  <div className="p-6">
                    <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.createdAt).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <span className="text-cyan-600 font-semibold hover:underline">
                        Leer más →
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};