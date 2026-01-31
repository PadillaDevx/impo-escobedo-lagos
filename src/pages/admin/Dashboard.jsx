import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LogOut,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Newspaper,
  Calendar,
  User as UserIcon
} from 'lucide-react';
import { logout, isAuthenticated, getToken, getUser } from '../../utils/auth';
import { API_URL, NEWS_CATEGORIES } from '../../config/constants';

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const navigate = useNavigate();
  const user = getUser();

  const fetchNews = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/api/news/admin/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNews(data);
      } else if (response.status === 401) {
        logout();
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error al cargar noticias:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta noticia?')) return;

    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error('Error al eliminar noticia:', error);
    }
  };

  const togglePublished = async (newsItem) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/api/news/${newsItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newsItem,
          published: !newsItem.published,
        }),
      });

      if (response.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Newspaper className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-500">Gestión de Noticias</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <UserIcon className="h-4 w-4" />
                <span>{user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Todas las Noticias ({news.length})
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingNews(null);
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Nueva Noticia</span>
          </motion.button>
        </div>

        {/* News List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando noticias...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No hay noticias aún. ¡Crea la primera!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {news.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                        }`}>
                        {item.published ? 'Publicado' : 'Borrador'}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{item.excerpt}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.createdAt).toLocaleDateString('es-MX')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => togglePublished(item)}
                      className="p-2 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                      title={item.published ? 'Ocultar' : 'Publicar'}
                    >
                      {item.published ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => {
                        setEditingNews(item);
                        setShowForm(true);
                      }}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Modal para crear/editar noticias */}
      {showForm && (
        <NewsFormModal
          news={editingNews}
          onClose={() => {
            setShowForm(false);
            setEditingNews(null);
          }}
          onSave={() => {
            setShowForm(false);
            setEditingNews(null);
            fetchNews();
          }}
        />
      )}
    </div>
  );
};

// Componente del formulario (lo crearemos en el siguiente archivo)
const NewsFormModal = ({ news, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: news?.title || '',
    excerpt: news?.excerpt || '',
    content: news?.content || '',
    category: news?.category || 'General',
    imageUrl: news?.imageUrl || '',
    published: news?.published || false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = getToken();
      const url = news
        ? `${API_URL}/api/news/${news._id}`
        : `${API_URL}/api/news`;

      const method = news ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      } else {
        alert('Error al guardar la noticia');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {news ? 'Editar Noticia' : 'Nueva Noticia'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Título de la noticia"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {NEWS_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Extracto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extracto *
            </label>
            <textarea
              required
              rows="2"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Breve descripción de la noticia"
            />
          </div>

          {/* URL de Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de la Imagen
            </label>
            <input
              type="url"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <p className="mt-2 text-sm text-gray-500">
              Puedes usar enlaces de servicios como Imgur, Google Drive, o cualquier URL pública de imagen.
            </p>
            {formData.imageUrl && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
                <img
                  src={formData.imageUrl}
                  alt="Vista previa"
                  className="w-full max-h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Contenido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido *
            </label>
            <textarea
              required
              rows="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Contenido completo de la noticia"
            />
          </div>

          {/* Publicado */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
              Publicar inmediatamente
            </label>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Noticia'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Dashboard;
