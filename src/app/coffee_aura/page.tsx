import React from 'react';
import AuraHeader from '@/components/sites/coffee_aura/AuraHeader';
import AuraHero from '@/components/sites/coffee_aura/AuraHero';
import AuraMenuFeatures from '@/components/sites/coffee_aura/AuraMenuFeatures';
import AuraTestimonials from '@/components/sites/coffee_aura/AuraTestimonials';
import AuraTrustedMarquee from '@/components/sites/coffee_aura/AuraTrustedMarquee';
import AuraAboutCraft from '@/components/sites/coffee_aura/AuraAboutCraft';
import AuraGallery from '@/components/sites/coffee_aura/AuraGallery';
import AuraFooter from '@/components/sites/coffee_aura/AuraFooter';

export default function CoffeeAuraPage() {
  return (
    <div className="bg-[#faf8f1] text-[#17191f] selection:bg-[#1f6f49] selection:text-white">
      <main className="mx-auto min-h-screen w-full max-w-[112rem] overflow-hidden bg-[#faf8f1] shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
        <AuraHeader />
        <AuraHero />
        <AuraMenuFeatures />
        <AuraTestimonials />
        <AuraTrustedMarquee />
        <AuraAboutCraft />
        <AuraGallery />
        <AuraFooter />
      </main>
    </div>
  );
}
