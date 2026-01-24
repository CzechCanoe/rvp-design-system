import type { Meta, StoryObj } from '@storybook/react';

/**
 * Aesthetic Enhancement Demo
 *
 * Showcases the "Dynamic Sport" visual identity:
 * - Plus Jakarta Sans display typography
 * - Energy accent color (vibrant coral-orange)
 * - Mesh gradient backgrounds
 * - Grain textures
 * - Angular/diagonal elements
 * - Staggered reveal animations
 */

const meta: Meta = {
  title: 'Design System/Aesthetic',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Visual identity enhancements for distinctive, memorable design. "Dynamic Sport" aesthetic combines bold typography, energetic colors, and subtle textures.',
      },
    },
  },
};

export default meta;

/* ==========================================================================
   TYPOGRAPHY SHOWCASE
   ========================================================================== */

export const Typography: StoryObj = {
  render: () => (
    <div style={{ padding: '48px', background: 'var(--color-bg-primary)' }}>
      <div style={{ maxWidth: '800px' }}>
        <p
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '8px',
          }}
        >
          Display Typography
        </p>

        <h1
          className="csk-display"
          style={{
            fontSize: 'var(--font-size-7xl)',
            lineHeight: 0.95,
            marginBottom: '24px',
            color: 'var(--color-text-primary)',
          }}
        >
          Plus Jakarta Sans
        </h1>

        <h2
          className="csk-headline"
          style={{
            fontSize: 'var(--font-size-4xl)',
            marginBottom: '16px',
            color: 'var(--color-text-primary)',
          }}
        >
          Bold Headlines That Demand Attention
        </h2>

        <p
          style={{
            fontSize: 'var(--font-size-lg)',
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            marginBottom: '32px',
          }}
        >
          Body text remains Inter for optimal readability. The contrast between
          the geometric display font and clean body text creates visual hierarchy
          and interest.
        </p>

        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-tertiary)',
                marginBottom: '8px',
              }}
            >
              Weights Available
            </p>
            {[400, 500, 600, 700, 800].map((weight) => (
              <p
                key={weight}
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontWeight: weight,
                  fontSize: 'var(--font-size-xl)',
                  marginBottom: '4px',
                }}
              >
                Weight {weight}
              </p>
            ))}
          </div>

          <div>
            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-tertiary)',
                marginBottom: '8px',
              }}
            >
              Tight Tracking
            </p>
            <p
              className="csk-display"
              style={{
                fontSize: 'var(--font-size-5xl)',
                letterSpacing: '-0.03em',
              }}
            >
              SLALOM
            </p>
            <p
              className="csk-display"
              style={{
                fontSize: 'var(--font-size-5xl)',
                letterSpacing: '-0.03em',
              }}
            >
              92:47.125
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

/* ==========================================================================
   ENERGY ACCENT COLOR
   ========================================================================== */

export const EnergyColors: StoryObj = {
  render: () => (
    <div style={{ padding: '48px', background: 'var(--color-bg-primary)' }}>
      <h2
        className="csk-headline"
        style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '24px' }}
      >
        Energy Accent Palette
      </h2>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          marginBottom: '32px',
          maxWidth: '600px',
        }}
      >
        Vibrant coral-orange provides high-energy contrast to the cool primary
        blue. Used for CTAs, highlights, and attention-grabbing elements.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
          <div
            key={shade}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '8px',
              background: `var(--color-energy-${shade})`,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '4px',
              fontSize: '10px',
              color: shade < 400 ? 'var(--color-energy-800)' : 'white',
              fontWeight: 600,
            }}
          >
            {shade}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div
          style={{
            padding: '24px 32px',
            background: 'var(--gradient-energy)',
            borderRadius: '12px',
            color: 'white',
            fontWeight: 600,
          }}
        >
          Gradient Energy
        </div>
        <div
          style={{
            padding: '24px 32px',
            background: 'var(--gradient-energy-vibrant)',
            borderRadius: '12px',
            color: 'white',
            fontWeight: 600,
          }}
        >
          Gradient Vibrant
        </div>
        <div
          style={{
            padding: '24px 32px',
            background: 'var(--color-bg-primary)',
            border: '2px solid var(--color-energy-500)',
            borderRadius: '12px',
            color: 'var(--color-energy-600)',
            fontWeight: 600,
            boxShadow: 'var(--glow-energy-md)',
          }}
        >
          Energy Glow
        </div>
      </div>

      <h3
        style={{
          fontSize: 'var(--font-size-xl)',
          marginTop: '48px',
          marginBottom: '16px',
        }}
      >
        Primary + Energy Combination
      </h3>
      <div style={{ display: 'flex', gap: '4px' }}>
        <div
          style={{
            flex: 3,
            height: '80px',
            background: 'var(--gradient-primary)',
            borderRadius: '8px 0 0 8px',
          }}
        />
        <div
          style={{
            flex: 1,
            height: '80px',
            background: 'var(--gradient-energy)',
            borderRadius: '0 8px 8px 0',
          }}
        />
      </div>
    </div>
  ),
};

