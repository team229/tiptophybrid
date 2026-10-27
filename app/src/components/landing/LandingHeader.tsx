import { SITE } from '../../data/site';

/**
 * Slim paid-ads header: logo + tagline, a call button and Free Estimate.
 * No navigation — every button either starts a call or scrolls to the form.
 */
export default function LandingHeader() {
  return (
    <header id="main-header" className="w-full bg-black text-white shadow-lg">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between gap-1.5 px-3.5 sm:h-[84px] sm:gap-3 sm:px-6 lg:h-[92px] lg:px-8">
        <a href="/repair/" className="flex shrink-0 flex-col leading-none" aria-label="Tip Top Hybrid">
          <img src={SITE.logo} alt="Tip Top Hybrid" className="h-8 w-auto sm:h-11 lg:h-14" />
          <span className="mt-1 text-[7px] font-medium uppercase tracking-[0.2em] text-gray-300 sm:text-[9px]">
            Toyota Prius Specialist
          </span>
        </a>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-white px-2 py-2.5 text-xs font-semibold text-[#16233f] shadow-md transition-colors hover:bg-gray-100 hover:text-[#16233f] sm:gap-2 sm:px-4 sm:text-base"
            aria-label={`Call Tip Top Hybrid on ${SITE.phone}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-green-500"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="hidden sm:inline">{SITE.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>

          <a
            href="/repair/#contact"
            className="inline-flex items-center whitespace-nowrap rounded-md bg-green-500 px-2.5 py-2.5 text-xs font-semibold text-white shadow-md transition-colors hover:bg-green-600 hover:text-white sm:px-5 sm:text-base"
          >
            Free Estimate
          </a>
        </div>
      </div>
    </header>
  );
}
