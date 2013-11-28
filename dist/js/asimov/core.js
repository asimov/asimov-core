

;(function(root, factory) {
    

    root.asimov = root.asimov || {};

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('asimov/core',['jquery'], function(jQuery) {
            root.asimov.core = factory(jQuery);
            return root.asimov.core;
        });
    } else {
        // Browser globals
        root.asimov.core = factory(root.jQuery);
    }
}(this, function($, undefined) {
    

    return {
        getElementData: function($elem, prefix) {
            var data = {},

                // does it start with our prefix?
                re = new RegExp('^' + prefix + '[A-Z]'),

                // $.data() turns data-prefix-foo-bar into
                // prefixFooBar, we want it to be prefix-foo-bar
                upperToHyphenLower = function(match) {
                    return '-' + match.toLowerCase();
                };

            $.each($elem.data(), function(key, value) {
                if (re.test(key)) {
                    data[key.replace(/[A-Z]/g, upperToHyphenLower)] = value;
                }
            });

            return data;
        },

        mergeElementData: function($elem, prefix, defaults) {
            // Get an object of dom data attributes that we care about
            var domData = this.getElementData($elem, prefix),
                data = $.extend(true, {}, defaults);

            // Deep merges dom data with the defaults.
            //
            // Transforms hyphen-separated dom data keys into nested
            // objects so they can be deep merged with $.extend.
            //
            // We only merge keys that exist in the defaults object,
            // new keys are never created.
            function recur(root, attrKey, value) {
                var item, i, l;

                for (i = 0, l = attrKey.length; i < l; i += 1) {
                    item = attrKey[i];
                    if ($.isPlainObject(root[item])) {
                        root[item] = $.extend(
                            true, {}, root[item],
                            recur(root[item], attrKey.slice(i + 1), value)
                        );
                    } else if (root[item] !== undefined) {
                        root[item] = value;
                    }
                }

                return root;
            }

            $.each(domData, function(key, value) {
                data = $.extend(
                    true, {}, data,
                    recur(data, key.split(/-/), value)
                );
            });

            return data;
        }
    };
}));
