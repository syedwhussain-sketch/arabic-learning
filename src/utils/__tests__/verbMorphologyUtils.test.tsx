/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  renderColorCodedMudaria,
  renderColorCodedMadi,
  renderColorCodedAmr,
  renderColorCodedLam,
} from '../verbMorphologyUtils';

describe('verbMorphologyUtils', () => {
  describe('renderColorCodedMudaria', () => {
    it('should render simple mudaria verb with colored prefix', () => {
      const { container } = render(<>{renderColorCodedMudaria('يَنْصُرُ')}</>);
      const spans = container.querySelectorAll('span');
      
      expect(spans.length).toBeGreaterThan(0);
      expect(container.textContent).toBe('يَنْصُرُ');
    });

    it('should render mudaria with dual suffix', () => {
      const { container } = render(<>{renderColorCodedMudaria('يَنْصُرَانِ')}</>);
      expect(container.textContent).toBe('يَنْصُرَانِ');
    });

    it('should render mudaria with plural suffix', () => {
      const { container } = render(<>{renderColorCodedMudaria('يَنْصُرُونَ')}</>);
      expect(container.textContent).toBe('يَنْصُرُونَ');
    });

    it('should use custom prefix color', () => {
      const customColor = '#ff0000';
      const { container } = render(<>{renderColorCodedMudaria('يَنْصُرُ', customColor)}</>);
      const coloredSpan = container.querySelector('span[style*="color"]');
      
      expect(coloredSpan).toBeTruthy();
    });

    it('should handle different mudaria prefixes (ت، أ، ن)', () => {
      const verbs = ['تَنْصُرُ', 'أَنْصُرُ', 'نَنْصُرُ'];
      
      verbs.forEach(verb => {
        const { container } = render(<>{renderColorCodedMudaria(verb)}</>);
        expect(container.textContent).toBe(verb);
      });
    });
  });

  describe('renderColorCodedMadi', () => {
    it('should render simple madi verb', () => {
      const { container } = render(<>{renderColorCodedMadi('نَصَرَ')}</>);
      expect(container.textContent).toBe('نَصَرَ');
    });

    it('should render madi with pronoun suffix', () => {
      const { container } = render(<>{renderColorCodedMadi('نَصَرَا')}</>);
      expect(container.textContent).toBe('نَصَرَا');
    });

    it('should render madi with complex suffix', () => {
      const { container } = render(<>{renderColorCodedMadi('نَصَرْتُمَا')}</>);
      expect(container.textContent).toBe('نَصَرْتُمَا');
    });

    it('should handle we form', () => {
      const { container } = render(<>{renderColorCodedMadi('نَصَرْنَا')}</>);
      expect(container.textContent).toBe('نَصَرْنَا');
    });

    it('should use custom suffix color', () => {
      const customColor = '#00ff00';
      const { container } = render(<>{renderColorCodedMadi('نَصَرَا', customColor)}</>);
      const coloredSpan = container.querySelector('span[style*="color"]');
      
      expect(coloredSpan).toBeTruthy();
    });
  });

  describe('renderColorCodedAmr', () => {
    it('should render simple imperative verb', () => {
      const { container } = render(<>{renderColorCodedAmr('اُنْصُرْ')}</>);
      expect(container.textContent).toBe('اُنْصُرْ');
    });

    it('should render imperative with dual suffix', () => {
      const { container } = render(<>{renderColorCodedAmr('اُنْصُرَا')}</>);
      expect(container.textContent).toBe('اُنْصُرَا');
    });

    it('should render imperative with plural suffix', () => {
      const { container } = render(<>{renderColorCodedAmr('اُنْصُرُوا')}</>);
      expect(container.textContent).toBe('اُنْصُرُوا');
    });

    it('should render feminine singular imperative', () => {
      const { container } = render(<>{renderColorCodedAmr('اُنْصُرِي')}</>);
      expect(container.textContent).toBe('اُنْصُرِي');
    });
  });

  describe('renderColorCodedLam', () => {
    it('should render lam negation with verb', () => {
      const { container } = render(<>{renderColorCodedLam('يَنْصُرْ')}</>);
      expect(container.textContent).toContain('لَمْ');
      expect(container.textContent).toContain('يَنْصُرْ');
    });

    it('should render lam with dual verb', () => {
      const { container } = render(<>{renderColorCodedLam('يَنْصُرَا')}</>);
      expect(container.textContent).toContain('لَمْ');
      expect(container.textContent).toContain('يَنْصُرَا');
    });

    it('should use custom negation and morphology colors', () => {
      const negColor = '#ff0000';
      const morphColor = '#0000ff';
      const { container } = render(
        <>{renderColorCodedLam('يَنْصُرُ', negColor, morphColor)}</>
      );
      
      const coloredSpans = container.querySelectorAll('span[style*="color"]');
      expect(coloredSpans.length).toBeGreaterThan(0);
    });
  });
});
