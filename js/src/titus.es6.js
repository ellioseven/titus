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
   *   Attaches summary behavior for tabs in the node edit form.
   */
  Drupal.behaviors.titusHiddenClasses = {
    attach(context) {
      const $context = $(context);
      $context.find('.visually-hidden.fieldset-legend').each(function () {
        $(this).parent('legend').addClass('visually-hidden');
      });
    },
  };
}(jQuery, Drupal, drupalSettings));
