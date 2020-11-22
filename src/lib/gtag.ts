export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const tagEvent = (name: Gtag.EventNames | string, params?: Gtag.EventParams): void => {
  window.gtag('event', name, params);
};
