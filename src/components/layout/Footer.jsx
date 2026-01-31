import { Link } from 'react-router-dom';
import { DolphinLogo } from '../common';
import { BRANDING, FOOTER_LINKS } from '../../config/constants';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-blue-400">
                <DolphinLogo />
              </div>
              <span className="font-bold text-white">{BRANDING.shortName}</span>
            </div>
            <p className="text-sm">{BRANDING.tagline}</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2024 {BRANDING.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};