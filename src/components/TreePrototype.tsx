import { VerbTreeCard } from './VerbTreeCard';
import { alsahihData, almudaafData } from '../data';

export function TreePrototype() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0b0f19',
      padding: '20px 0'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          color: '#e5e7eb'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '12px'
          }}>
            Arabic Verb Learning - Tree View Prototype
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#9ca3af',
            marginBottom: '8px'
          }}>
            Expandable mind-map style interface for exploring Arabic verb conjugations
          </p>
          <p style={{
            fontSize: '13px',
            color: '#9ca3af'
          }}>
            Click any card to expand/collapse its branches
          </p>
        </div>

        {/* Al-Sahih Category */}
        <div style={{ marginBottom: '30px' }}>
          <VerbTreeCard data={alsahihData} />
        </div>

        {/* Al-Mudā'af Category */}
        <div style={{ marginBottom: '30px' }}>
          <VerbTreeCard data={almudaafData} />
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '60px',
          paddingBottom: '40px'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#6b7280'
          }}>
            Prototype Design - Tree/Mind Map Interface
          </p>
        </div>
      </div>
    </div>
  );
}
