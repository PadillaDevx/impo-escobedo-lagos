import { motion } from 'framer-motion';
import { Target, Eye, Award } from 'lucide-react';
import { PageHero } from '../components/common';
import { VALUES_DATA, ANIMATIONS } from '../config/constants';

const VALUES_ICONS = [Target, Eye, Award];

export const About = () => {
  return (
    <div className="pt-20">
      <PageHero
        title="Nosotros"
        subtitle="Somos tu socio estratégico en comercio internacional"
      />

      {/* Historia */}
      <section className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...ANIMATIONS.whileInView}>
              <h2 className="text-4xl font-bold text-cyan-600 mb-6">Nuestra Historia</h2>
              <p className="text-gray-600 text-lg mb-4">
                Impo Escobedo de Lagos nace de la visión de conectar negocios locales con mercados globales,
                facilitando el comercio internacional a través de servicios especializados.
              </p>
              <p className="text-gray-600 text-lg">
                Con años de experiencia en el sector, nos hemos consolidado como líderes en asesoría
                logística y aduanal, ayudando a empresas a expandir sus horizontes comerciales.
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-cyan-500 to-blue-500 h-96 rounded-2xl"
              {...ANIMATIONS.whileInViewRight}
            />
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section section-gray">
        <div className="container-custom">
          <h2 className="title-section text-center mb-16">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES_DATA.map((item, i) => {
              const Icon = VALUES_ICONS[i];
              return (
                <motion.div
                  key={item.id}
                  className="card text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="text-cyan-600 flex justify-center mb-4 scale-125">
                    <Icon />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};