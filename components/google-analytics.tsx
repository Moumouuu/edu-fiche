"use client";
import Script from "next/script";

const GoogleAnalytics = () => {
  //You can show in the console the GA_TRACKING_ID to confirm

  return (
    <>
      <Script
        defer
        src="http://umami-yck480o.5.75.226.51.sslip.io/script.js"
        data-website-id="6a44a36d-e1a7-44ce-99a4-f80d00620193"
      ></Script>
    </>
  );
};

export default GoogleAnalytics;