/* ==========================================================================
   MESH BACKGROUNDS & TEXTURES
   ========================================================================== */

export const Backgrounds: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div
        style={{
          padding: '64px',
          background: 'var(--bg-mesh-hero)',
          backgroundColor: 'var(--color-bg-primary)',
          position: 'relative',
          minHeight: '300px',
        }}
      >
        <h2
          className="csk-display"
          style={{ fontSize: 'var(--font-size-5xl)', marginBottom: '16px' }}
        >
          Mesh Hero Background
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px' }}>
          Subtle gradient mesh creates depth and atmosphere without overwhelming
          content. Primary blue and energy orange blend at edges.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '24px', padding: '24px' }}>
        <div
          className="csk-grain"
          style={{
            flex: 1,
            padding: '32px',
            background: 'var(--color-primary-500)',
            borderRadius: '16px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>
            With Grain Texture
          </h3>
          <p style={{ opacity: 0.9 }}>
            Subtle noise adds tactile quality and visual interest.
          </p>
        </div>

        <div
          className="csk-diagonal"
          style={{
            flex: 1,
            padding: '32px',
            background: 'var(--color-bg-secondary)',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>
              Diagonal Pattern
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Sporty diagonal stripes add dynamic energy.
            </p>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            padding: '32px',
            background: 'var(--bg-mesh-card)',
            backgroundColor: 'var(--color-bg-primary)',
            borderRadius: '16px',
            border: '1px solid var(--color-border-default)',
          }}
        >
          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Card Mesh</h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Lighter mesh for card backgrounds.
          </p>
        </div>
      </div>
    </div>
  ),
};

/* ==========================================================================
   ANGULAR ELEMENTS
   ========================================================================== */

