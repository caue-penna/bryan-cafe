/* =====================================================
   Bryan's Café - Branches Loader
   Loads branches.xml and renders branch cards
   ===================================================== */

(function () {
    'use strict';

    var XML_PATH = 'data/branches.xml';

    function escapeHTML(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function isSafeMapsUrl(url) {
        // Only allow https URLs to google maps
        return /^https:\/\/(www\.)?(google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)/i.test(url || '');
    }

    function loadBranches() {
        var loadingEl = document.getElementById('branches-loading');
        var errorEl = document.getElementById('branches-error');
        var contentEl = document.getElementById('branches-content');
        if (!contentEl) return;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', XML_PATH, true);
        xhr.responseType = 'document';
        xhr.overrideMimeType && xhr.overrideMimeType('text/xml');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                render(xhr.responseXML);
            } else {
                showError('Could not load branches (HTTP ' + xhr.status + ').');
            }
        };
        xhr.onerror = function () { showError('Network error loading branches.'); };

        try { xhr.send(); }
        catch (e) { showError('Error sending request: ' + e.message); }

        function showError(msg) {
            if (loadingEl) loadingEl.style.display = 'none';
            if (errorEl) { errorEl.style.display = 'block'; errorEl.textContent = msg; }
        }
    }

    function render(xmlDoc) {
        var loadingEl = document.getElementById('branches-loading');
        var contentEl = document.getElementById('branches-content');

        if (!xmlDoc) {
            if (loadingEl) loadingEl.textContent = 'Branch data unavailable.';
            return;
        }

        var branches = xmlDoc.getElementsByTagName('branch');
        if (branches.length === 0) {
            if (loadingEl) loadingEl.textContent = 'No branches found.';
            return;
        }

        var html = '<div class="branches-grid">';
        for (var i = 0; i < branches.length; i++) {
            var b = branches[i];
            var name = getText(b, 'name');
            var address = getText(b, 'address');
            var phone = getText(b, 'phone');
            var hoursEl = b.getElementsByTagName('hours')[0];
            var weekdays = hoursEl ? getText(hoursEl, 'weekdays') : '';
            var weekends = hoursEl ? getText(hoursEl, 'weekends') : '';
            var maps = getText(b, 'maps');

            html += '<article class="branch-card">';
            html += '<h3>' + escapeHTML(name) + '</h3>';
            html += '<p class="branch-info"><strong>Address:</strong> ' + escapeHTML(address) + '</p>';
            html += '<p class="branch-info"><strong>Phone:</strong> <a href="tel:' + escapeHTML(phone.replace(/\s/g, '')) + '">' + escapeHTML(phone) + '</a></p>';
            html += '<p class="branch-info"><strong>Mon–Fri:</strong> ' + escapeHTML(weekdays) + '</p>';
            html += '<p class="branch-info"><strong>Sat–Sun:</strong> ' + escapeHTML(weekends) + '</p>';
            if (isSafeMapsUrl(maps)) {
                html += '<a class="branch-link" href="' + escapeHTML(maps) + '" target="_blank" rel="noopener noreferrer">View on Google Maps &rarr;</a>';
            }
            html += '</article>';
        }
        html += '</div>';

        if (loadingEl) loadingEl.style.display = 'none';
        contentEl.innerHTML = html;
    }

    function getText(parent, tag) {
        var el = parent.getElementsByTagName(tag)[0];
        return el ? (el.textContent || '').trim() : '';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadBranches);
    } else {
        loadBranches();
    }
})();
