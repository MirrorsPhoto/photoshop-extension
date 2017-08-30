function render(width, height, count) {
    try {
        var activeDocument = app.activeDocument;
    } catch (e) {
        alert ('Нет активного документа')
        return false;
    }

    if (((activeDocument.height.value.toFixed(2) != height) && (Math.abs(activeDocument.height.value.toFixed(2) - height) > 0.05)) || ((activeDocument.width.value.toFixed(2) != width) && (Math.abs(activeDocument.width.value.toFixed(2) - width) > 0.05))) {
        alert('Сначала нужно откадрировать фотографию');
        return false;
    }

    layerWidth = 15;
    layerHeight = 10;

    if ((layerWidth * layerHeight) < ((count + 0.5) * width * height)) {
        alert(count + " фотографии " + height + "х" + width + " не вмещаются на холст " + layerHeight + "х" + layerWidth);
        return false;
    }

    return true;
}