import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { FiMusic } from 'react-icons/fi';
import { FaPlane, FaMicroscope } from 'react-icons/fa';
import { SiApachecassandra } from 'react-icons/si';
import './Projects.css';

const projectIcons = {
    melodia: FiMusic,
    vibetrip: FaPlane,
    'cassandra-engine': SiApachecassandra,
    specforge: FaMicroscope,
};

function ProjectIcon({ id }) {
    const Icon = projectIcons[id];
    return Icon ? <Icon /> : null;
}

export default function Projects() {
    const { t, getList } = useLang();
    const [expandedId, setExpandedId] = useState(null);
    const items = getList('projects.items');

    return (
        <section id="projects" className="projects">
            <div className="section-header">
                <h2 className="section-title">{t('projects.title')}</h2>
                <p className="section-subtitle">{t('projects.subtitle')}</p>
            </div>

            <div className="projects-grid">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={`project-card ${index === 0 ? 'featured' : ''}`}
                    >
                        <div className="project-media">
                            <div className="project-img-placeholder">
                                <span className="project-icon"><ProjectIcon id={item.id} /></span>
                            </div>
                            <div className="project-overlay">
                                <button className="btn btn-primary btn-sm" onClick={() => setExpandedId(item.id)}>
                                    {t('projects.viewMore')}
                                </button>
                            </div>
                        </div>
                        <div className="project-info">
                            <h3 className="project-title">{item.title}</h3>
                            <p className="project-desc">{item.shortDesc}</p>
                            <div className="project-tags">
                                {item.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                            <div className="project-actions">
                                <a href={item.repo} target="_blank" rel="noopener noreferrer" className="project-link">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    <span>{t('projects.viewRepo')}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Expanded project modal */}
            {expandedId && (() => {
                const item = items.find(i => i.id === expandedId);
                if (!item) return null;
                return (
                    <div className="exp-modal-overlay" onClick={() => setExpandedId(null)}>
                        <div className="project-modal" onClick={e => e.stopPropagation()}>
                            <button className="exp-modal-close" onClick={() => setExpandedId(null)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>

                            <div className="project-modal-media">
                                <div className="project-modal-img-placeholder">
                                    <span className="project-icon-lg"><ProjectIcon id={item.id} /></span>
                                    <p>Media placeholder — add images, videos or audio here</p>
                                </div>
                            </div>

                            <h3 className="project-modal-title">{item.title}</h3>
                            <p className="project-modal-desc">{item.fullDesc}</p>

                            <div className="project-modal-tags">
                                {item.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>

                            <div className="project-modal-actions">
                                <a href={item.repo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    {t('projects.viewRepo')}
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </section>
    );
}
