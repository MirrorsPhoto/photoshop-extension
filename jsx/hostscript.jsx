function render(width,height, count) {

    try {
        var activeDocument = app.activeDocument;
    } catch (e) {
        alert ('Нет активного документа')
        return;
    }

    if (activeDocument.height != height || activeDocument.width != width) {
        alert('Сначала нужно откадрировать фотографию');
        return;
    }

    layerWidth = 15;
    layerHeight = 10;

    if ((layerWidth * layerHeight) < ((count + 0.5) * width * height)) {
        alert(count + " фотографии " + height + "х" + width + " не вмещаются на холст " + layerHeight + "х" + layerWidth);
        return;
    }

    alert('OK');
}