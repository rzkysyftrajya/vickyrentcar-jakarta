import React from "react";

export type IconType =
  | "airport"
  | "corporate"
  | "wedding"
  | "hotel"
  | "daily"
  | "out-of-town"
  | "whatsapp";

interface AppIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: IconType;
  className?: string;
}

/**
 * Renders an icon from /icons/*.webp utilizing CSS masking.
 * By using `bg-current`, the icon inherits the current text color (e.g., text-gold, text-white, text-primary-foreground).
 */
export function AppIcon({ name, className = "h-6 w-6", style, ...props }: AppIconProps) {
  const iconPath = `/icon/${name}.webp`;

  return (
    <span
      className={`inline-block bg-current shrink-0 select-none ${className}`}
      style={{
        maskImage: `url('${iconPath}')`,
        WebkitMaskImage: `url('${iconPath}')`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

export function WhatsAppIcon({ className = "h-5 w-5", ...props }: Omit<AppIconProps, "name">) {
  return <AppIcon name="whatsapp" className={className} {...props} />;
}

export function AirportIcon({ className = "h-8 w-8", ...props }: Omit<AppIconProps, "name">) {
  return <AppIcon name="airport" className={className} {...props} />;
}

export function CorporateIcon({ className = "h-8 w-8", ...props }: Omit<AppIconProps, "name">) {
  return <AppIcon name="corporate" className={className} {...props} />;
}

export function WeddingIcon({ className = "h-8 w-8", ...props }: Omit<AppIconProps, "name">) {
  return <AppIcon name="wedding" className={className} {...props} />;
}

export function HotelIcon({ className = "h-8 w-8", ...props }: Omit<AppIconProps, "name">) {
  return <AppIcon name="hotel" className={className} {...props} />;
}

export function DailyIcon({ className = "h-8 w-8", ...props }: Omit<AppIconProps, "name">) {
  return <AppIcon name="daily" className={className} {...props} />;
}

export function OutOfTownIcon({ className = "h-8 w-8", ...props }: Omit<AppIconProps, "name">) {
  return <AppIcon name="out-of-town" className={className} {...props} />;
}
