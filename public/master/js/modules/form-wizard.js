/**=========================================================
 * Module: form-wizard.js
 * Handles form wizard plugin and validation
 * [data-toggle="wizard"] to activate wizard plugin
 * [data-validate-step] to enable step validation via parsley
 =========================================================*/

(function($, window, document){
  'use strict';

  if(!$.fn.bwizard) return;

  var Selector = '[data-toggle="wizard"]';

  $(Selector).each(function() {

    var wizard = $(this),
        validate = wizard.data('validateStep'), // allow to set options via data-* attributes
        options;

    // Find a progress bar if exists and advance its state
    options = {
      'show' :  function(e, ui) {
        var panelParent = $(ui.panel).parent(),
            total = panelParent.find('[role="tabpanel"]').length,
            current = ui.index + 1,
            percent = (current/total) * 100;
        panelParent.siblings('.progress').children('.progress-bar').css({width:percent+'%'});
      }
    };

    if(validate) {
      // Dont allow direct move to step
      options.clickableSteps = false;
      // validate via parsley
      options.validating = function(e, ui) {
        var $this = $(this),
            form = $this.parent(),
            group = form.find('.bwizard-activated');

        if (false === form.parsley().validate( group[0].id )) {
          e.preventDefault();
          return;
        }
      };

    }

    // Invoke the plugin
    wizard.bwizard(options);

  });


}(jQuery, window, document));
