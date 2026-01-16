import { describe, it, expect } from 'vitest';
import { sanitizeHtml, sanitizeText } from '../sanitize';

describe('HTML Sanitization', () => {
  describe('sanitizeHtml', () => {
    it('should allow safe HTML tags', () => {
      const input = '<p>Hello <b>world</b></p>';
      const result = sanitizeHtml(input);
      expect(result).toContain('Hello');
      expect(result).toContain('world');
    });

    it('should remove dangerous script tags', () => {
      const input = '<p>Hello</p><script>alert("xss")</script>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('script');
      expect(result).not.toContain('alert');
    });

    it('should remove event handlers', () => {
      const input = '<img src="x" onerror="alert(\'xss\')">';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('onerror');
      expect(result).not.toContain('alert');
    });

    it('should remove iframe tags', () => {
      const input = '<div>Content</div><iframe src="evil.com"></iframe>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('iframe');
      expect(result).not.toContain('evil.com');
    });

    it('should handle javascript: protocol', () => {
      const input = '<a href="javascript:alert(\'xss\')">Click</a>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('javascript:');
    });

    it('should preserve legitimate links', () => {
      const input = '<a href="https://example.com">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).toContain('example.com');
      expect(result).toContain('Link');
    });

    it('should handle nested tags', () => {
      const input = '<div><p>Text <b>bold <i>italic</i></b> text</p></div>';
      const result = sanitizeHtml(input);
      expect(result).toContain('Text');
      expect(result).toContain('bold');
      expect(result).toContain('italic');
    });

    it('should remove style attributes with dangerous CSS', () => {
      const input = '<p style="background:url(javascript:alert(\'xss\'))">Text</p>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('javascript');
    });

    it('should handle empty string', () => {
      const result = sanitizeHtml('');
      expect(result).toBe('');
    });

    it('should handle plain text', () => {
      const input = 'Just plain text';
      const result = sanitizeHtml(input);
      expect(result).toContain('Just plain text');
    });

    it('should allow heading tags', () => {
      const input = '<h1>Title</h1><h2>Subtitle</h2>';
      const result = sanitizeHtml(input);
      expect(result).toContain('Title');
      expect(result).toContain('Subtitle');
    });

    it('should allow list tags', () => {
      const input = '<ul><li>Item 1</li><li>Item 2</li></ul>';
      const result = sanitizeHtml(input);
      expect(result).toContain('Item 1');
      expect(result).toContain('Item 2');
    });

    it('should allow code tags', () => {
      const input = '<pre><code>console.log("test")</code></pre>';
      const result = sanitizeHtml(input);
      expect(result).toContain('console.log');
    });
  });

  describe('sanitizeText', () => {
    it('should remove all HTML tags', () => {
      const input = '<p>Hello <b>world</b></p>';
      const result = sanitizeText(input);
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
      expect(result).toContain('Hello');
      expect(result).toContain('world');
    });

    it('should handle empty string', () => {
      const result = sanitizeText('');
      expect(result).toBe('');
    });

    it('should handle plain text', () => {
      const input = 'Plain text';
      const result = sanitizeText(input);
      expect(result).toBe('Plain text');
    });

    it('should remove script tags and content', () => {
      const input = 'Text<script>alert("xss")</script>More';
      const result = sanitizeText(input);
      expect(result).not.toContain('script');
      expect(result).not.toContain('alert');
    });

    it('should handle nested HTML', () => {
      const input = '<div><p>Nested <span>content</span></p></div>';
      const result = sanitizeText(input);
      expect(result).toContain('Nested');
      expect(result).toContain('content');
      expect(result).not.toContain('<');
    });
  });

  describe('XSS Prevention', () => {
    it('should prevent DOM-based XSS', () => {
      const malicious = '<img src=x onerror="fetch(\'http://attacker.com\')">';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('onerror');
      expect(result).not.toContain('fetch');
      expect(result).not.toContain('attacker.com');
    });

    it('should prevent stored XSS', () => {
      const stored = '<script>document.location="http://attacker.com"</script>';
      const result = sanitizeHtml(stored);
      expect(result).not.toContain('script');
      expect(result).not.toContain('document.location');
    });

    it('should prevent reflected XSS via data attributes', () => {
      const reflected = '<div data-x="<script>alert(1)</script>">Text</div>';
      const result = sanitizeHtml(reflected);
      expect(result).not.toContain('script');
    });

    it('should prevent SVG-based XSS', () => {
      const svg =
        '<svg onload="alert(\'xss\')"><circle r="10"></circle></svg>';
      const result = sanitizeHtml(svg);
      expect(result).not.toContain('onload');
    });
  });
});
