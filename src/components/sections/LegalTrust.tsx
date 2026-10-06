import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck } from "lucide-react";

export function LegalTrust() {
  return (
    <section className="border-y border-gold/15 bg-blue-50/60 py-6 sm:py-7">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <BadgeCheck className="h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
          <div>
            <h2 className="text-sm font-semibold text-foreground">Usaha berbadan hukum</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              PT. Vicky Rental Nusantara <span aria-hidden="true">·</span> Akta{" "}
              <span className="whitespace-nowrap">AHU-006180.AH.01.30.TAHUN 2025</span>
            </p>
          </div>
        </div>
        <Link
          to="/tentang-kami"
          hash="legalitas"
          className="inline-flex items-center gap-1.5 self-start text-xs font-medium text-gold transition-colors hover:text-foreground sm:self-center"
        >
          Lihat legalitas
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
