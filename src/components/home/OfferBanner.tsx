'use client';

import { ArrowRight } from 'lucide-react';

export interface OfferBannerProps {
  /** Main headline of the offer. */
  title: string;
  /** Supporting line under the title. */
  subtitle?: string;
  /** Optional background image URL. Falls back to a solid brand color. */
  image?: string;
  /** Destination for the call-to-action. */
  link?: string;
  /** CTA label. Defaults to "Shop Now". */
  buttonText?: string;
  /** Optional short highlight shown as a pill (e.g. "Limited Time"). */
  badge?: string;
  /** Called when the CTA is clicked (useful when no `link` is provided). */
  onAction?: () => void;
  className?: string;
}

export function OfferBanner({
  title,
  subtitle,
  image,
  link,
  buttonText = 'Shop Now',
  badge,
  onAction,
  className = '',
}: OfferBannerProps) {
  const hasImage = Boolean(image);

  return (
    <section
      className={`w-full px-4 py-6 sm:px-6 lg:px-8 ${className}`}
      aria-label={title}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-green-600">
          {/* Background image */}
          {hasImage && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-black/45"
                aria-hidden="true"
              />
            </>
          )}

          {/* Content */}
          <div className="relative flex flex-col items-start gap-4 p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex flex-col gap-2">
              {badge && (
                <span className="inline-flex w-fit items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  {badge}
                </span>
              )}
              <h2 className="text-2xl font-bold text-white text-balance sm:text-3xl lg:text-4xl">
                {title}
              </h2>
              {subtitle && (
                <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
                  {subtitle}
                </p>
              )}
            </div>

            {link ? (
              <a
                href={link}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-green-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600"
              >
                <span>{buttonText}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <button
                type="button"
                onClick={onAction}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-green-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600"
              >
                <span>{buttonText}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfferBanner;
