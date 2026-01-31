import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button, PageHero } from '../components/common';
import { API_URL, CONTACT_INFO, SCHEDULE, ANIMATIONS } from '../config/constants';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: '✅ Mensaje enviado correctamente! Te contactaremos pronto.'
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: '❌ ' + data.message
        });
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      setSubmitStatus({
        type: 'error',
        message: '❌ Error al enviar el mensaje. Verifica que el servidor esté funcionando.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    { icon: Phone, title: 'Teléfono', value: CONTACT_INFO.phone },
    { icon: Mail, title: 'Email', value: CONTACT_INFO.email },
    { icon: MapPin, title: 'Ubicación', value: `${CONTACT_INFO.location.city}, ${CONTACT_INFO.location.state}`, extra: CONTACT_INFO.location.country }
  ];

  return (
    <div className="pt-20">
      <PageHero
        title="Contacto"
        subtitle="¿Listo para expandir tu negocio? Estamos aquí para ayudarte"
      />

      {/* Contact Section */}
      <section className="section section-gray">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <motion.div {...ANIMATIONS.slideInLeft}>
              <h2 className="text-4xl font-bold text-cyan-600 mb-6">
                Hablemos de tu Proyecto
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Nuestro equipo de expertos está listo para asesorarte en todas tus necesidades
                de comercio internacional. Contáctanos y descubre cómo podemos ayudarte.
              </p>

              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, title, value, extra }) => (
                  <div key={title} className="flex items-start space-x-4">
                    <div className="bg-cyan-500 text-white p-3 rounded-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
                      <p className="text-gray-600">{value}</p>
                      {extra && <p className="text-gray-600">{extra}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Horarios */}
              <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">Horarios de Atención</h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-semibold">Lunes - Viernes:</span> {SCHEDULE.weekday}</p>
                  <p><span className="font-semibold">Sábado:</span> {SCHEDULE.saturday}</p>
                  <p><span className="font-semibold">Domingo:</span> {SCHEDULE.sunday}</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...ANIMATIONS.slideInRight}>
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="(474) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                      placeholder="Cuéntanos sobre tu proyecto..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
                    <Send className="w-4 h-4" />
                  </Button>

                  {/* Mensaje de estado */}
                  {submitStatus.message && (
                    <div className={`
                      p-4 rounded-lg text-center font-medium
                      ${submitStatus.type === 'success'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                      }
                    `}>
                      {submitStatus.message}
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  * Campos obligatorios. Tus datos están protegidos y no serán compartidos.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="h-96 bg-gray-300">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-gray-700/20">
          <p className="text-gray-600 text-lg">[ Mapa de ubicación - Integrar Google Maps ]</p>
        </div>
      </section>
    </div>
  );
};