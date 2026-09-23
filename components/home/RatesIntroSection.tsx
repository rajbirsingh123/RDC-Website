"use client";

import { BankPostedRatesBlock } from "@/components/home/BankPostedRatesBlock";

export function RatesIntroSection() {
  return (
    <section className="rates-intro">
      <div className="container-xl">
        <BankPostedRatesBlock />
      </div>
    </section>
  );
}
