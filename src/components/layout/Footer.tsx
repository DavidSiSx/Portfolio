import React from 'react';

interface FooterProps {
  text: string;
}

export const Footer: React.FC<FooterProps> = ({ text }) => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">{text}</p>
      </div>
    </footer>
  );
};
