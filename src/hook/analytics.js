// analytics.js
export const logEvent = (eventName, eventParams) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  };
  