import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { FiImage } from 'react-icons/fi';
import './Experience.css';

// Orden cronológico (mayor = más reciente, va arriba). Editable: YYYYMM.
const SORT = {
    uba: 202607,         // Graduación UBA — julio 2026 (ingreso marzo 2023)
    lovelytics: 202512,  // Dic 2025 — Presente
    teaching: 202511,    // Docencia FIUBA — presente, pero inició antes que Lovelytics
    fiubaton: 202509,    // Septiembre 2025
    pellegrini: 202112,  // Secundario 2017–2021 (egreso)
    olympiad: 202000,    // Olimpiada de Informática — 2020
};

export default function Journey() {
    const { t, getList } = useLang();
    const [activeId, setActiveId] = useState(null);
    // null | 'academic' | 'work' — solo una línea puede ocultarse a la vez
    const [hidden, setHidden] = useState(null);
    // Acordeones por cliente de la línea de tiempo interna (Lovelytics)
    const [openClients, setOpenClients] = useState({});

    const toggleHidden = (side) =>
        setHidden(prev => (prev === side ? null : side));

    const toggleClient = (id) =>
        setOpenClients(prev => ({ ...prev, [id]: !prev[id] }));

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
        clients: it.clients || [],
        nodes: [],
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
        clients: [],
        nodes: [],
    }));

    // Docencia en FIUBA (experiencia laboral, con trayectoria interna)
    const teaching = {
        id: 'teaching',
        category: 'work',
        title: t('teaching.title'),
        subtitle: t('teaching.subtitle'),
        period: t('teaching.period'),
        location: '',
        desc: '',
        body: '',
        tags: [],
        clients: [],
        nodes: getList('teaching.nodes'),
    };

    const items = [...work, ...academic, teaching].sort(
        (a, b) => (SORT[b.id] || 0) - (SORT[a.id] || 0)
    );

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
                {items.map(item => {
                    const isCollapsed = hidden === item.category;
                    const isExpanded = activeId === item.id && !isCollapsed;
                    return (
                    <div
                        key={item.id}
                        className={`timeline-item cat-${item.category} ${isCollapsed ? 'collapsed' : ''} ${isExpanded ? 'expanded' : ''} ${item.clients.length ? 'has-nested' : ''}`}
                        onClick={() => setActiveId(prev => (prev === item.id ? null : item.id))}
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
                                <span className="timeline-period">
                                    {item.period}{item.location ? ` · ${item.location}` : ''}
                                </span>
                                <h3 className="timeline-company">{item.title}</h3>
                                <p className="timeline-role">{item.subtitle}</p>
                                {item.desc && <p className="timeline-desc">{item.desc}</p>}

                                <div className="timeline-extra">
                                    {item.clients.length > 0 ? (
                                        <div className="nested-timeline">
                                            {item.clients.map(c => {
                                                const open = !!openClients[c.id];
                                                return (
                                                    <div key={c.id} className={`nested-item ${open ? 'open' : ''}`}>
                                                        <span className="nested-dot" />
                                                        <div className="nested-content">
                                                            <div className="nested-head">
                                                                <span className="nested-label">{c.label}</span>
                                                                {c.period && <span className="nested-period">{c.period}</span>}
                                                            </div>
                                                            <p className="nested-desc">{c.desc}</p>
                                                            <button
                                                                type="button"
                                                                className="nested-more"
                                                                onClick={(e) => { e.stopPropagation(); toggleClient(c.id); }}
                                                            >
                                                                <span>{open ? t('projects.showLess') : t('projects.viewMore')}</span>
                                                                <svg className="nested-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                                            </button>
                                                            <div className="nested-gallery">
                                                                {[0, 1].map(i => (
                                                                    <div key={i} className="nested-gallery-item"><FiImage /></div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : item.nodes.length > 0 ? (
                                        <div className="nested-timeline">
                                            {item.nodes.map(n => (
                                                <div key={n.id} className="nested-item">
                                                    <span className="nested-dot" />
                                                    <div className="nested-content">
                                                        <div className="nested-head">
                                                            <span className="nested-label">{n.label}</span>
                                                            {n.period && <span className="nested-period">{n.period}</span>}
                                                        </div>
                                                        <p className="nested-desc">{n.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            {item.body !== item.desc && (
                                                <p className="timeline-fulldesc">{item.body}</p>
                                            )}
                                            <div className="timeline-gallery">
                                                {[0, 1, 2].map(i => (
                                                    <div key={i} className="timeline-gallery-item"><FiImage /></div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {item.tags.length > 0 && (
                                    <div className="timeline-tags">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                )}
                                <button
                                    className="timeline-read-more"
                                    onClick={(e) => { e.stopPropagation(); setActiveId(prev => (prev === item.id ? null : item.id)); }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    <span>{isExpanded ? t('projects.showLess') : t('projects.viewMore')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
        </section>
    );
}
