import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { Button } from '../Button';
import { Input } from '../Input';
import { Badge } from '../Badge';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Header komponenta pro aplikační hlavičky.

## Použití

\`\`\`tsx
import { Header } from '@czechcanoe/rvp-design-system';

<Header
  brand={<a href="/"><img src="/logo.svg" alt="CSK" /></a>}
  navigation={<nav>...</nav>}
  search={<Input type="search" placeholder="Hledat..." />}
  userMenu={<UserAvatar />}
/>
\`\`\`

## Vlastnosti

- **Responzivní** - automaticky se přepíná na mobilní menu
- **Sticky** - volitelné sticky pozicování
- **Varianty** - default, elevated, gradient, satellite
- **Flexibilní sloty** - brand, navigation, search, actions, userMenu
- **Mobile drawer** - vysouvací menu pro mobilní zařízení
- **WCAG 2.1 AA** - přístupná klávesová navigace
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'gradient', 'satellite'],
    },
    appName: {
      control: 'text',
      description: 'Application name for satellite variant',
    },
    homeLink: {
      control: 'text',
      description: 'Link to main website for satellite variant',
    },
    homeLinkLabel: {
      control: 'text',
      description: 'Label for home link',
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    sticky: {
      control: 'boolean',
    },
    bordered: {
      control: 'boolean',
    },
    showMobileToggle: {
      control: 'boolean',
    },
    blurOnScroll: {
      control: 'boolean',
    },
    scrollThreshold: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// Mock logo with display font
const Logo = () => (
  <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="var(--color-primary-500)"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CSK</text>
    </svg>
    <span className="csk-header__brand-title" style={{ fontSize: '1.125rem' }}>Kanoistika</span>
  </a>
);

// Mock navigation links
const NavLinks = () => (
  <div style={{ display: 'flex', gap: '4px' }}>
    {['Závody', 'Výsledky', 'Závodníci', 'Kluby'].map((item) => (
      <a
        key={item}
        href="#"
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          textDecoration: 'none',
          color: 'var(--color-text-secondary)',
          fontWeight: 500,
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
          e.currentTarget.style.color = 'var(--color-text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--color-text-secondary)';
        }}
      >
        {item}
      </a>
    ))}
  </div>
);

// Mobile navigation
const MobileNavLinks = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    {['Závody', 'Výsledky', 'Závodníci', 'Kluby', 'Registrace', 'Můj účet'].map((item) => (
      <a
        key={item}
        href="#"
        style={{
          padding: '12px 16px',
          borderRadius: '8px',
          textDecoration: 'none',
          color: 'var(--color-text-secondary)',
          fontWeight: 500,
        }}
      >
        {item}
      </a>
    ))}
  </div>
);

// Mock user avatar
const UserAvatar = () => (
  <button
    style={{
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: 'var(--color-primary-500)',
      color: 'white',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
    }}
  >
    JB
  </button>
);

// Search icon
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// Bell icon for notifications
const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

/**
 * Základní použití s logem, navigací a uživatelským menu.
 */
export const Default: Story = {
  args: {
    brand: <Logo />,
    navigation: <NavLinks />,
    userMenu: <UserAvatar />,
    mobileMenuContent: <MobileNavLinks />,
  },
};

/**
 * Header s vyhledáváním.
 */
export const WithSearch: Story = {
  args: {
    brand: <Logo />,
    navigation: <NavLinks />,
    search: (
      <Input
        type="search"
        placeholder="Hledat závodníky, závody..."
        size="sm"
        iconLeft={<SearchIcon />}
        clearable
        style={{ width: '280px' }}
      />
    ),
    userMenu: <UserAvatar />,
    mobileMenuContent: <MobileNavLinks />,
  },
};

/**
 * Header s akcemi (notifikace, tlačítka).
 */
export const WithActions: Story = {
  args: {
    brand: <Logo />,
    navigation: <NavLinks />,
    actions: (
      <>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            border: 'none',
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            borderRadius: '8px',
            position: 'relative',
          }}
        >
          <BellIcon />
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-error-500)',
            }}
          />
        </button>
        <Button size="sm" variant="secondary">
          Přihlásit se
        </Button>
      </>
    ),
    mobileMenuContent: <MobileNavLinks />,
  },
};

/**
 * Elevated varianta s výrazným stínem.
 */
export const Elevated: Story = {
  args: {
    brand: <Logo />,
    navigation: <NavLinks />,
    search: (
      <Input
        type="search"
        placeholder="Hledat..."
        size="sm"
        iconLeft={<SearchIcon />}
        style={{ width: '240px' }}
      />
    ),
    userMenu: <UserAvatar />,
    variant: 'elevated',
    bordered: false,
    mobileMenuContent: <MobileNavLinks />,
  },
};

/**
 * Sticky header (scrollujte pro demonstraci).
 */
export const Sticky: Story = {
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200vh' }}>
        <Story />
        <div style={{ padding: '24px' }}>
          <h2>Obsah stránky</h2>
          <p>Scrollujte dolů pro demonstraci sticky headeru.</p>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} style={{ marginTop: '16px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
      </div>
    ),
  ],
  args: {
    brand: <Logo />,
    navigation: <NavLinks />,
    search: (
      <Input
        type="search"
        placeholder="Hledat..."
        size="sm"
        iconLeft={<SearchIcon />}
        style={{ width: '200px' }}
      />
    ),
    userMenu: <UserAvatar />,
    sticky: true,
    variant: 'elevated',
    bordered: false,
    mobileMenuContent: <MobileNavLinks />,
  },
};

/**
 * Různé velikosti headeru.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Size: sm (48px)
        </p>
        <Header
          size="sm"
          brand={<Logo />}
          navigation={<NavLinks />}
          userMenu={<UserAvatar />}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Size: md (56px) - default
        </p>
        <Header
          size="md"
          brand={<Logo />}
          navigation={<NavLinks />}
          userMenu={<UserAvatar />}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Size: lg (64px)
        </p>
        <Header
          size="lg"
          brand={<Logo />}
          navigation={<NavLinks />}
          userMenu={<UserAvatar />}
        />
      </div>
    </div>
  ),
};

/**
 * CSK - Veřejný portál s live badge.
 */
export const CSKPublicPortal: Story = {
  args: {
    brand: (
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="var(--color-primary-500)"/>
          <text x="20" y="26" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">CSK</text>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>Český svaz kanoistů</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>Výsledkový servis</span>
        </div>
      </a>
    ),
    navigation: (
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[
          { label: 'Kalendář', href: '#' },
          { label: 'Výsledky', href: '#' },
          { label: 'Live', href: '#', badge: true },
          { label: 'Závodníci', href: '#' },
          { label: 'Kluby', href: '#' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
            }}
          >
            {item.label}
            {item.badge && (
              <Badge variant="error" size="sm" pill>
                LIVE
              </Badge>
            )}
          </a>
        ))}
      </div>
    ),
    search: (
      <Input
        type="search"
        placeholder="Hledat závodníky, závody, kluby..."
        size="sm"
        iconLeft={<SearchIcon />}
        clearable
        style={{ width: '280px' }}
      />
    ),
    actions: (
      <Button size="sm" variant="primary">
        Přihlásit se
      </Button>
    ),
    size: 'md',
    mobileMenuContent: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {['Kalendář', 'Výsledky', 'Live', 'Závodníci', 'Kluby', 'Registrace'].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
            }}
          >
            {item}
            {item === 'Live' && (
              <Badge variant="error" size="sm" pill>
                LIVE
              </Badge>
            )}
          </a>
        ))}
      </div>
    ),
  },
};

/**
 * CSK - Administrační rozhraní.
 */
export const CSKAdminPanel: Story = {
  args: {
    brand: (
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="var(--color-neutral-800)"/>
          <text x="16" y="21" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CSK</text>
        </svg>
        <span style={{ fontWeight: 600 }}>Admin</span>
      </a>
    ),
    navigation: (
      <div style={{ display: 'flex', gap: '4px' }}>
        {['Závody', 'Závodníci', 'Kluby', 'Členství', 'Nastavení'].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            {item}
          </a>
        ))}
      </div>
    ),
    actions: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge variant="success" size="sm">
          Produkce
        </Badge>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            border: 'none',
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            borderRadius: '6px',
          }}
        >
          <BellIcon />
        </button>
      </div>
    ),
    userMenu: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <UserAvatar />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Jan Novák</span>
          <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Správce</span>
        </div>
      </div>
    ),
    size: 'sm',
    mobileMenuContent: <MobileNavLinks />,
  },
};

/**
 * Header bez navigace - minimální varianta.
 */
export const Minimal: Story = {
  args: {
    brand: <Logo />,
    actions: (
      <Button size="sm" variant="primary">
        Zpět na hlavní stránku
      </Button>
    ),
    showMobileToggle: false,
  },
};

/**
 * Gradient varianta s branded vzhledem.
 */
export const Gradient: Story = {
  args: {
    brand: (
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.2)"/>
          <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CSK</text>
        </svg>
        <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Kanoistika</span>
      </a>
    ),
    navigation: (
      <div style={{ display: 'flex', gap: '4px' }}>
        {['Závody', 'Výsledky', 'Závodníci', 'Kluby'].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {item}
          </a>
        ))}
      </div>
    ),
    userMenu: (
      <button
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.5)',
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: 'white',
          fontWeight: 600,
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        JB
      </button>
    ),
    variant: 'gradient',
    bordered: false,
    mobileMenuContent: <MobileNavLinks />,
  },
};

/**
 * Sticky header s blur efektem při scrollu.
 */
export const StickyWithBlur: Story = {
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200vh' }}>
        <Story />
        <div style={{ padding: '24px' }}>
          <h2>Blur efekt při scrollu</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Scrollujte dolů - header získá blur efekt a stín po překročení prahu 10px.
          </p>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} style={{ marginTop: '16px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
      </div>
    ),
  ],
  args: {
    brand: <Logo />,
    navigation: <NavLinks />,
    search: (
      <Input
        type="search"
        placeholder="Hledat..."
        size="sm"
        iconLeft={<SearchIcon />}
        style={{ width: '200px' }}
      />
    ),
    userMenu: <UserAvatar />,
    sticky: true,
    blurOnScroll: true,
    bordered: true,
    mobileMenuContent: <MobileNavLinks />,
  },
};

/**
 * Gradient sticky header s blur efektem.
 */
export const GradientStickyWithBlur: Story = {
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200vh' }}>
        <Story />
        <div style={{ padding: '24px' }}>
          <h2>Gradient header s blur efektem</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Kombinace gradient varianty se sticky a blur efektem pro prémiový vzhled.
          </p>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} style={{ marginTop: '16px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
    ),
  ],
  args: {
    brand: (
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.2)"/>
          <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CSK</text>
        </svg>
        <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Kanoistika</span>
      </a>
    ),
    navigation: (
      <div style={{ display: 'flex', gap: '4px' }}>
        {['Závody', 'Výsledky', 'Závodníci', 'Kluby'].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
            }}
          >
            {item}
          </a>
        ))}
      </div>
    ),
    userMenu: (
      <button
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.5)',
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: 'white',
          fontWeight: 600,
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        JB
      </button>
    ),
    variant: 'gradient',
    sticky: true,
    blurOnScroll: true,
    bordered: false,
    mobileMenuContent: <MobileNavLinks />,
  },
};

/**
 * Showcase všech variant headeru.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Variant: default
        </p>
        <Header
          variant="default"
          brand={<Logo />}
          navigation={<NavLinks />}
          userMenu={<UserAvatar />}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Variant: elevated
        </p>
        <Header
          variant="elevated"
          bordered={false}
          brand={<Logo />}
          navigation={<NavLinks />}
          userMenu={<UserAvatar />}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Variant: gradient
        </p>
        <Header
          variant="gradient"
          bordered={false}
          brand={
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.2)"/>
                <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CSK</text>
              </svg>
              <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Kanoistika</span>
            </a>
          }
          navigation={
            <div style={{ display: 'flex', gap: '4px' }}>
              {['Závody', 'Výsledky', 'Závodníci'].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 500,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          }
          userMenu={
            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.5)',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              JB
            </button>
          }
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Variant: satellite (pro standalone aplikace)
        </p>
        <Header
          variant="satellite"
          appName="Registrace"
          brand={<Logo />}
          userMenu={<UserAvatar />}
          actions={
            <Button size="sm" variant="secondary">
              Nápověda
            </Button>
          }
        />
      </div>
    </div>
  ),
};

// =============================================================================
// SATELLITE VARIANT STORIES
// =============================================================================

/**
 * Satellite varianta pro samostatné aplikace jako Registr nebo Přihlášky.
 * Obsahuje odkaz zpět na hlavní web, název aplikace a minimální navigaci.
 */
export const Satellite: Story = {
  args: {
    variant: 'satellite',
    appName: 'Registrace',
    brand: <Logo />,
    userMenu: <UserAvatar />,
    actions: (
      <Button size="sm" variant="secondary">
        Nápověda
      </Button>
    ),
  },
};

/**
 * Satellite varianta - Registr závodníků.
 */
export const SatelliteRegistr: Story = {
  args: {
    variant: 'satellite',
    appName: 'Registr závodníků',
    homeLink: 'https://kanoe.cz',
    homeLinkLabel: 'Zpět na kanoe.cz',
    brand: (
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="var(--color-primary-500)"/>
          <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CSK</text>
        </svg>
      </a>
    ),
    userMenu: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <UserAvatar />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Jan Novák</span>
          <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>USK Praha</span>
        </div>
      </div>
    ),
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="sm" variant="ghost">
          Nápověda
        </Button>
        <Button size="sm" variant="secondary">
          Odhlásit
        </Button>
      </div>
    ),
    size: 'sm',
  },
};

/**
 * Satellite varianta - Přihlášky na závody.
 */
export const SatellitePrihlasky: Story = {
  args: {
    variant: 'satellite',
    appName: 'Přihlášky na závody',
    homeLink: 'https://kanoe.cz',
    homeLinkLabel: 'Zpět na kanoe.cz',
    brand: (
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="var(--color-primary-500)"/>
          <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CSK</text>
        </svg>
      </a>
    ),
    navigation: (
      <div style={{ display: 'flex', gap: '4px' }}>
        {['Moje přihlášky', 'Kalendář', 'Historie'].map((item, index) => (
          <a
            key={item}
            href="#"
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              color: index === 0 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              fontWeight: 500,
              fontSize: '14px',
              backgroundColor: index === 0 ? 'var(--color-bg-secondary)' : 'transparent',
            }}
          >
            {item}
          </a>
        ))}
      </div>
    ),
    userMenu: <UserAvatar />,
    actions: (
      <Badge variant="info" size="sm">
        3 aktivní přihlášky
      </Badge>
    ),
  },
};

/**
 * Satellite varianta - Live výsledky.
 */
export const SatelliteLive: Story = {
  args: {
    variant: 'satellite',
    appName: 'Live výsledky',
    homeLink: 'https://kanoe.cz',
    homeLinkLabel: 'Zpět na kanoe.cz',
    brand: (
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="var(--color-primary-500)"/>
          <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CSK</text>
        </svg>
      </a>
    ),
    actions: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Badge variant="error" size="sm" pill>
          LIVE
        </Badge>
        <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Český pohár #2 - Praha Troja
        </span>
      </div>
    ),
    size: 'sm',
  },
};

/**
 * Satellite varianta s vlastním odkazem na hlavní web.
 */
export const SatelliteCustomHomeLink: Story = {
  args: {
    variant: 'satellite',
    appName: 'Členská sekce',
    homeLink: 'https://kanoe.cz/clenstvi',
    homeLinkLabel: 'Členství',
    brand: <Logo />,
    userMenu: <UserAvatar />,
  },
};

// =============================================================================
// AESTHETIC - DISPLAY FONT SHOWCASE
// =============================================================================

/**
 * Display font showcase - brand title a app name používají Plus Jakarta Sans.
 */
export const DisplayFontShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
          Brand title with display font (csk-header__brand-title class)
        </p>
        <Header
          variant="default"
          brand={
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="var(--color-primary-500)"/>
                <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CSK</text>
              </svg>
              <span className="csk-header__brand-title" style={{ fontSize: '1.25rem' }}>Kanoistika</span>
            </a>
          }
          navigation={<NavLinks />}
          userMenu={<UserAvatar />}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
          Satellite app name with display font (automatic)
        </p>
        <Header
          variant="satellite"
          appName="Live výsledky"
          brand={
            <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="var(--color-primary-500)"/>
                <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CSK</text>
              </svg>
            </a>
          }
          actions={
            <Badge variant="error" size="lg" pill>ŽIVĚ</Badge>
          }
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
          Gradient variant with display font brand
        </p>
        <Header
          variant="gradient"
          bordered={false}
          brand={
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white' }}>
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.2)"/>
                <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CSK</text>
              </svg>
              <span className="csk-header__brand-title" style={{ fontSize: '1.25rem' }}>Český svaz kanoistů</span>
            </a>
          }
          actions={
            <Button variant="primary" size="sm">Sledovat live</Button>
          }
          userMenu={
            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.5)',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              JB
            </button>
          }
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header with display font (Plus Jakarta Sans) for brand titles and app names. Use `csk-header__brand-title` class for brand text.',
      },
    },
  },
};
