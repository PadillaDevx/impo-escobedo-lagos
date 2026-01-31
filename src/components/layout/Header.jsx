import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { DolphinLogo } from '../common';
import { NAV_ITEMS, BRANDING } from '../../config/constants';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Scroll al inicio al cambiar de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-md fixed w-full top-0 z-50">
      <nav className="max-w-[1280px] mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          {/* Logo + Nombre - Pegado a la izquierda */}
          <motion.div
            className="flex items-center space-x-3 -ml-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="text-cyan-600 flex items-center">
                <DolphinLogo className="w-12 h-12 ring-1 ring-cyan-300 rounded-full" />
              </div>
              <h1 className="text-xl font-bold text-cyan-600 hidden md:block">{BRANDING.name}</h1>
            </Link>
          </motion.div>

          {/* Desktop Menu - Centro */}
          <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`
                    relative px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${location.pathname === item.path
                      ? 'text-white bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50 translate-y-[-2px]'
                      : 'text-gray-700 hover:text-white hover:bg-gradient-to-br hover:from-cyan-400 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-400/40 hover:translate-y-[-2px]'
                    }
                  `}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden mt-4 space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  block py-2 px-4 rounded-lg transition-all duration-300
                  ${location.pathname === item.path
                    ? 'text-white bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md'
                    : 'text-gray-700 hover:text-white hover:bg-gradient-to-br hover:from-cyan-400 hover:to-blue-400'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
};