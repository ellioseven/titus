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
    attach(context) {
      const $context = $(context);
      $context.find('.visually-hidden.fieldset-legend').each(function () {
        $(this).parent('legend').addClass('visually-hidden');
      });
    },
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
    setClasses(element) {
      const plugin = this;
      const $element = $(element);
      $element.removeClass(plugin.emptyClass);
      if (!$element.children().length) {
        $element.addClass(plugin.emptyClass);
      }
    },
    attach(context) {
      const plugin = this;
      const $context = $(context);
      $context.find('.region').each((index, element) => {
        plugin.setClasses(element);
        // Observe child element additions/removals.
        const config = { childList: true };
        const callback = () => plugin.setClasses(element);
        const observer = new MutationObserver(callback);
        observer.observe(element, config);
      });
    },
  };
}(jQuery, Drupal, drupalSettings));
