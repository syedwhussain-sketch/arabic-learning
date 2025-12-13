import { useState } from 'react';
import type { VerbCategory, VerbSubCategory, VerbConjugation } from '../types/verb.types';
import './VerbTreeCard.css';

interface VerbTreeCardProps {
  data: VerbCategory;
  isDark?: boolean;
}

export function VerbTreeCard({ data, isDark = true }: VerbTreeCardProps) {
  const [openPatterns, setOpenPatterns] = useState<Set<string>>(new Set());

  const togglePattern = (patternId: string) => {
    setOpenPatterns(prev => {
      const next = new Set(prev);
      if (next.has(patternId)) {
        next.delete(patternId);
      } else {
        next.add(patternId);
      }
      return next;
    });
  };

  const renderConjugationsGrid = (conjugations: VerbConjugation[]) => {
    if (conjugations.length === 0) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--tree-muted)' }}>
          Coming soon...
        </div>
      );
    }

    return (
      <div className="conjugations-table" style={{ direction: 'rtl', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--tree-line)' }}>
              <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '13px' }}>الضمير</th>
              <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '13px' }}>الماضي</th>
              <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '13px' }}>المضارع</th>
              <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '13px' }}>الأمر</th>
              <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '13px' }}>لَمْ</th>
              <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '13px' }}>لَنْ</th>
              <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '13px' }}>لا</th>
              <th style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '13px' }}>اسم الفاعل</th>
            </tr>
          </thead>
          <tbody>
            {conjugations.map((conj, index) => {
              const isFeminine = conj.gender === 'female';
              const rowBg = isDark
                ? (isFeminine ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)')
                : (isFeminine ? 'rgba(0,0,0,0.09)' : 'rgba(0,0,0,0.04)');
              const rowHoverBg = isDark
                ? (isFeminine ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)')
                : (isFeminine ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.08)');

              return (
                <tr
                  key={index}
                  style={{
                    borderBottom: '1px solid var(--tree-line)',
                    backgroundColor: rowBg,
                    transition: 'background-color 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = rowHoverBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = rowBg}
                >
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                    <div>{conj.pronounArabic}</div>
                    {conj.pronoun && <div style={{ fontSize: '11px', color: 'var(--tree-muted)', marginTop: '2px' }}>{conj.pronoun}</div>}
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                    <div>{conj.past}</div>
                    {conj.pastEnglish && <div style={{ fontSize: '11px', color: 'var(--tree-muted)', marginTop: '2px' }}>{conj.pastEnglish}</div>}
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                    <div>{conj.present}</div>
                    {conj.presentEnglish && <div style={{ fontSize: '11px', color: 'var(--tree-muted)', marginTop: '2px' }}>{conj.presentEnglish}</div>}
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                    <div>{conj.imperative || '-'}</div>
                    {conj.imperativeEnglish && <div style={{ fontSize: '11px', color: 'var(--tree-muted)', marginTop: '2px' }}>{conj.imperativeEnglish}</div>}
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                    <div>{conj.negationPast}</div>
                    {conj.negationPastEnglish && <div style={{ fontSize: '11px', color: 'var(--tree-muted)', marginTop: '2px' }}>{conj.negationPastEnglish}</div>}
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                    <div>{conj.negationFuture}</div>
                    {conj.negationFutureEnglish && <div style={{ fontSize: '11px', color: 'var(--tree-muted)', marginTop: '2px' }}>{conj.negationFutureEnglish}</div>}
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                    <div>{conj.negationJussive}</div>
                    {conj.negationJussiveEnglish && <div style={{ fontSize: '11px', color: 'var(--tree-muted)', marginTop: '2px' }}>{conj.negationJussiveEnglish}</div>}
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                    <div>{conj.participle || '-'}</div>
                    {conj.participleEnglish && <div style={{ fontSize: '11px', color: 'var(--tree-muted)', marginTop: '2px' }}>{conj.participleEnglish}</div>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPattern = (pattern: VerbSubCategory) => {
    const isOpen = openPatterns.has(pattern.id);
    const conjugationCount = pattern.conjugations.length;

    return (
      <li key={pattern.id} className="node">
        <details open={isOpen}>
          <summary onClick={(e) => { e.preventDefault(); togglePattern(pattern.id); }}>
            <span className="toggle"></span>
            <span className="title" style={{ direction: 'rtl' }}>
              {pattern.arabic} - {pattern.masdar}
            </span>
            <span className="meta">{conjugationCount} conjugations</span>
          </summary>
          <div className="content">
            <div style={{ direction: 'rtl', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', marginBottom: '6px' }}>
                <strong>{pattern.meaning}</strong>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                {pattern.verb} • {pattern.transliteration}
              </div>
            </div>

            {renderConjugationsGrid(pattern.conjugations)}

            {pattern.exampleSentences.lam_male && (
              <div style={{ marginTop: '16px', padding: '12px', background: 'var(--card2)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text)' }}>
                  Example Sentences:
                </div>
                <div style={{ direction: 'rtl', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>{pattern.exampleSentences.lam_male}</div>
                  <div>{pattern.exampleSentences.lam_female}</div>
                  <div>{pattern.exampleSentences.lan_male}</div>
                  <div>{pattern.exampleSentences.lan_female}</div>
                  <div style={{ marginTop: '4px', paddingTop: '8px', borderTop: '1px solid var(--line)' }}>
                    {pattern.exampleSentences.masdar}
                  </div>
                </div>
              </div>
            )}
          </div>
        </details>
      </li>
    );
  };

  return (
    <div className={`verb-tree-container ${isDark ? 'dark-theme' : 'light-theme'}`}>
      <ul className="tree">
        <li className="node root">
          <details open>
            <summary>
              <span className="toggle"></span>
              <span className="title" style={{ direction: 'rtl', fontSize: '16px' }}>
                {data.arabic} - {data.transliteration}
              </span>
              <span className="meta">{data.subCategories.length} patterns</span>
            </summary>
            <div className="content">
              <div style={{ marginBottom: '16px', lineHeight: '1.6', textAlign: 'left' }}>
                {data.explanation}
              </div>

              <div className="children">
                <ul className="tree">
                  {data.subCategories.map(pattern => renderPattern(pattern))}
                </ul>
              </div>
            </div>
          </details>
        </li>
      </ul>
    </div>
  );
}
