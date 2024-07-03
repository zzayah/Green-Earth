import React, { useEffect, useRef } from 'react';
import styles from './assets.module.css'; // Import CSS module

const TradingViewWidget = () => {
  const widgetContainerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "light",
      "dateRange": "12M",
      "exchange": "US",
      "showChart": true,
      "locale": "en",
      "largeChartUrl": "",
      "isTransparent": false,
      "showSymbolLogo": false,
      "showFloatingTooltip": false,
      "width": "100%",
      "height": "100%",
      "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
      "plotLineColorFalling": "rgba(41, 98, 255, 1)",
      "gridLineColor": "rgba(240, 243, 250, 0)",
      "scaleFontColor": "rgba(19, 23, 34, 1)",
      "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
      "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
      "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
      "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
      "symbolActiveColor": "rgba(41, 98, 255, 0.12)"
    });

    // Append the script to the widget container
    if (widgetContainerRef.current) {
      widgetContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className={styles.tradingviewWidgetContainer}>
      <div ref={widgetContainerRef} className={styles.tradingviewWidgetContainerWidget}></div>
      <div className={styles.tradingviewWidgetCopyright}>
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className={styles.blueText}>Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
