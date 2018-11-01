(function ($) {
    var plugin_settings;
    var variables;
    var methods = {
        init: function () {
            var $sticky = $(this);
            if (!variables) {
                variables = methods.calculate.apply(this);
            }

            if (plugin_settings.debug) {
                console.groupCollapsed('stickyBlock debug on init');
                console.log('variables', variables);
                console.log('plugin_settings', plugin_settings);
                console.groupEnd();
            }
            if (!!$sticky.offset()) {
                if (!variables.initiated) {
                    $sticky.css({
                        width: variables.stickWidth,
                        height: variables.stickHeight,
                        zIndex: 1,
                        position: 'relative'
                    });
                } else {
                    var windowTop = $(window).scrollTop() + parseFloat($('body').css('paddingTop'));
                    if (variables.stopPoint < windowTop) {
                        $sticky.css({position: 'absolute', top: 'auto', bottom: 0});
                    } else if (windowTop + variables.stickOffsetTop < variables.startPoint) {
                        $sticky.css({position: 'absolute', top: 0, bottom: 'auto'});
                    } else {
                        $sticky.css({position: 'fixed', top: variables.stickOffsetTop, bottom: 'auto'});
                    }
                }
                if ($sticky.parent('.sticky-wrapper').length == 0) {
                    $sticky.wrap('<div class="sticky-wrapper"></div>');
                }
                $sticky.parent('.sticky-wrapper').css({
                    width: variables.stickWidth,
                    position: 'absolute',
                    height: variables.stickyContainerHeight,
                    top: 0,
                    left: 0
                });
                var dummy = $sticky.closest('.sticky-dummy');
                if (dummy.length == 0){
                    $sticky.parent().wrap('<div class="sticky-dummy"></div>');
                    $sticky.closest('.sticky-dummy').css({width: variables.stickWidth, height: variables.stickHeight, position: 'relative'});
                }

                $(window).scroll(function () {
                    var windowTop = $(window).scrollTop() + parseFloat($('body').css('paddingTop'));
                    if (variables.stopPoint < windowTop) {
                        $sticky.css({position: 'absolute', top: 'auto', bottom: 0});
                    } else if (windowTop < variables.startPoint) {
                        $sticky.css({position: 'absolute', top: 0, bottom: 'auto'});
                    } else {
                        $sticky.css({position: 'fixed', top: variables.stickOffsetTop, bottom: 'auto'});
                    }
                    if (plugin_settings.debug) {
                        console.groupCollapsed('stickyBlock debug on scroll');
                        console.log($sticky, 'element', windowTop + variables.stickOffsetTop, 'start-stick');
                        console.log(windowTop, 'windowTop,',  variables.stickOffsetTop,'stickOffsetTop,',  variables.stickyTop,'stickyTop,', variables.stopPoint, 'stopPoint,', variables.startPoint, 'startPoint');
                        console.groupEnd();
                    }
                });

            }
            variables.initiated = true;
        },
        reinit: function () {
            variables.stickyStopperHeight = variables.$stickyrStopper.outerHeight();
            variables.stickyStopperFull = variables.stickyStopperPosition + variables.stickyStopperHeight;
            variables.stickyStopperPosition = variables.$stickyrStopper.offset().top;

            if (variables.endPoint == 'top') {
                variables.stopPoint = variables.stickyStopperPosition - variables.stickFull - variables.stickOffsetBottom;
                variables.stickyContainerHeight = variables.stickyStopperPosition - variables.stickyTop - variables.stickOffsetBottom;
            } else {
                variables.stopPoint = variables.stickyStopperFull - variables.stickFull - variables.stickOffsetBottom;
                variables.stickyContainerHeight = variables.stickyStopperFull - variables.stickyTop - variables.stickOffsetBottom;
            }
            methods.init.apply(this);
        },
        calculate: function () {
            var $sticky = $(this),
                $stickyrStopper = $(plugin_settings.stopper);
            variables = {
                endPoint: plugin_settings.endPoint,
                $stickyrStopper: $stickyrStopper,
                stickOffsetTop: plugin_settings.offsetTop,
                stickOffsetBottom: plugin_settings.offsetBottom,
                stickWidth: $sticky.outerWidth(),
                stickHeight: $sticky.outerHeight(),
                stickyStopperHeight: $stickyrStopper.outerHeight(),
                stickyTop: $sticky.offset().top,
                stickyStopperPosition: $stickyrStopper.offset().top
            };


            variables.stickyStopperFull = variables.stickyStopperPosition + variables.stickyStopperHeight;
            variables.stickFull = variables.stickHeight + variables.stickOffsetTop;
            variables.startPoint = variables.stickyTop - variables.stickOffsetTop ;
            variables.stopPoint = variables.stickyStopperFull - variables.stickFull - variables.stickOffsetBottom;
            variables.stickyContainerHeight = variables.stickyStopperFull - variables.stickyTop - variables.stickOffsetBottom;

            if (variables.endPoint == 'top') {
                variables.stopPoint = variables.stickyStopperPosition - variables.stickFull - variables.stickOffsetBottom;
                variables.stickyContainerHeight = variables.stickyStopperPosition - variables.stickyTop - variables.stickOffsetBottom;
            }

            return variables;
        }
    };
    $.fn.stickyBlock = function (method, options) {

        plugin_settings = $.extend({
            'stopper': this.data('stopper') ? '' + this.data('stopper') + '' : this.parent(),
            'offsetTop': this.data('offset-top') ? this.data('offset-top') : 0,
            'offsetBottom': this.data('offset-bottom') ? this.data('offset-bottom') : 0,
            'endPoint': this.data('end-point') ? this.data('end-point') : 'bottom',
            'debug': this.data('debug') ? this.data('debug') : false
        }, options);

        return this.each(function () {
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('The method ' + method + ' is not in the plugin');
            }

        })
    }
})(jQuery);
