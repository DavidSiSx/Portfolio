import React from 'react';
import { CodeIcon, MapPinIcon, UserIcon } from '../common/Icons';

interface AboutProps {
  t: {
    eyebrow: string;
    title: string;
    items: {
      icon: string;
      text: string;
    }[];
  };
}

export const About: React.FC<AboutProps> = ({ t }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <CodeIcon width={20} height={20} />;
      case 'map':
        return <MapPinIcon width={20} height={20} />;
      case 'user':
        return <UserIcon width={20} height={20} />;
      default:
        return null;
    }
  };

  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <div className="section__header reveal">
          <p className="section__eyebrow">{t.eyebrow}</p>
          <h2 className="section__title">{t.title}</h2>
        </div>
        
        <div className="about__list">
          {t.items.map((item, index) => (
            <div key={index} className={`about__item reveal reveal-delay-${index + 1}`}>
              <div className="about__icon-wrapper">
                {getIcon(item.icon)}
              </div>
              <p className="about__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