export const AngularElements: StoryObj = {
  render: () => (
    <div style={{ padding: '48px', background: 'var(--color-bg-secondary)' }}>
      <h2
        className="csk-headline"
        style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '32px' }}
      >
        Dynamic Shapes
      </h2>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        <div
          className="csk-angle"
          style={{
            background: 'var(--gradient-primary)',
            padding: '48px',
            color: 'white',
          }}
        >
          <h3 className="csk-display" style={{ fontSize: 'var(--font-size-4xl)' }}>
            Angular Clip Path
          </h3>
          <p>Creates dynamic, sporty silhouettes.</p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div
            className="csk-border-accent"
            style={{
              flex: 1,
              padding: '24px',
              background: 'var(--color-bg-primary)',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>
              Accent Border
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              Gradient left border draws attention and adds brand color.
            </p>
          </div>

          <div
            style={{
              flex: 1,
              padding: '24px',
              background: 'var(--color-bg-primary)',
              borderRadius: '8px',
              borderLeft: '4px solid var(--color-energy-500)',
            }}
          >
            <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>
              Energy Highlight
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              Energy accent for important items.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

/* ==========================================================================
   STAGGERED REVEAL ANIMATION
   ========================================================================== */

export const RevealAnimation: StoryObj = {
  render: () => {
    const cards = [1, 2, 3, 4, 5, 6];

    return (
      <div style={{ padding: '48px', background: 'var(--color-bg-primary)' }}>
        <h2
          className="csk-headline"
          style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '8px' }}
        >
          Staggered Reveal
        </h2>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            marginBottom: '32px',
          }}
        >
          Refresh the page to see the animation. Each card enters with a
          sequential delay.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {cards.map((num) => (
            <div
              key={num}
              className={`csk-reveal csk-reveal-${num}`}
              style={{
                padding: '32px',
                background: 'var(--color-bg-secondary)',
                borderRadius: '12px',
                border: '1px solid var(--color-border-default)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'var(--gradient-primary)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontFamily: 'var(--font-family-display)',
                }}
              >
                {num}
              </div>
              <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Card {num}</h4>
              <p
                style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}
              >
                Delay: {(num - 1) * 50}ms
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   COMPLETE HERO EXAMPLE
   ========================================================================== */

export const HeroExample: StoryObj = {
  render: () => (
    <div
      className="csk-grain"
      style={{
        background: 'var(--bg-mesh-hero)',
        backgroundColor: 'var(--color-bg-primary)',
        minHeight: '500px',
        padding: '80px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Diagonal accent stripe */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '-10%',
          width: '40%',
          height: '100%',
          background: 'var(--gradient-energy-subtle)',
          transform: 'skewX(-12deg)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
        <div
          className="csk-reveal csk-reveal-1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'var(--color-energy-500)',
            borderRadius: '100px',
            color: 'white',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'white',
              animation: 'csk-results-live-pulse 1.5s ease-in-out infinite',
            }}
          />
          Live Results
        </div>

        <h1
          className="csk-display csk-reveal csk-reveal-2"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            lineHeight: 0.95,
            marginBottom: '24px',
          }}
        >
          Mistrovství ČR
          <br />
          <span style={{ color: 'var(--color-primary-500)' }}>
            ve vodním slalomu
          </span>
        </h1>

        <p
          className="csk-reveal csk-reveal-3"
          style={{
            fontSize: 'var(--font-size-xl)',
            color: 'var(--color-text-secondary)',
            marginBottom: '32px',
            maxWidth: '500px',
          }}
        >
          Sledujte výsledky v reálném čase. Kvalifikace, semifinále, finále.
        </p>

        <div
          className="csk-reveal csk-reveal-4"
          style={{ display: 'flex', gap: '16px' }}
        >
          <button
            style={{
              padding: '16px 32px',
              background: 'var(--gradient-energy)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              fontFamily: 'var(--font-family-display)',
            }}
          >
            Zobrazit výsledky
          </button>
          <button
            style={{
              padding: '16px 32px',
              background: 'transparent',
              border: '2px solid var(--color-border-strong)',
              borderRadius: '8px',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              fontFamily: 'var(--font-family-display)',
            }}
          >
            Program závodu
          </button>
        </div>
      </div>
    </div>
  ),
};

/* ==========================================================================
   COMPARISON: BEFORE/AFTER
   ========================================================================== */

export const Comparison: StoryObj = {
  render: () => (
    <div style={{ display: 'flex' }}>
      {/* Before */}
      <div
        style={{
          flex: 1,
          padding: '48px',
          background: '#fafafa',
          borderRight: '2px solid var(--color-border-default)',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: '#999',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Before: Generic
        </p>
        <h2
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '32px',
            fontWeight: 600,
            marginBottom: '16px',
            color: '#333',
          }}
        >
          Výsledky závodu
        </h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Standard Inter typography, safe amber accent, flat backgrounds.
        </p>
        <button
          style={{
            padding: '12px 24px',
            background: '#f59e0b',
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            fontWeight: 500,
          }}
        >
          Zobrazit
        </button>
      </div>

      {/* After */}
      <div
        className="csk-grain"
        style={{
          flex: 1,
          padding: '48px',
          background: 'var(--bg-mesh-primary)',
          backgroundColor: 'var(--color-bg-primary)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-energy-600)',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 600,
          }}
        >
          After: Dynamic Sport
        </p>
        <h2
          className="csk-display"
          style={{
            fontSize: '36px',
            marginBottom: '16px',
          }}
        >
          Výsledky závodu
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
          Plus Jakarta Sans display, vibrant energy accent, mesh background.
        </p>
        <button
          className="csk-hover-glow"
          style={{
            padding: '14px 28px',
            background: 'var(--gradient-energy)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600,
            fontFamily: 'var(--font-family-display)',
            cursor: 'pointer',
          }}
        >
          Zobrazit
        </button>
      </div>
    </div>
  ),
};
