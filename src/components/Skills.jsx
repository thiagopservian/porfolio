import { useLang } from '../context/LangContext';
import {
    SiPython, SiRust, SiJavascript, SiTypescript, SiGo,
    SiReact, SiNodedotjs, SiFastapi, SiNextdotjs,
    SiDocker, SiGit, SiLinux,
    SiPostgresql, SiApachecassandra, SiRedis, SiMongodb,
} from 'react-icons/si';
import { FaAws, FaRobot, FaFlask, FaBrain } from 'react-icons/fa';
import { FiDatabase, FiRefreshCw, FiGlobe, FiLayers } from 'react-icons/fi';
import './Skills.css';

const skillsData = {
    languages: [
        { name: 'Python', icon: SiPython },
        { name: 'Rust', icon: SiRust },
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'SQL', icon: FiDatabase },
        { name: 'Go', icon: SiGo },
    ],
    frameworks: [
        { name: 'React', icon: SiReact },
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'FastAPI', icon: SiFastapi },
        { name: 'Next.js', icon: SiNextdotjs },
    ],
    tools: [
        { name: 'Docker', icon: SiDocker },
        { name: 'Git', icon: SiGit },
        { name: 'AWS', icon: FaAws },
        { name: 'Linux', icon: SiLinux },
        { name: 'CI/CD', icon: FiRefreshCw },
    ],
    databases: [
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'Cassandra', icon: SiApachecassandra },
        { name: 'Redis', icon: SiRedis },
        { name: 'MongoDB', icon: SiMongodb },
    ],
    concepts: [
        { name: 'Distributed Systems', icon: FiGlobe },
        { name: 'Machine Learning', icon: FaRobot },
        { name: 'System Design', icon: FiLayers },
        { name: 'PBT Testing', icon: FaFlask },
        { name: 'LLM Engineering', icon: FaBrain },
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
                            {skills.map(({ name, icon: Icon }) => (
                                <div key={name} className="skill-item">
                                    <span className="skill-icon"><Icon /></span>
                                    <span className="skill-name">{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
