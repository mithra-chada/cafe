import type { Metadata } from 'next';
import './globals.css';
import { SITE_META, CHERONEY_PHOTOS } from '@/data/cafe';
import SmoothScrollAndTransitions from '@/components/SmoothScrollAndTransitions';

export const metadata: Metadata = {
  title: SITE_META.title,
  description: SITE_META.description,
  metadataBase: new URL('https://cheroney.com'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    url: 'https://cheroney.com',
    siteName: 'Cheroney Café',
    images: [
      {
        url: CHERONEY_PHOTOS.bohoCounter,
        width: 1200,
        height: 630,
        alt: 'Cheroney Café Interior & Espresso Bar in Yendada, Visakhapatnam'
      }
    ],
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_META.title,
    description: SITE_META.description,
    images: [CHERONEY_PHOTOS.bohoCounter]
  },
  robots: {
    index: true,
    follow: true
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'CafeOrCoffeeShop'],
  name: 'Cheroney',
  alternateName: 'Cheroney Boho Specialty Café & Kitchen',
  description: SITE_META.description,
  url: 'https://cheroney.com',
  telephone: SITE_META.telephone,
  priceRange: '₹400 – ₹1,200',
  servesCuisine: ['Specialty Coffee', 'Continental', 'Italian', 'Desserts', 'Kombucha Mocktails'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Beside MK Gold Coast, Mubarak Colony, Yendada',
    addressLocality: 'Visakhapatnam',
    addressRegion: 'Andhra Pradesh',
    postalCode: '530045',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 17.7788,
    longitude: 83.3577
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '23:00'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '484',
    bestRating: '5',
    worstRating: '1'
  },
  hasMap: SITE_META.mapsUrl,
  image: [
    CHERONEY_PHOTOS.bohoCounter,
    CHERONEY_PHOTOS.latteBrownie,
    CHERONEY_PHOTOS.bruschetta,
    CHERONEY_PHOTOS.bohoLounge
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScrollAndTransitions />
        {children}
      </body>
    </html>
  );
}

