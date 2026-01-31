import { motion } from 'framer-motion';
import { Ship, Anchor, TrendingUp } from 'lucide-react';
import { Card } from '../common';
import { SERVICES_DATA } from '../../config/constants';

const SERVICES_ICONS = [Ship, Anchor, TrendingUp];

export const Services = () => (
  <section className="section section-gray">
    <div className="container-custom">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="title-section mb-4">Nuestros Servicios</h2>
        <p className="text-subtitle max-w-2xl mx-auto">
          Soluciones integrales para todas tus necesidades de comercio exterior
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {SERVICES_DATA.map((service, index) => {
          const Icon = SERVICES_ICONS[index];
          return (
            <Card key={service.id} delay={index * 0.2}>
              <Icon className="w-12 h-12 text-cyan-600 mb-4" />
              <h3 className="title-card mb-3">{service.title}</h3>
              <p className="text-body">{service.shortDescription}</p>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);