/* =====================================================
   Bryan's Café - Contact Form Handler
   Client-side validation and submission notification
   ===================================================== */

(function () {
    'use strict';

    function init() {
        var form = document.getElementById('enquiry-form');
        if (!form) return;

        var fields = ['firstName', 'lastName', 'email', 'subject', 'message'];

        // Real-time validation on blur
        fields.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) {
                el.addEventListener('blur', function () { validateField(id); });
                el.addEventListener('input', function () { clearError(id); });
            }
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            handleSubmit(form, fields);
        });
    }

    function validateField(id) {
        var el = document.getElementById(id);
        if (!el) return true;
        var value = el.value.trim();
        var msg = '';

        if (!value) {
            msg = 'This field is required.';
        } else if (id === 'firstName' || id === 'lastName') {
            if (value.length < 2) msg = 'Must be at least 2 characters.';
            else if (!/^[a-zA-Z\s'-]+$/.test(value)) msg = 'Only letters allowed.';
        } else if (id === 'email') {
            // RFC-5322 simplified pattern
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = 'Please enter a valid email address.';
        } else if (id === 'subject') {
            if (value.length < 3) msg = 'Subject must be at least 3 characters.';
        } else if (id === 'message') {
            if (value.length < 10) msg = 'Message must be at least 10 characters.';
        }

        setError(id, msg);
        return msg === '';
    }

    function setError(id, msg) {
        var input = document.getElementById(id);
        var err = document.getElementById(id + '-error');
        if (input) {
            if (msg) input.classList.add('invalid');
            else input.classList.remove('invalid');
            input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        }
        if (err) err.textContent = msg || '';
    }

    function clearError(id) {
        var input = document.getElementById(id);
        var err = document.getElementById(id + '-error');
        if (input) input.classList.remove('invalid');
        if (err) err.textContent = '';
    }

    function handleSubmit(form, fields) {
        var allValid = true;
        fields.forEach(function (id) {
            if (!validateField(id)) allValid = false;
        });

        if (!allValid) {
            // Focus first invalid
            for (var i = 0; i < fields.length; i++) {
                var el = document.getElementById(fields[i]);
                if (el && el.classList.contains('invalid')) { el.focus(); break; }
            }
            return;
        }

        // Note: per case study, we only need to notify the user — no actual send
        var success = document.getElementById('form-success');
        if (success) {
            success.style.display = 'block';
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        form.reset();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
