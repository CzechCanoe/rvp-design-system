import type { Meta, StoryObj } from '@storybook/react';
import { MobileProfilePage, PublicProfilePage } from './AthletePages';

/**
 * Athlete pages composed only of design system components (references `docs/v2/reference/Profil.html`
 * and `ProfilMobil.html`). Local CSS is page layout only. Data is deterministic.
 */
const meta: Meta = {
  title: 'Athlete',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/** Reference Profil.html: public profile (desktop; one column on a phone). */
export const PublicProfile: Story = {
  render: () => <PublicProfilePage />,
};

/** Reference ProfilMobil.html: "Moje" profile on a 390 px phone. */
export const MobileProfile: Story = {
  render: () => <MobileProfilePage />,
};
