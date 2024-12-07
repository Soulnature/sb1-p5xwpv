import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { FamilyImmigration } from './pages/services/FamilyImmigration';
import { StatusAdjustment } from './pages/services/StatusAdjustment';
import { ReentryPermit } from './pages/services/ReentryPermit';
import { PermanentGreenCard } from './pages/services/PermanentGreenCard';
import { FileReview } from './pages/services/FileReview';
import { EadRenewal } from './pages/services/EadRenewal';
import { FianceVisa } from './pages/services/FianceVisa';
import { Translation } from './pages/services/Translation';
import { Authentication } from './pages/services/Authentication';
import { Interpretation } from './pages/services/Interpretation';
import { Citizenship } from './pages/services/Citizenship';
import { OtherServices } from './pages/services/OtherServices';
import { ServicePage } from './pages/services/ServicePage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { servicePages } from './data/servicePages';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/family-immigration" element={<FamilyImmigration />} />
            <Route path="/services/status-adjustment" element={<StatusAdjustment />} />
            <Route path="/services/reentry-permit" element={<ReentryPermit />} />
            <Route path="/services/permanent-green-card" element={<PermanentGreenCard />} />
            <Route path="/services/file-review" element={<FileReview />} />
            <Route path="/services/ead-renewal" element={<EadRenewal />} />
            <Route path="/services/fiance-visa" element={<FianceVisa />} />
            <Route path="/services/translation" element={<Translation />} />
            <Route path="/services/authentication" element={<Authentication />} />
            <Route path="/services/interpretation" element={<Interpretation />} />
            <Route path="/services/citizenship" element={<Citizenship />} />
            <Route path="/services/visa" element={<ServicePage service={servicePages.visa} />} />
            <Route path="/services/other" element={<OtherServices />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}