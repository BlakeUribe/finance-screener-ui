import { MantineThemeOverride, useComputedColorScheme } from '@mantine/core';

export const defaultShade = 5; // index for backgrounds and borders
const borderThickness = '2px';
const shadowColorLight = 'rgba(0, 0, 0, 0.15)';
const shadowColorDark = 'rgba(0, 0, 0, 0.6)';
const shadowOffset = '0 2px 6px';
const buttonHoverShade = 9;

export const buttonBackgroundColor = 4;

export const theme: MantineThemeOverride = {
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'brand',
  // autoContrast: true,
  // luminanceThreshold: 0.99,
  colors: {
    brand: [
      "hsl(230 80% 73%)",
      "hsl(230 80% 68%)",
      "hsl(230 80% 63%)",
      "hsl(230 80% 58%)",
      "hsl(230 80% 53%)",
      "hsl(230 80% 48%)",
      "hsl(230 80% 43%)",
      "hsl(230 80% 38%)",
      "hsl(230 80% 33%)",
      "hsl(230 80% 28%)",
    ],
    secondary: [
      "hsl(52 19% 57%)", "hsl(52 19% 52%)", "hsl(52 19% 47%)", "hsl(52 19% 42%)", "hsl(52 19% 37%)",
      "hsl(52 19% 32%)", "hsl(52 19% 27%)", "hsl(52 19% 22%)", "hsl(52 19% 17%)", "hsl(52 19% 12%)"
    ],
    danger: [
      "hsl(0 65% 55%)", "hsl(0 65% 50%)", "hsl(0 65% 45%)", "hsl(0 65% 40%)", "hsl(0 65% 35%)",
      "hsl(0 65% 30%)", "hsl(0 65% 25%)", "hsl(0 65% 20%)", "hsl(0 65% 15%)", "hsl(0 65% 10%)"
    ],
    warning: [
      "hsl(45 65% 55%)", "hsl(45 65% 50%)", "hsl(45 65% 45%)", "hsl(45 65% 40%)", "hsl(45 65% 35%)",
      "hsl(45 65% 30%)", "hsl(45 65% 25%)", "hsl(45 65% 20%)", "hsl(45 65% 15%)", "hsl(45 65% 10%)"
    ],
    success: [
      "hsl(140 50% 55%)", "hsl(140 50% 50%)", "hsl(140 50% 45%)", "hsl(140 50% 40%)", "hsl(140 50% 35%)",
      "hsl(140 50% 30%)", "hsl(140 50% 25%)", "hsl(140 50% 20%)", "hsl(140 50% 15%)", "hsl(140 50% 10%)"
    ],
    light: [
      "hsl(213 15% 98%)", // 1
      "hsl(213 15% 98%)",
      "hsl(213 15% 97%)",
      "hsl(213 15% 97%)",
      "hsl(213 15% 96%)", // 5
      "hsl(213 15% 92%)",
      "hsl(213 15% 91%)",
      "hsl(213 15% 90%)",
      "hsl(213 15% 89%)",
      "hsl(213 15% 88%)"
    ],
    dark: [
      "hsl(213 22% 90%)", // Text for dark screen
      "hsl(0 0% 32%)",
      "hsl(0 0% 30%)",
      "hsl(0 0% 28%)",
      "hsl(0 0% 24%)",
      "hsl(0 0% 20%)",
      "hsl(0 0% 18%)",
      "hsl(0 0% 16%)", // global dark screen color
      "hsl(0 0% 12%)",
      "hsl(0 0% 8%)"
    ],
    white: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
    black: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"]
  },

  components: {

    Button: {
      styles: (theme: any, params: any) => {
        const bgColor = theme.colors[params.color || 'brand']?.[defaultShade] ?? '#000';
        const hoverColor = theme.colors[params.color || 'brand']?.[buttonHoverShade] ?? '#000';
        const shadow = shadowColorLight;

        // Base styles
        const base = {
          borderRadius: '0.5rem',
          boxShadow: `${shadowOffset} ${shadow}`,
          transition: 'all 0.2s ease',
        };

        // Variants
        if (params.variant === 'filledAlt') {
          return {
            root: {
              ...base,
              backgroundColor: theme.colors.white[0],
              color: bgColor,
              border: `${borderThickness} solid ${theme.colors.white[0]}`,
              '&:hover': {
                backgroundColor: '#f7f7f7',
                color: hoverColor,
                boxShadow: `0 4px 10px ${shadow}`,
              },
            },
          };
        }

        if (params.variant === 'alt') {
          return {
            root: {
              ...base,
              backgroundColor: 'transparent',
              color: theme.colors.white[0],
              border: `${borderThickness} solid ${theme.colors.white[0]}`,
              '&:hover': {
                backgroundColor: hoverColor,
                color: theme.colors.white[0],
                boxShadow: `0 4px 10px ${shadow}`,
              },
            },
          };
        }

        if (params.variant === 'outline') {
          return {
            root: {
              ...base,
              backgroundColor: 'transparent',
              color: bgColor,
              border: `${borderThickness} solid ${bgColor}`,
              '&:hover': {
                backgroundColor: hoverColor,
                color: theme.colors.white[0],
                boxShadow: `0 4px 10px ${shadow}`,
              },
            },
          };
        }

        // Default (filled)
        return {
          root: {
            ...base,
            backgroundColor: bgColor,
            color: theme.colors.white[0],
            border: `${borderThickness} solid ${bgColor}`,
            '&:hover': {
              backgroundColor: hoverColor,
              boxShadow: `0 4px 10px ${shadow}`,
            },
          },
        };
      },
    },
    Card: {
      styles: (theme: any, params: any) => {
        const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

        const bgColor =
          colorScheme === 'dark'
            ? theme.colors?.dark?.[defaultShade + 3] ?? '#1a1b1e'
            : theme.colors?.light?.[defaultShade - 3] ?? '#f8f9fa';


        const borderColor =
          colorScheme === 'dark'
            ? theme.colors?.dark?.[defaultShade - 3] ?? '#333'
            : theme.colors?.light?.[defaultShade + 4] ?? '#ddd'; // possibly make this less noticable

        const shadow = colorScheme === 'dark' ? shadowColorDark : shadowColorLight;


        return {

          root: {
            border: `2px solid ${borderColor}`, // <-- add this line
            borderRadius: '0.5rem',
            backgroundColor: bgColor,
            boxShadow: `${shadowOffset} ${shadow}`,
            transition: 'all 0.2s ease',
          },
        }
      },
    },


    Box: {
      styles: () => ({
        root: {
          borderRadius: '0.5rem',
          border: `${borderThickness} solid ${shadowColorLight}`,
          boxShadow: `${shadowOffset} ${shadowColorLight}`,
          transition: 'all 0.2s ease',
        },
      }),
    },

    Badge: {
      styles: () => ({
        root: {
          borderRadius: '0.5rem',
          boxShadow: `${shadowOffset} ${shadowColorLight}`,
          transition: 'all 0.2s ease',
        },
      }),
    },

    Alert: {
      styles: () => ({
        root: {
          borderRadius: '0.5rem',
          boxShadow: `${shadowOffset} ${shadowColorLight}`,
          transition: 'all 0.2s ease',
        },
      }),
    },

    LoadingOverlay: {
      defaultProps: {
        overlayBlur: 2,
        zIndex: 1000,
        loaderProps: { color: 'brand', type: 'bars' },
      },
    },
  },
};


