import { Metadata } from 'next';

export default function Head() {
  return (
    <head>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/images/logo.png" type="image/png" sizes="32x32" />
      <link rel="icon" href="/images/logo.png" type="image/png" sizes="16x16" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/images/logo.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/images/logo.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileImage" content="/images/logo.png" />
      <meta name="theme-color" content="#07b300" />
    </head>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL('https://codeo-ui.com'),
  title: {
    default: 'Codeo UI - Transformez vos maquettes en code',
    template: '%s | Codeo UI',
  },
  description: 'Codeo UI convertit automatiquement vos captures d\'écran d\'interfaces utilisateur en code de production propre et optimisé pour React, Vue et HTML natif.',
  keywords: [
    'maquette vers code',
    'design to code',
    'conversion UI en code',
    'IDE en ligne',
    'collaboration en temps réel',
    'déploiement continu',
    'outils de développement',
    'next.js',
    'react',
    'typescript',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://codeo-ui.com',
    title: 'Codeo UI - Transformez vos maquettes en code',
    description: 'Codeo UI convertit automatiquement vos captures d\'écran d\'interfaces utilisateur en code de production',
    siteName: 'Codeo UI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codeo UI',
    description: 'Transformez vos maquettes en code en un clic',
    creator: '@codeo',
  },
};
