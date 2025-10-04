import { MantineThemeOverride } from '@mantine/core';

const borderShade = 5
const topBorderShadeDeduction = 2
const borderThickness = '2px'
export const buttonBackgroundColor = 4
const buttonHoverShade = 9
const shadowColorLight = 'rgba(0, 0, 0, 0.15)'
const shadowColorDark = 'rgba(0, 0, 0, 0.6)'
const shadowOffset = '0 2px 6px'

export const theme: MantineThemeOverride = {
  fontFamily: "Inter, sans-serif",
  // fontFamily: "Quintessential,  Quintessential",

  

  primaryColor: "brand",
  colors: {
    brand: ["hsl(213 78% 73%)","hsl(213 78% 68%)","hsl(213 78% 63%)","hsl(213 78% 58%)","hsl(213 78% 53%)","hsl(213 78% 48%)","hsl(213 78% 43%)","hsl(213 78% 38%)","hsl(213 78% 33%)","hsl(213 78% 28%)"],
    secondary: ["hsl(52 19% 57%)","hsl(52 19% 52%)","hsl(52 19% 47%)","hsl(52 19% 42%)","hsl(52 19% 37%)","hsl(52 19% 32%)","hsl(52 19% 27%)","hsl(52 19% 22%)","hsl(52 19% 17%)","hsl(52 19% 12%)"],
    danger: ["hsl(9 26% 64%)","hsl(9 26% 60%)","hsl(9 26% 55%)","hsl(9 26% 50%)","hsl(9 26% 45%)","hsl(9 26% 40%)","hsl(9 26% 35%)","hsl(9 26% 30%)","hsl(9 26% 25%)","hsl(9 26% 20%)"],
    warning: ["hsl(35 59% 62%)","hsl(35 59% 57%)","hsl(35 59% 52%)","hsl(35 59% 47%)","hsl(35 59% 42%)","hsl(35 59% 37%)","hsl(35 59% 32%)","hsl(35 59% 27%)","hsl(35 59% 22%)","hsl(35 59% 17%)"],
    success: ["hsl(146 17% 59%)","hsl(146 17% 54%)","hsl(146 17% 49%)","hsl(146 17% 44%)","hsl(146 17% 39%)","hsl(146 17% 34%)","hsl(146 17% 29%)","hsl(146 17% 24%)","hsl(146 17% 19%)","hsl(146 17% 14%)"],
    info: ["hsl(217 28% 65%)","hsl(217 28% 60%)","hsl(217 28% 55%)","hsl(217 28% 50%)","hsl(217 28% 45%)","hsl(217 28% 40%)","hsl(217 28% 35%)","hsl(217 28% 30%)","hsl(217 28% 25%)","hsl(217 28% 20%)"],
    light: [
      "hsl(213 22% 90%)",
      "hsl(213 22% 90%)",
      "hsl(213 22% 90%)",
      "hsl(213 22% 90%)",
      "hsl(213 22% 90%)",
      "hsl(213 22% 90%)",
      "hsl(213 22% 90%)",
      "hsl(213 22% 90%)",
      "hsl(213 22% 90%)",
      "hsl(213 22% 90%)"
    ],
// dark: [
//   "hsl(217 46% 90%)", // text primary
//   "hsl(217 46% 75%)", // text secondary
//   "hsl(217 46% 60%)", // subtle text / labels
//   "hsl(217 46% 10%)", // card / box background
//   "hsl(217 46% 15%)", // card / box border
//   "hsl(217 46% 20%)", // button background
//   "hsl(217 46% 25%)", // button hover
//   "hsl(217 46% 2%);", // Main Backgroun
//   "hsl(217 46% 35%)",
//   "hsl(217 46% 40%)",
// ],
dark: [
  "hsl(0 0% 90%)",  // text primary - light gray
  "hsl(0 0% 75%)",  // text secondary - medium light gray
  "hsl(0 0% 60%)",  // subtle text / labels
  "hsl(0 0% 15%)",  // card / box background - dark gray
  "hsl(0 0% 25%)",  // card / box border - slightly lighter
  "hsl(0 0% 20%)",  // button background
  "hsl(0 0% 30%)",  // button hover
  "hsl(0 0% 2%)",   // main background - almost black
  "hsl(0 0% 35%)",  // accent / badges
  "hsl(0 0% 40%)",  // additional accent
],
 
  white: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
    "#ffffff", "#ffffff", "#ffffff", "#ffffff"
  ],
  black: ["#000000", "#000000", "#000000", "#000000", "#000000"
    , "#000000", "#000000", "#000000", "#000000", "#000000"
  ],
  },
  components: {
    Button: {
      styles: (theme: { colors: { [x: string]: any[] }; colorScheme: string }, params: { color: any }) => ({
        root: {
          backgroundColor: theme.colors[params.color || "brand"][buttonBackgroundColor],
          borderTop: `${borderThickness} solid ${theme.colors[params.color || "brand"][borderShade - topBorderShadeDeduction]}`,
          borderRight: `${borderThickness} solid ${theme.colors[params.color || "brand"][borderShade]}`,
          borderBottom: `${borderThickness} solid ${theme.colors[params.color || "brand"][borderShade]}`,
          borderLeft: `${borderThickness} solid ${theme.colors[params.color || "brand"][borderShade]}`,
          boxShadow: `${shadowOffset} ${theme.colorScheme === 'dark' ? shadowColorDark : shadowColorLight}`,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: theme.colors[params.color || "brand"][buttonHoverShade],
            boxShadow: `0 4px 10px ${theme.colorScheme === 'dark' ? shadowColorDark : shadowColorLight}`,
          },
        },
      }),
    },
    Badge: {
      styles: (theme: { colors: { [x: string]: any[] }; colorScheme: string }, params: { color: any }) => ({
        root: {
          borderTop: `${borderThickness} solid ${theme.colors[params.color || "brand"][borderShade - topBorderShadeDeduction]}`,
          borderRight: `${borderThickness} solid ${theme.colors[params.color || "brand"][borderShade]}`,
          borderBottom: `${borderThickness} solid ${theme.colors[params.color || "brand"][borderShade]}`,
          borderLeft: `${borderThickness} solid ${theme.colors[params.color || "brand"][borderShade]}`,
          boxShadow: `${shadowOffset} ${theme.colorScheme === 'dark' ? shadowColorDark : shadowColorLight}`,
          transition: "all 0.2s ease",
        },
      }),
    },
    Alert: {
      styles: (theme: { colors: { [x: string]: any[] }; colorScheme: string }, params: { color: any }) => {
        const colorPalette = theme.colors[params.color || "brand"];
        const backgroundColor = theme.colorScheme === "dark" ? colorPalette[2] : colorPalette[0];
        return {
          root: {
            backgroundColor,
            borderTop: `${borderThickness} solid ${theme.colorScheme === "dark" ? 'rgba(255,255,255,0.1)' : colorPalette[borderShade - 1]}`,
            borderRight: `${borderThickness} solid ${colorPalette[borderShade]}`,
            borderBottom: `${borderThickness} solid ${colorPalette[borderShade]}`,
            borderLeft: `${borderThickness} solid ${colorPalette[borderShade]}`,
            borderRadius: "0.5rem",
            boxShadow: theme.colorScheme === 'dark' ? '0 2px 6px rgba(0,0,0,0.6)' : '0 2px 6px rgba(0,0,0,0.15)',
            transition: "all 0.2s ease",
          },
        };
      },
    },
    Card: {
      styles: (theme: { colors: { [x: string]: any[] }; colorScheme: string }) => ({
        root: {
          borderRadius: '0.5rem',
          border: `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.white,
          boxShadow: theme.colorScheme === 'dark' ? '0 4px 12px rgba(0,0,0,0.6)' : '0 2px 6px rgba(0,0,0,0.15)',
          transition: 'all 0.2s ease',
        },
      }),
    },
Table: {
  styles: (theme: { colors: { [x: string]: any[] }; colorScheme: string }) => ({
     root: {
      width: '100%',
      borderCollapse: 'collapse',
      border: `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.black,
      transition: 'all 0.2s ease',
      boxShadow: theme.colorScheme === 'dark'
        ? '0 8px 24px rgba(0,0,0,0.75)'  // stronger, more noticeable shadow
        : '0 6px 20px rgba(0,0,0,0.25)', // stronger for light mode
      borderRadius: '0.5rem', // optional, if you want rounded corners
      overflow: 'hidden',     // ensures shadow is clipped nicely
    },
  }),
},
    Box: {
      styles: (theme: { colors: { [x: string]: any[] }; colorScheme: string }) => ({
        root: {
          borderRadius: '0.5rem',
          border: `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.white,
          boxShadow: theme.colorScheme === 'dark' ? '0 4px 12px rgba(0,0,0,0.6)' : '0 2px 6px rgba(0,0,0,0.15)',
          transition: 'all 0.2s ease',
        },
      }),
    },
  },
};
