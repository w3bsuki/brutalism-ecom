"use client";

export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? 'pinkBlack' : 'blackYellow';
        
        if (storedTheme === 'pinkBlack' || storedTheme === 'blackYellow') {
          document.documentElement.classList.add(storedTheme);
        } else {
          document.documentElement.classList.add(systemTheme);
        }
      } catch (e) {
        console.error('Failed to access localStorage for theme:', e);
        document.documentElement.classList.add('blackYellow');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
} 