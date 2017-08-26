(function () {
    'use strict';

    var csInterface = new CSInterface();

    $('#test').click(function () {
        csInterface.evalScript('render(3, 4, 4)');
    })

}());
    
