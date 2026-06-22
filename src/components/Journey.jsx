import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { FiImage } from 'react-icons/fi';
import './Experience.css';

// Orden cronológico (mayor = más reciente, va arriba). Editable: YYYYMM.
const SORT = {
    uba: 202607,         // Graduación UBA — julio 2026 (ingreso marzo 2023)
    lovelytics: 202512,  // Dic 2025 — Presente
    fiubaton: 202509,    // Septiembre 2025
    pellegrini: 202112,  // Secundario 2017–2021 (egreso)
    olympiad: 202000,    // Olimpiada de Informática — 2020
};

export default function Journey() {
    const { t, getList } = useLang();
    const [activeId, setActiveId] = useState(null);
    // null | 'academic' | 'work' — solo una línea puede ocultarse a la vez
    const [hidden, setHidden] = useState(null);

    const toggleHidden = (side) =>
        setHidden(prev => (prev === side ? null : side));

    const work = getList('experience.items').map(it => ({
        id: it.id,
        // FIUBAtón es un logro académico aunque viva en experience.items
        category: it.id === 'fiubaton' ? 'academic' : 'work',
        title: it.company,
        subtitle: it.role,
        period: it.period,
        location: it.location,
        desc: it.shortDesc,
        body: it.fullDesc,
        tags: it.tags || [],
    }));

    const academic = getList('academic.items').map(it => ({
        id: it.id,
        category: 'academic',
        title: it.institution,
        subtitle: it.degree,
        period: it.period,
        location: '',
        desc: it.description,
        body: it.description,
        tags: it.highlight ? [it.highlight] : [],
    }));

    const items = [...work, ...academic].sort(
        (a, b) => (SORT[b.id] || 0) - (SORT[a.id] || 0)
    );

    const activeItem = items.find(i => i.id === activeId);

    return (
        <section id="journey" className="experience">
            <div className="section-header reveal">
                <h2 className="section-title">{t('journey.title')}</h2>
                <p className="section-subtitle">{t('journey.subtitle')}</p>
            </div>

            <div className="timeline reveal-fade">
                <div className={`timeline-axis line-academic ${hidden === 'academic' ? 'line-hidden' : ''}`}>
                    <button
                        type="button"
                        className={`timeline-axis-label ${hidden === 'academic' ? 'is-collapsed' : ''}`}
                        onClick={() => toggleHidden('academic')}
                    >
                        {t('nav.academic')}
                    </button>
                </div>
                <div className={`timeline-axis line-work ${hidden === 'work' ? 'line-hidden' : ''}`}>
                    <button
                        type="button"
                        className={`timeline-axis-label ${hidden === 'work' ? 'is-collapsed' : ''}`}
                        onClick={() => toggleHidden('work')}
                    >
                        {t('nav.experience')}
                    </button>
                </div>
                {items.map(item => (
                    <div
                        key={item.id}
                        className={`timeline-item cat-${item.category} ${hidden === item.category ? 'collapsed' : ''}`}
                        onClick={() => setActiveId(item.id)}
                    >
                        <div className="timeline-dot">
                            <div className="timeline-dot-inner" />
                        </div>
                        <div className="timeline-card">
                            <div className="timeline-card-image">
                                <div className="timeline-img-placeholder">
                                    <span>{item.title.charAt(0)}</span>
                                </div>
                            </div>
                            <div className="timeline-card-content">
                                <span className={`timeline-cat-label cat-${item.category}`}>
                                    {item.category === 'work' ? t('nav.experience') : t('nav.academic')}
                                </span>
                                <span className="timeline-period">{item.period}</span>
                                <h3 className="timeline-company">{item.title}</h3>
                                <p className="timeline-role">{item.subtitle}</p>
                                <p className="timeline-desc">{item.desc}</p>
                                {item.tags.length > 0 && (
                                    <div className="timeline-tags">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                )}
                                <button className="timeline-read-more">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    <span>{t('projects.viewMore')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal overlay */}
            {activeItem && (
                <div className="exp-modal-overlay" onClick={() => setActiveId(null)}>
                    <div className="exp-modal" onClick={e => e.stopPropagation()}>
                        <button className="exp-modal-close" onClick={() => setActiveId(null)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                        <div className="exp-modal-header">
                            <div className="exp-modal-img-placeholder">
                                <span>{activeItem.title.charAt(0)}</span>
                            </div>
                            <div>
                                <h3>{activeItem.title}</h3>
                                <p className="exp-modal-role">{activeItem.subtitle}</p>
                                <p className="exp-modal-meta">
                                    {activeItem.period}{activeItem.location ? ` · ${activeItem.location}` : ''}
                                </p>
                            </div>
                        </div>
                        <div className="exp-modal-body">
                            <p>{activeItem.body}</p>
                        </div>
                        {activeItem.tags.length > 0 && (
                            <div className="exp-modal-tags">
                                {activeItem.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        )}
                        <div className="exp-modal-media">
                            <div className="media-placeholder">
                                <span><FiImage /></span>
                                <p>Media placeholder — add images or videos here</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
