/* =====================================================
   Bryan's Café - Menu Loader
   Loads menu.xml and renders it into the page
   ===================================================== */

(function () {
    'use strict';

    var XML_PATH = 'data/menu.xml';

    function escapeHTML(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function loadMenu() {
        var loadingEl = document.getElementById('menu-loading');
        var errorEl = document.getElementById('menu-error');
        var contentEl = document.getElementById('menu-content');
        if (!contentEl) return;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', XML_PATH, true);
        xhr.responseType = 'document';
        xhr.overrideMimeType && xhr.overrideMimeType('text/xml');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                renderMenu(xhr.responseXML);
            } else {
                showError('Could not load menu (HTTP ' + xhr.status + ').');
            }
        };
        xhr.onerror = function () {
            showError('Network error loading the menu. Please try again later.');
        };

        try {
            xhr.send();
        } catch (e) {
            showError('Error sending request: ' + e.message);
        }

        function showError(msg) {
            if (loadingEl) loadingEl.style.display = 'none';
            if (errorEl) {
                errorEl.style.display = 'block';
                errorEl.textContent = msg;
            }
        }
    }

    function renderMenu(xmlDoc) {
        var loadingEl = document.getElementById('menu-loading');
        var contentEl = document.getElementById('menu-content');

        if (!xmlDoc) {
            if (loadingEl) loadingEl.textContent = 'Menu data unavailable.';
            return;
        }

        var categories = xmlDoc.getElementsByTagName('category');
        if (categories.length === 0) {
            if (loadingEl) loadingEl.textContent = 'No menu items found.';
            return;
        }

        var html = '';
        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            var catName = cat.getAttribute('name') || 'Menu';
            html += '<div class="menu-category">';
            html += '<h2>' + escapeHTML(catName) + '</h2>';
            html += '<div class="menu-grid">';

            var items = cat.getElementsByTagName('item');
            for (var j = 0; j < items.length; j++) {
                var item = items[j];
                var name = getText(item, 'name');
                var desc = getText(item, 'description');
                var priceEl = item.getElementsByTagName('price')[0];
                var price = priceEl ? priceEl.textContent : '';
                var currency = priceEl ? (priceEl.getAttribute('currency') || 'AUD') : 'AUD';
                var image = getText(item, 'image');

                html += '<article class="menu-item">';
                html += '<img src="images/' + escapeHTML(image) + '" alt="' + escapeHTML(name) + '" class="menu-item-image" onerror="this.style.display=\'none\'">';
                html += '<div class="menu-item-body">';
                html += '<h3 class="menu-item-name">' + escapeHTML(name) + '</h3>';
                html += '<p class="menu-item-desc">' + escapeHTML(desc) + '</p>';
                html += '<div class="menu-item-price">' + escapeHTML(currency) + ' ' + escapeHTML(price) + '</div>';
                html += '</div></article>';
            }
            html += '</div></div>';
        }

        if (loadingEl) loadingEl.style.display = 'none';
        contentEl.innerHTML = html;
    }

    function getText(parent, tag) {
        var el = parent.getElementsByTagName(tag)[0];
        return el ? (el.textContent || '') : '';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMenu);
    } else {
        loadMenu();
    }
})();
