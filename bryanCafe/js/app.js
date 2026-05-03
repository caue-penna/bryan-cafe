/* =====================================================
   Bryan's Café - Shared Application Script
   Handles: dynamic footer year, mobile navigation
   ===================================================== */

(function () {
    'use strict';

    // ---- Dynamic footer year (case study requirement) ----
    function setFooterYear() {
        var span = document.getElementById('current-year');
        if (span) {
            span.textContent = new Date().getFullYear();
        }
    }

    // ---- Mobile navigation toggle ----
    function initNavToggle() {
        var toggle = document.querySelector('.nav-toggle');
        var menu = document.querySelector('.nav-menu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // ---- Init on DOM ready ----
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setFooterYear();
            initNavToggle();
        });
    } else {
        setFooterYear();
        initNavToggle();
    }
})();
