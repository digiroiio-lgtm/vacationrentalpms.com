/* VacationRentalPMS.com - GA4 sitewide CTA tracking */
(function () {
  const GA4_ID = 'G-TZ3WP6SPKW';

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  if (!window.__vrpmsGa4Initialized) {
    window.__vrpmsGa4Initialized = true;
    if (!document.querySelector('script[src*="googletagmanager.com/gtag/js?id=' + GA4_ID + '"]')) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
      document.head.appendChild(s);
    }
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
  }

  const featurePaths = new Set([
    '/vacation-rental-channel-manager/',
    '/vacation-rental-automation-software/',
    '/vacation-rental-guest-messaging-software/',
    '/vacation-rental-housekeeping-software/',
    '/vacation-rental-task-management-software/',
    '/vacation-rental-analytics-software/',
    '/vacation-rental-reporting-software/',
    '/vacation-rental-accounting-software/',
    '/dynamic-pricing-software-for-vacation-rentals/',
    '/vacation-rental-owner-management-software/',
    '/vacation-rental-calendar-software/',
    '/vacation-rental-reservation-software/',
    '/vacation-rental-revenue-management-software/',
    '/vacation-rental-pricing-software/',
    '/vacation-rental-operations-software/'
  ]);

  const stackPaths = new Set([
    '/airbnb-spreadsheet-vs-pms/',
    '/airbnb-cleaner-whatsapp-alternative/',
    '/pms-vs-separate-airbnb-tools/',
    '/google-sheets-alternative-for-airbnb/',
    '/cleaning-spreadsheet-alternative/',
    '/airbnb-vs-property-management-software/',
    '/pms-vs-channel-manager/',
    '/channel-manager-vs-ical/'
  ]);

  const integrationPaths = new Set([
    '/airbnb-pms-integration/',
    '/vrbo-pms-integration/',
    '/booking-com-pms-integration/',
    '/pms-with-pricelabs/',
    '/vacation-rental-pms-quickbooks/',
    '/vacation-rental-pms-smart-locks/'
  ]);

  function text(el) {
    return (el.getAttribute('data-cta-text') || el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || el.getAttribute('href') || '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function urlObj(link) {
    try { return new URL(link.href, window.location.href); } catch (e) { return null; }
  }

  function path(link) {
    const u = urlObj(link);
    return u ? u.pathname : (link.getAttribute('href') || '');
  }

  function destination(link) {
    const raw = link.getAttribute('href') || '';
    if (/^(mailto:|tel:|sms:)/i.test(raw)) return raw;
    const u = urlObj(link);
    if (!u) return raw;
    return u.origin === window.location.origin ? u.pathname + u.search + u.hash : u.href;
  }

  function outbound(link) {
    const raw = link.getAttribute('href') || '';
    if (/^(mailto:|tel:|sms:)/i.test(raw)) return true;
    const u = urlObj(link);
    return !!u && /^https?:$/.test(u.protocol) && u.origin !== window.location.origin;
  }

  function portfolioSize(link) {
    const h = (path(link) + ' ' + text(link)).toLowerCase();
    if (/100(?:-plus|\+|\s*plus)|100 properties/.test(h)) return '100+';
    if (/2-4|2–4|2 to 4/.test(h)) return '2-4';
    if (/\b50\b/.test(h)) return '50';
    if (/\b20\b/.test(h)) return '20';
    if (/\b10\b/.test(h)) return '10';
    if (/\b5\b/.test(h)) return '5';
    if (/\b1\b|one property/.test(h)) return '1';
    return null;
  }

  function sectionLabel(link) {
    if (link.closest('footer')) return 'footer';
    if (link.closest('header, nav')) return 'navigation';
    const section = link.closest('section');
    if (!section) return 'content';
    if (section.classList.contains('hero')) return 'hero';
    if (section.classList.contains('cta-section')) return 'primary-cta';
    if (section.id === 'features') return 'features';
    const eyebrow = (section.querySelector('.eyebrow')?.textContent || '').toLowerCase();
    if (eyebrow.includes('best software')) return 'best-software';
    if (eyebrow.includes('portfolio size') || eyebrow.includes('airbnb tech stack')) return 'portfolio-size';
    if (eyebrow.includes('pms by portfolio')) return 'pms-by-portfolio';
    if (eyebrow.includes('alternatives')) return 'alternatives-switching';
    if (eyebrow.includes('switch')) return 'alternatives-switching';
    if (eyebrow.includes('replace my stack')) return 'replace-my-stack';
    if (eyebrow.includes('integrations')) return 'integrations';
    if (eyebrow.includes('comparisons') || eyebrow.includes('commercial comparison')) return 'comparisons';
    if (eyebrow.includes('pricing')) return 'pricing';
    if (eyebrow.includes('guide') || eyebrow.includes('pms basics')) return 'guides';
    return section.id || 'content';
  }

  function ctaType(link) {
    const p = path(link).toLowerCase();
    const t = text(link).toLowerCase();

    if (link.closest('footer')) return 'footer';
    if (link.closest('header, nav')) return 'navigation';
    if (outbound(link)) return 'outbound';
    if (p.startsWith('/compare/') || / vs avrenor/.test(t)) return 'comparison';
    if (/-alternative\/?$/.test(p) || /alternative\/?$/.test(p)) return 'alternative';
    if (p.startsWith('/switch-from-') || p === '/switch-vacation-rental-pms/' || t.startsWith('switch from')) return 'switch';
    if (stackPaths.has(p)) return 'stack_replacement';
    if (integrationPaths.has(p)) return 'integration';
    if (/^\/vacation-rental-pms-for-(5|10|20|50|100)-properties\/$/.test(p)) return 'pms_by_portfolio';
    if (/^\/airbnb-software-for-(1|2-4|5|10|20|50|100-plus)-propert/.test(p) || p === '/airbnb-software-stack/') return 'portfolio';
    if (featurePaths.has(p)) return 'feature';
    if (p === '/pricing/' || p.includes('pricing') || p === '/vacation-rental-pms-cost/') return 'pricing';
    if (p === '/guides/' || p.startsWith('/guides/')) return 'guide';
    const section = link.closest('section');
    if (link.classList.contains('button') && section && (section.classList.contains('hero') || section.classList.contains('cta-section'))) return 'primary_cta';
    return 'navigation';
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (!href || href === '#' || /^javascript:/i.test(href)) return;

    window.gtag('event', 'cta_click', {
      cta_text: text(link).slice(0, 150),
      cta_type: link.getAttribute('data-cta-type') || ctaType(link),
      source_page: window.location.pathname,
      destination_url: destination(link).slice(0, 500),
      page_section: link.getAttribute('data-page-section') || sectionLabel(link),
      portfolio_size: link.getAttribute('data-portfolio-size') || portfolioSize(link)
    });
  }, true);
})();
