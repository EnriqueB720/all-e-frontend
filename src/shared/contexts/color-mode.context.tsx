import { createContext, useContext, useState, useEffect, useCallback, FC, ReactNode } from 'react';

type ColorMode = 'light' | 'dark';

interface ColorModeContextType {
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: 'dark',
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [colorMode, setColorMode] = useState<ColorMode>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('all-e-color-mode') as ColorMode | null;
    if (stored === 'light' || stored === 'dark') {
      setColorMode(stored);
    }
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('all-e-color-mode', next);
      return next;
    });
  }, []);

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
