'use strict';

/**
 * @file
 * Admin theme enhancements.
 */

(function ($, Drupal, drupalSettings) {
  /**
   * Behaviors for applying hidden classes.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches behavior for hidden class additions.
   */
  Drupal.behaviors.titusHiddenClasses = {
    attach: function attach(context) {
      var $context = $(context);
      $context.find('.visually-hidden.fieldset-legend').each(function () {
        $(this).parent('legend').addClass('visually-hidden');
      });
    }
  };
  /**
   * Behaviors for applying empty region classes.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches behavior for hidden class additions.
   */
  Drupal.behaviors.titusEmptyRegionClasses = {
    emptyClass: 'is-empty',
    setClasses: function setClasses(element) {
      var plugin = this;
      var $element = $(element);
      $element.removeClass(plugin.emptyClass);
      if (!$element.children().length) {
        $element.addClass(plugin.emptyClass);
      }
    },
    attach: function attach(context) {
      var plugin = this;
      var $context = $(context);
      $context.find('.region').each(function (index, element) {
        plugin.setClasses(element);
        var config = { childList: true };
        var callback = function callback() {
          return plugin.setClasses(element);
        };
        var observer = new MutationObserver(callback);
        observer.observe(element, config);
      });
    }
  };
})(jQuery, Drupal, drupalSettings);