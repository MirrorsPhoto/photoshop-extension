(function () {
    'use strict';

    var csInterface = new CSInterface();

    $('#test').click(function () {
        var selectedSize = $('#size option:selected');

        var width = selectedSize.data('width');
        var height = selectedSize.data('height');

        var count = $('#count').val();
        
        csInterface.evalScript('render(' + width + ', ' + height + ', ' + count + ')');
    });

}());
    
