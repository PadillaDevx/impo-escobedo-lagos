import { motion } from 'framer-motion';
import { Ship, Anchor, TrendingUp, Globe, FileCheck, Clock } from 'lucide-react';
import { Card, PageHero } from '../components/common';
import { SERVICES_DATA, BENEFITS_DATA } from '../config/constants';

const SERVICES_ICONS = [Ship, Anchor, TrendingUp];
const BENEFITS_ICONS = { Globe, FileCheck, Clock };

export const ServicesPage = () => {

  return (
    <div className="pt-20">
      <PageHero
        title="Nuestros Servicios"
        subtitle="Soluciones integrales de comercio exterior diseñadas para impulsar tu negocio a nivel internacional"
      />

      {/* Main Services */}
      <section className="section section-gray">
        <div className="container-custom">
          <div className="space-y-16">
            {SERVICES_DATA.map((service, index) => {
              const Icon = SERVICES_ICONS[index];
              return (
                <motion.div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                    <div>
                      <div className="text-cyan-600 mb-6"><Icon className="w-16 h-16" /></div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">{service.title}</h2>
                      <p className="text-gray-600 text-lg mb-6">{service.fullDescription}</p>
                    </div>
                    <div className="flex items-center">
                      <ul className="space-y-4">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-cyan-600 mr-3 text-xl">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-cyan-600 mb-12">¿Por qué elegirnos?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {BENEFITS_DATA.map((benefit, index) => {
              const Icon = BENEFITS_ICONS[benefit.icon];
              return (
                <Card key={benefit.id} delay={index * 0.1} className="text-center">
                  <div className="text-cyan-600 flex justify-center mb-4">
                    <Icon />
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{benefit.text}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};