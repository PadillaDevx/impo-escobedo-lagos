import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export const BlogPreview = () => {
  // TODO: Reemplazar con datos dinámicos de la API
  const posts = [];

  return (
    <section className="section">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="title-section mb-4">Noticias</h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Mantente actualizado sobre comercio exterior y tendencias internacionales
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Visita nuestra sección de noticias para ver el contenido más reciente.</p>
            <Link to="/blog" className="inline-block mt-4 text-cyan-600 font-semibold hover:underline">
              Ver todas las noticias →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                className="border border-gray-200 rounded-xl p-6 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <FileText className="w-4 h-4 mr-2" />
                  {post.date}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="text-cyan-600 font-semibold hover:underline">
                  Leer más →
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};