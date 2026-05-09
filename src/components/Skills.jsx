import { useLang } from '../context/LangContext';
import './Skills.css';

const skillsData = {
    languages: [
        { name: 'Python', icon: '🐍' },
        { name: 'Rust', icon: '🦀' },
        { name: 'JavaScript', icon: '⚡' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'SQL', icon: '🗃️' },
        { name: 'Go', icon: '🔵' },
    ],
    frameworks: [
        { name: 'React', icon: '⚛️' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'FastAPI', icon: '🚀' },
        { name: 'Next.js', icon: '▲' },
    ],
    tools: [
        { name: 'Docker', icon: '🐳' },
        { name: 'Git', icon: '📦' },
        { name: 'AWS', icon: '☁️' },
        { name: 'Linux', icon: '🐧' },
        { name: 'CI/CD', icon: '🔄' },
    ],
    databases: [
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'Cassandra', icon: '👁️' },
        { name: 'Redis', icon: '🔴' },
        { name: 'MongoDB', icon: '🍃' },
    ],
    concepts: [
        { name: 'Distributed Systems', icon: '🌐' },
        { name: 'Machine Learning', icon: '🤖' },
        { name: 'System Design', icon: '🏗️' },
        { name: 'PBT Testing', icon: '🧪' },
        { name: 'LLM Engineering', icon: '🧠' },
    ],
};

export default function Skills() {
    const { t } = useLang();

    return (
        <section id="skills" className="skills">
            <div className="section-header">
                <h2 className="section-title">{t('skills.title')}</h2>
                <p className="section-subtitle">{t('skills.subtitle')}</p>
            </div>

            <div className="skills-container">
                {Object.entries(skillsData).map(([category, skills]) => (
                    <div key={category} className="skills-category">
                        <h3 className="skills-category-title">
                            {t(`skills.categories.${category}`)}
                        </h3>
                        <div className="skills-list">
                            {skills.map(skill => (
                                <div key={skill.name} className="skill-item">
                                    <span className="skill-icon">{skill.icon}</span>
                                    <span className="skill-name">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
