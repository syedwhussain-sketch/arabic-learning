import React from 'react';
import { ARABIC_TEXT_DARK, ARABIC_TEXT_LIGHT } from '../constants/colors';

/**
 * Detects if a string contains Arabic script characters
 * Uses Unicode property escapes for precise detection
 */
export const isArabic = (text: string): boolean => {
  return /\p{Script=Arabic}/u.test(text);
};

/**
 * Component that wraps Arabic text with larger font size, RTL direction, and custom color
 */
interface ArabicSpanProps {
  children: React.ReactNode;
  fontSize?: string;
  color?: string;
}

export const ArabicSpan = ({ children, fontSize = '1.20em', color }: ArabicSpanProps) => (
  <span style={{ fontSize, direction: 'rtl', color }}>
    {children}
  </span>
);

/**
 * Renders text with Arabic portions styled differently (larger font size and custom color)
 * Splits text into Arabic and non-Arabic runs and applies styling accordingly
 *
 * @param text - The text to render (can contain mixed Arabic and non-Arabic)
 * @param arabicFontSize - Font size for Arabic text (default: '1.30em')
 * @param arabicColor - Color for Arabic text. Can be:
 *   - A hex color string (e.g., '#ff0000')
 *   - 'light' for light mode themed color
 *   - 'dark' for dark mode themed color
 *   - undefined for no color (default)
 * @returns Array of React elements with appropriate styling
 *
 * @example
 * renderStyledArabicText("المُعْتَلُّ (weak verb): is a verb...", '1.30em', 'dark')
 * // Returns elements with Arabic text 30% larger and dark mode themed color
 */
export const renderStyledArabicText = (
  text: string,
  arabicFontSize: string = '1.30em',
  arabicColor?: string | 'light' | 'dark'
): React.ReactNode[] => {
  // Determine the color to use based on the arabicColor parameter
  let colorToUse: string | undefined;
  if (arabicColor === 'light') {
    colorToUse = ARABIC_TEXT_LIGHT;
  } else if (arabicColor === 'dark') {
    colorToUse = ARABIC_TEXT_DARK;
  } else {
    colorToUse = arabicColor;
  }

  // Split text into Arabic and non-Arabic runs using Unicode Script property
  // The capturing group includes consecutive Arabic characters
  const parts = text.split(/(\p{Script=Arabic}+)/gu);

  return parts.map((part, index) => {
    // Check if this part contains Arabic script
    if (isArabic(part)) {
      return (
        <ArabicSpan key={index} fontSize={arabicFontSize} color={colorToUse}>
          {part}
        </ArabicSpan>
      );
    }
    // Non-Arabic text rendered normally
    return <span key={index}>{part}</span>;
  });
};

/**
 * Alternative version using Unicode ranges (fallback if property escapes not supported)
 * Covers main Arabic blocks, extended Arabic, and presentation forms
 */
export const isArabicRanges = (text: string): boolean => {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
};

export const renderStyledArabicTextRanges = (
  text: string,
  arabicFontSize: string = '1.20em',
  arabicColor?: string | 'light' | 'dark'
): React.ReactNode[] => {
  // Determine the color to use based on the arabicColor parameter
  let colorToUse: string | undefined;
  if (arabicColor === 'light') {
    colorToUse = ARABIC_TEXT_LIGHT;
  } else if (arabicColor === 'dark') {
    colorToUse = ARABIC_TEXT_DARK;
  } else {
    colorToUse = arabicColor;
  }

  const parts = text.split(/([\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+)/g);

  return parts.map((part, index) => {
    if (isArabicRanges(part)) {
      return (
        <ArabicSpan key={index} fontSize={arabicFontSize} color={colorToUse}>
          {part}
        </ArabicSpan>
      );
    }
    return <span key={index}>{part}</span>;
  });
};
