import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { FiImage } from 'react-icons/fi';
import './Experience.css';

export default function Experience() {
    const { t, getList } = useLang();
    const [activeId, setActiveId] = useState(null);
    const items = getList('experience.items');

    const activeItem = items.find(item => item.id === activeId);

    return (
        <section id="experience" className="experience">
            <div className="section-header">
                <h2 className="section-title">{t('experience.title')}</h2>
                <p className="section-subtitle">{t('experience.subtitle')}</p>
            </div>

            <div className="timeline">
                <div className="timeline-line" />
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        onClick={() => setActiveId(item.id)}
                    >
                        <div className="timeline-dot">
                            <div className="timeline-dot-inner" />
                        </div>
                        <div className="timeline-card">
                            <div className="timeline-card-image">
                                {/* Placeholder for company image */}
                                <div className="timeline-img-placeholder">
                                    <span>{item.company.charAt(0)}</span>
                                </div>
                            </div>
                            <div className="timeline-card-content">
                                <span className="timeline-period">{item.period}</span>
                                <h3 className="timeline-company">{item.company}</h3>
                                <p className="timeline-role">{item.role}</p>
                                <p className="timeline-desc">{item.shortDesc}</p>
                                <div className="timeline-tags">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
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
                                <span>{activeItem.company.charAt(0)}</span>
                            </div>
                            <div>
                                <h3>{activeItem.company}</h3>
                                <p className="exp-modal-role">{activeItem.role}</p>
                                <p className="exp-modal-meta">{activeItem.period} · {activeItem.location}</p>
                            </div>
                        </div>
                        <div className="exp-modal-body">
                            <p>{activeItem.fullDesc}</p>
                        </div>
                        <div className="exp-modal-tags">
                            {activeItem.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
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
