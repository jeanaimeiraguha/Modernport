// src/CVPage.jsx - IRAGUHA Jean Aime CV

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaGlobe, FaPhone, FaMapMarkerAlt,
  FaReact, FaNodeJs, FaPhp, FaDatabase, FaPython, FaGitAlt, FaDocker,
  FaBriefcase, FaGraduationCap, FaAward, FaStar, FaSun, FaMoon
} from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiMysql, SiTailwindcss, SiFlutter, SiSolidity } from 'react-icons/si';

const Section = ({ title, icon, children }) => (
  <section className="mb-8 print:mb-4">
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b-2 border-cyan-500 dark:border-cyan-400 pb-1 mb-4 flex items-center gap-2 print:text-black">
      {icon} {title}
    </h2>
    {children}
  </section>
);

const DarkModeToggle = ({ darkMode, setDarkMode }) => (
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="fixed bottom-4 right-4 bg-white dark:bg-slate-700 p-3 rounded-full shadow-lg z-50 print:hidden"
    aria-label="Toggle Dark Mode"
  >
    {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-slate-800" />}
  </button>
);

export default function CVPage({ darkMode: darkModeProp, setDarkMode: setDarkModeProp, isModal = false }) {
  const { t } = useTranslation();

  // Combine static data with translated data
  const cvData = {
    name: "IRAGUHA Jean Aime",
    contacts: {
      github: "github.com/jeanaimeiraguha",
      portfolio: "iraguha-jean-aime.vercel.app",
      email: "jeanaimeiraguha@gmail.com",
      phone: "+250 793 411 594",
    },
  };

  // This allows the component to either control its own state (standalone page)
  // or be controlled by a parent component (modal).
  const [internalDarkMode, setInternalDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const isControlled = darkModeProp !== undefined;
  const darkMode = isControlled ? darkModeProp : internalDarkMode;
  const setDarkMode = isControlled ? setDarkModeProp : setInternalDarkMode;

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* The background and padding are adjusted if it's not in a modal */}
      <div className={`${!isModal ? 'bg-gray-100 dark:bg-slate-900 min-h-screen p-4 sm:p-8' : 'bg-white dark:bg-slate-800'} font-sans transition-colors duration-300`}>
        {/* The dark mode toggle is only shown on the standalone page */}
        {!isModal && <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />}
        
        {/* The main content container */}
        <div className={`max-w-4xl mx-auto bg-white dark:bg-slate-800 ${!isModal ? 'shadow-2xl rounded-lg' : ''} print:shadow-none print:rounded-none`}>
          {/* Header */}
          <header className="bg-slate-700 dark:bg-slate-900 text-white p-8 rounded-t-lg print:bg-white print:text-black">
            <h1 className="text-4xl font-bold text-cyan-400 print:text-black">{t('hero.firstName')} {t('hero.lastName')}</h1>
            <p className="text-lg text-slate-300 dark:text-slate-400 mt-1 print:text-gray-600">{t('cv.title')}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-4 text-slate-200 dark:text-slate-300 print:text-gray-700">
              <a href={`mailto:${cvData.contacts.email}`} className="flex items-center gap-2 hover:text-cyan-400"><FaEnvelope /> {cvData.contacts.email}</a>
              <a href={`tel:${cvData.contacts.phone}`} className="flex items-center gap-2 hover:text-cyan-400"><FaPhone /> {cvData.contacts.phone}</a>
              <span className="flex items-center gap-2"><FaMapMarkerAlt /> {t('personal.location')}</span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-2 text-slate-200 dark:text-slate-300 print:text-gray-700">
              <a href={`https://${cvData.contacts.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-400"><FaGithub /> {cvData.contacts.github}</a>
            </div>
          </header>

          <main className="p-8 print:p-0">
            {/* Profile Summary */}
            <Section title={t('cv.profileSummary')} icon={<FaBriefcase />}>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed print:text-black">{t('cv.summary')}</p>
            </Section>

            {/* Core Skills */}
            <Section title={t('cv.coreSkills')} icon={<FaStar />}>
              <div className="space-y-3">
                {Object.entries(t('cv.skills', { returnObjects: true }) || {}).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200 print:text-black">{t(`cv.skillsCategories.${category}`, category)}:</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm print:text-black">{Array.isArray(skills) ? skills.join(', ') : ''}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Key Projects */}
            <Section title={t('cv.keyProjects')} icon={<FaReact />}>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 print:text-black">
                {Array.isArray(t('cv.projectsList', { returnObjects: true })) && t('cv.projectsList', { returnObjects: true }).map(p => (
                  <li key={p.title}>
                    <span className="font-semibold">{p.title}:</span> {p.description}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Work Experience */}
            <Section title={t('cv.workExperience')} icon={<FaBriefcase />}>
              <div className="space-y-4">
                {Array.isArray(t('cv.experience', { returnObjects: true })) && t('cv.experience', { returnObjects: true }).map(exp => (
                  <div key={exp.role}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-800 dark:text-gray-200 print:text-black">{exp.role} {exp.company && `- ${exp.company}`}</h3>
                      {exp.date && <p className="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">{exp.date}</p>}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 print:text-black">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Education */}
            <Section title={t('cv.education')} icon={<FaGraduationCap />}>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 print:text-black">
                {Array.isArray(t('cv.educationList', { returnObjects: true })) && t('cv.educationList', { returnObjects: true }).map(edu => <li key={edu}>{edu}</li>)}
              </ul>
            </Section>

            {/* Achievements */}
            <Section title={t('cv.achievements')} icon={<FaAward />}>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 print:text-black">
                {Array.isArray(t('cv.achievementsList', { returnObjects: true })) && t('cv.achievementsList', { returnObjects: true }).map(ach => <li key={ach}>{ach}</li>)}
              </ul>
            </Section>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Languages */}
              <Section title={t('cv.languages')}>
                <p className="text-gray-700 dark:text-gray-300 print:text-black">{Array.isArray(t('cv.languagesList', { returnObjects: true })) ? t('cv.languagesList', { returnObjects: true }).join(', ') : ''}</p>
              </Section>

              {/* Interests */}
              <Section title={t('cv.interests')}>
                <p className="text-gray-700 dark:text-gray-300 print:text-black">{Array.isArray(t('cv.interestsList', { returnObjects: true })) ? t('cv.interestsList', { returnObjects: true }).join(', ') : ''}</p>
              </Section>
            </div>
          </main>
        </div>
        {/* Footer is only shown on the standalone page */}
        {!isModal && (
          <footer className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400 print:hidden">
            <p>This CV was generated from my portfolio.</p>
          </footer>
        )}
      </div>
    </div>
  );
}