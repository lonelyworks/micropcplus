import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Facebook, Smartphone, Laptop, Gamepad, HelpCircle, MapPin, Clock, Phone, Mail, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function MainContent() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    const newPath = newLang === 'en' ? '/en' : '/';
    window.location.href = newPath;
  };

  const mapUrl = "https://www.google.com/maps/place/2347+Rue+des+Ormeaux,+Montréal,+QC+H1L+4X2,+Canada";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-yellow-400">Micro PC Plus</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
              >
                <Languages size={24} />
                <span>{i18n.language.toUpperCase()}</span>
              </button>
              <a 
                href="https://www.facebook.com/micropcplus/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
              >
                <Facebook size={24} />
                <span>{t('followUs')}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('services')}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <ServiceCard 
                icon={<Laptop className="w-12 h-12 text-yellow-500" />}
                title={t('computerSales')}
                description={t('computerDesc')}
              />
              <ServiceCard 
                icon={<Smartphone className="w-12 h-12 text-yellow-500" />}
                title={t('mobileRepair')}
                description={t('mobileDesc')}
              />
              <ServiceCard 
                icon={<Gamepad className="w-12 h-12 text-yellow-500" />}
                title={t('consoleRepair')}
                description={t('consoleDesc')}
              />
              <ServiceCard 
                icon={<HelpCircle className="w-12 h-12 text-yellow-500" />}
                title={t('techConsult')}
                description={t('techDesc')}
              />
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('visitUs')}</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <a 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 hover:text-yellow-600 transition-colors"
                >
                  <MapPin className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <p className="text-lg">2347 rue des ormeaux, H1L 4X2, Montreal, QC, Canada</p>
                </a>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="text-lg font-semibold">{t('businessHours')}</p>
                    <p>{t('monFri')}</p>
                    <p>{t('saturday')}</p>
                    <p>{t('sunday')}</p>
                  </div>
                </div>
                <a 
                  href="tel:+15143534333"
                  className="flex items-start gap-4 hover:text-yellow-600 transition-colors"
                >
                  <Phone className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <p className="text-lg">{t('callUs')}: (514) 353-4333</p>
                </a>
                <a 
                  href="mailto:info@micro-pcplus.ca"
                  className="flex items-start gap-4 hover:text-yellow-600 transition-colors"
                >
                  <Mail className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <p className="text-lg">Email: info@micro-pcplus.ca</p>
                </a>
              </div>
              <div className="h-[400px] w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.3892833755387!2d-73.5274899!3d45.5728899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91e9f0be3d0d1%3A0x90d0cee4b04e95e0!2s2347%20Rue%20des%20Ormeaux%2C%20Montr%C3%A9al%2C%20QC%20H1L%204X2%2C%20Canada!5e0!3m2!1sen!2s!4v1709858547044!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Micro PC Plus. {t('allRights')}</p>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:border-yellow-400 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/en" element={<MainContent />} />
      <Route path="/" element={<MainContent />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;