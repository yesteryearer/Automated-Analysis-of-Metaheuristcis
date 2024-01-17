import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeProvider';
import './ThemeSwitcherButton.css';

const ThemeSwitcherButton: React.FC = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('ThemeSwitcherButton must be used within a ThemeProvider');
    }

    const { toggleTheme } = themeContext;

    return (
        <button onClick={toggleTheme} className='theme-switcher-button'></button>
    );
};

export default ThemeSwitcherButton;
