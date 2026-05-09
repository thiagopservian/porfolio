import { useLang } from '../context/LangContext';
import './Academic.css';

export default function Academic() {
    const { t, getList } = useLang();
    const items = getList('academic.items');

    const icons = {
        uba: '🎓',
        olympiad: '🏅',
        pellegrini: '🏛️',
    };

    return (
        <section id="academic" className="academic">
            <div className="section-header">
                <h2 className="section-title">{t('academic.title')}</h2>
                <p className="section-subtitle">{t('academic.subtitle')}</p>
            </div>

            <div className="academic-grid">
                {items.map((item) => (
                    <div key={item.id} className="academic-card">
                        <div className="academic-card-accent" />
                        <div className="academic-card-icon">
                            <span>{icons[item.id] || '📚'}</span>
                        </div>
                        <div className="academic-highlight">{item.highlight}</div>
                        <h3 className="academic-institution">{item.institution}</h3>
                        <p className="academic-degree">{item.degree}</p>
                        <p className="academic-period">{item.period}</p>
                        <p className="academic-desc">{item.description}</p>
                        <div className="academic-media-slot">
                            <div className="media-placeholder-sm">
                                <span>📷</span>
                                <p>Add media</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
