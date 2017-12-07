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
   *   Attaches behavior for hidden class additions
   */
  Drupal.behaviors.titusHiddenClasses = {
    attach: function attach(context) {
      var $context = $(context);
      $context.find('.visually-hidden.fieldset-legend').each(function () {
        $(this).parent('legend').addClass('visually-hidden');
      });
    }
  };
})(jQuery, Drupal, drupalSettings);