import { MantineThemeOverride } from '@mantine/core';

export const defaultShade = 5; // use index 5 for backgrounds and borders
const borderThickness = '2px';
const shadowColorLight = 'rgba(0, 0, 0, 0.15)';
const shadowColorDark = 'rgba(0, 0, 0, 0.6)';
const shadowOffset = '0 2px 6px';
const buttonHoverShade = 9;

export const buttonBackgroundColor = 4


export const theme: MantineThemeOverride = {
  fontFamily: "Inter, sans-serif",
  primaryColor: "brand",

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
      "hsl(213 22% 90%)", "hsl(213 22% 90%)", "hsl(213 22% 90%)", "hsl(213 22% 90%)", "hsl(213 22% 90%)",
      "hsl(213 22% 90%)", "hsl(213 22% 90%)", "hsl(213 22% 90%)", "hsl(213 22% 90%)", "hsl(213 22% 90%)"
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
      styles: (
        theme: { colors: { [x: string]: any[] }; colorScheme: string },
        params: { color: any; variant?: string }
      ) => {
        const bgColor = theme.colors[params.color || "brand"][defaultShade];
        const hoverColor = theme.colors[params.color || "brand"][buttonHoverShade];
        const shadow = theme.colorScheme === "dark" ? shadowColorDark : shadowColorLight;

        // Alt variant: brand background, white text + border
        if (params.variant === "alt") {
          return {
            root: {
              backgroundColor: bgColor,
              border: `${borderThickness} solid ${theme.colors.white[0]}`,
              boxShadow: `${shadowOffset} ${shadow}`,
              color: theme.colors.white[0],
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: hoverColor,
                boxShadow: `0 4px 10px ${shadow}`,
                color: theme.colors.white[0],
              },
            },
          };
        }

        // DefaultAlt variant: same as alt (kept for backward compatibility)
        if (params.variant === "defaultAlt") {
          return {
            root: {
              backgroundColor: bgColor,
              border: `${borderThickness} solid ${theme.colors.white[0]}`,
              boxShadow: `${shadowOffset} ${shadow}`,
              color: theme.colors.white[0],
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: hoverColor,
                boxShadow: `0 4px 10px ${shadow}`,
                color: theme.colors.white[0],
              },
            },
          };
        }

        // FilledAlt variant: white background, brand text
        if (params.variant === "filledAlt") {
          return {
            root: {
              backgroundColor: theme.colors.white[0],
              border: `${borderThickness} solid ${theme.colors.white[0]}`,
              boxShadow: `${shadowOffset} ${shadow}`,
              color: bgColor,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#f7f7f7", // slightly off-white for hover
                boxShadow: `0 4px 10px ${shadow}`,
                color: hoverColor,
              },
            },
          };
        }

        // Existing default/outline logic
        return {
          root: {
            backgroundColor: params.variant === "outline" ? "transparent" : bgColor,
            border: `${borderThickness} solid ${bgColor}`,
            boxShadow: `${shadowOffset} ${shadow}`,
            color: params.variant === "outline" ? bgColor : theme.colors.white[0],
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: hoverColor,
              color: params.variant === "outline" ? theme.colors.white[0] : theme.colors.white[0],
              boxShadow: `0 4px 10px ${shadow}`,
            },
          },
        };
      },
    },
    Badge: {
      styles: (theme: { colors: { [x: string]: any[] }; colorScheme: string }, params: { color: any }) => ({
        root: {
          borderTop: `${borderThickness} solid ${theme.colors[params.color || "brand"][defaultShade]}`,
          borderRight: `${borderThickness} solid ${theme.colors[params.color || "brand"][defaultShade]}`,
          borderBottom: `${borderThickness} solid ${theme.colors[params.color || "brand"][defaultShade]}`,
          borderLeft: `${borderThickness} solid ${theme.colors[params.color || "brand"][defaultShade]}`,
          boxShadow: `${shadowOffset} ${theme.colorScheme === 'dark' ? shadowColorDark : shadowColorLight}`,
          transition: "all 0.2s ease"
        }
      })
    },
    Alert: {
      styles: (theme: { colors: { [x: string]: any[] }; colorScheme: string }, params: { color: any }) => {
        const colorPalette = theme.colors[params.color || "brand"];
        return {
          root: {
            backgroundColor: colorPalette[defaultShade],
            color: theme.colorScheme === 'dark' ? colorPalette[defaultShade - 4] : colorPalette[defaultShade + 4], // <-- text color
            borderTop: `${borderThickness} solid ${colorPalette[defaultShade]}`,
            borderRight: `${borderThickness} solid ${colorPalette[defaultShade]}`,
            borderBottom: `${borderThickness} solid ${colorPalette[defaultShade]}`,
            borderLeft: `${borderThickness} solid ${colorPalette[defaultShade]}`,
            borderRadius: "0.5rem",
            boxShadow: `${shadowOffset} ${theme.colorScheme === 'dark' ? shadowColorDark : shadowColorLight}`,
            transition: "all 0.2s ease",


          }

        }
      }
    },
    Card: {
      styles: (theme: { colors: { [x: string]: any[] }; colorScheme: string }) => ({
        root: {
          borderRadius: '0.5rem',
          // border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[defaultShade] : theme.colors.light[defaultShade]}`,

          // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[defaultShade] : theme.colors.success[defaultShade],

          boxShadow: theme.colorScheme === 'dark' ? '0 4px 12px rgba(0,0,0,0.6)' : '0 2px 6px rgba(0,0,0,0.15)',
          transition: 'all 0.2s ease'
        }
      })
    },
    Box: {
      styles: (theme: { colors: { [x: string]: any[] }; colorScheme: string }) => ({
        root: {
          borderRadius: '0.5rem',
          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[defaultShade] : theme.colors.white[defaultShade]}`,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[defaultShade] : theme.colors.white[defaultShade],
          boxShadow: theme.colorScheme === 'dark' ? '0 4px 12px rgba(0,0,0,0.6)' : '0 2px 6px rgba(0,0,0,0.15)',
          transition: 'all 0.2s ease'
        }
      })
    },
    LoadingOverlay: {
      defaultProps: {
        overlayBlur: 2,
        zIndex: 1000,
        loaderProps: { color: 'brand', type: 'bars' },
      },
      styles: (theme: { colors: { [x: string]: any[] }; colorScheme: string }) => ({
        root: {
          // backgroundColor:
          //   theme.colorScheme === 'dark'
          //     ? theme.colors.dark?.[6] || '#1A1B1E'
          //     : theme.colors.gray?.[0] || '#F8F9FA',
          // borderRadius: '0.5rem',
          // transition: 'all 0.2s ease-in-out',
        },
      }),
    },
  }
};
