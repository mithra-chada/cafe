import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './aura.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-aura-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-aura-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Café Nova — Specialty Coffee & Neighborhood Rituals',
  description: 'A warm, specialty coffee shop focusing on calm neighborhood rituals, floral espresso, hand-poured filter, and small-batch pastries.',
  openGraph: {
    title: 'Café Nova — Specialty Coffee & Neighborhood Rituals',
    description: 'A warm, specialty coffee shop focusing on calm neighborhood rituals, floral espresso, hand-poured filter, and small-batch pastries.',
    images: ['https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/preview-images/specialty-coffee.png'],
  },
};

export default function CoffeeAuraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${instrumentSerif.variable} coffee-aura-root min-h-screen`}>
      {children}
    </div>
  );
}
