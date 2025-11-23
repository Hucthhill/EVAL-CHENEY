import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AccessibilityContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    textSize: number; // 1 to 6
    setTextSize: (size: number) => void;
    font: 'standard' | 'opendyslexic';
    setFont: (font: 'standard' | 'opendyslexic') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [textSize, setTextSize] = useState<number>(1);
    const [font, setFont] = useState<'standard' | 'opendyslexic'>('standard');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        // Apply classes to body
        const body = document.body;

        // Theme
        if (theme === 'dark') {
            body.classList.add('dark');
            body.style.backgroundColor = '#1a1a1a';
            body.style.color = '#ffffff';
        } else {
            body.classList.remove('dark');
            body.style.backgroundColor = '#f9f9f9';
            body.style.color = '#0f0f0f';
        }

        // Font
        if (font === 'opendyslexic') {
            body.classList.add('font-dyslexic');
            body.style.fontFamily = 'OpenDyslexic, sans-serif';
        } else {
            body.classList.remove('font-dyslexic');
            body.style.fontFamily = 'Roboto, sans-serif';
        }

        // Text Size (using CSS variable or data attribute)
        body.setAttribute('data-text-size', textSize.toString());

        // We can also set a CSS variable for scaling
        const scale = 1 + (textSize - 1) * 0.1; // 1.0, 1.1, 1.2, etc.
        document.documentElement.style.fontSize = `${16 * scale}px`;

    }, [theme, textSize, font]);

    return (
        <AccessibilityContext.Provider value={{ theme, toggleTheme, textSize, setTextSize, font, setFont }}>
            {children}
        </AccessibilityContext.Provider>
    );
};

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
};
