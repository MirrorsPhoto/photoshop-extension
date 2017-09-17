
var layerWidth = 10,
    layerHeight = 15,
    offset = 0.1,
    border = 0.3

function isCrop(width, height) {
    var activeDocument = app.activeDocument;

    return ((activeDocument.height.value.toFixed(2) == height) && (Math.abs(activeDocument.height.value.toFixed(2) - height) < 0.05)) && ((activeDocument.width.value.toFixed(2) == width) && (Math.abs(activeDocument.width.value.toFixed(2) - width) < 0.05))
}

function isFit(width, height, count) {
    return (layerWidth * layerHeight) > ((count + 0.5) * width * height);
}


//Добавляет обводку к текущему слою
function addStroke() {
    var idsetd = charIDToTypeID( "setd" );
    var desc22 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref1 = new ActionReference();
    var idPrpr = charIDToTypeID( "Prpr" );
    var idLefx = charIDToTypeID( "Lefx" );
    ref1.putProperty( idPrpr, idLefx );
    var idLyr = charIDToTypeID( "Lyr " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idTrgt = charIDToTypeID( "Trgt" );
    ref1.putEnumerated( idLyr, idOrdn, idTrgt );
    desc22.putReference( idnull, ref1 );
    var idT = charIDToTypeID( "T   " );
    var desc23 = new ActionDescriptor();
    var idScl = charIDToTypeID( "Scl " );
    var idPrc = charIDToTypeID( "#Prc" );
    desc23.putUnitDouble( idScl, idPrc, 846.666675 );
    var idFrFX = charIDToTypeID( "FrFX" );
    var desc24 = new ActionDescriptor();
    var idenab = charIDToTypeID( "enab" );
    desc24.putBoolean( idenab, true );
    var idpresent = stringIDToTypeID( "present" );
    desc24.putBoolean( idpresent, true );
    var idshowInDialog = stringIDToTypeID( "showInDialog" );
    desc24.putBoolean( idshowInDialog, true );
    var idStyl = charIDToTypeID( "Styl" );
    var idFStl = charIDToTypeID( "FStl" );
    var idOutF = charIDToTypeID( "OutF" );
    desc24.putEnumerated( idStyl, idFStl, idOutF );
    var idPntT = charIDToTypeID( "PntT" );
    var idFrFl = charIDToTypeID( "FrFl" );
    var idSClr = charIDToTypeID( "SClr" );
    desc24.putEnumerated( idPntT, idFrFl, idSClr );
    var idMd = charIDToTypeID( "Md  " );
    var idBlnM = charIDToTypeID( "BlnM" );
    var idNrml = charIDToTypeID( "Nrml" );
    desc24.putEnumerated( idMd, idBlnM, idNrml );
    var idOpct = charIDToTypeID( "Opct" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc24.putUnitDouble( idOpct, idPrc, 100.000000 );
    var idSz = charIDToTypeID( "Sz  " );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc24.putUnitDouble( idSz, idPxl, 2.000000 );
    var idClr = charIDToTypeID( "Clr " );
    var desc25 = new ActionDescriptor();
    var idRd = charIDToTypeID( "Rd  " );
    desc25.putDouble( idRd, 0.000000 );
    var idGrn = charIDToTypeID( "Grn " );
    desc25.putDouble( idGrn, 0.000000 );
    var idBl = charIDToTypeID( "Bl  " );
    desc25.putDouble( idBl, 0.000000 );
    var idRGBC = charIDToTypeID( "RGBC" );
    desc24.putObject( idClr, idRGBC, desc25 );
    var idoverprint = stringIDToTypeID( "overprint" );
    desc24.putBoolean( idoverprint, false );
    var idFrFX = charIDToTypeID( "FrFX" );
    desc23.putObject( idFrFX, idFrFX, desc24 );
    var idLefx = charIDToTypeID( "Lefx" );
    desc22.putObject( idT, idLefx, desc23 );
    app.executeAction( idsetd, desc22, DialogModes.NO );
}

function render3x4x6(width, height)
{
    var layer = activeDocument.activeLayer;

    layer.translate((-(layerWidth - width) / 2) + border, (-(layerHeight - height) / 2) + border)

    var newLayer = layer.duplicate();

    newLayer.name = 'Фото 2';

    newLayer.translate(width + offset)

    newLayer = newLayer.duplicate();

    newLayer.name = 'Фото 3';

    newLayer.translate(width + offset)

    newLayer = newLayer.duplicate();

    newLayer.name = 'Фото 4';

    newLayer.translate(0, height + offset)

    newLayer = newLayer.duplicate();

    newLayer.name = 'Фото 5';

    newLayer.translate(-(width + offset))

    newLayer = newLayer.duplicate();

    newLayer.name = 'Фото 6';

    newLayer.translate(-(width + offset))
}

function open(path) {
    var fileRef = new File(path)

    app.open( fileRef)
}

function render(width, height, count) {
    try {
        var activeDocument = app.activeDocument;
    } catch (e) {
        alert ('Нет активного документа')
        return false;
    }

    if (!isCrop(width, height)) {
        alert('Сначала нужно откадрировать фотографию');
        return false;
    }

    if (!isFit(width, height, count)) {
        alert(count + " фотографии " + width + "х" + height + " не вмещаются на холст " + layerHeight + "х" + layerWidth);
        return false;
    }

    //Установить белый цвет как основной, чтобы при изменении размера холста был белый фон
    app.foregroundColor.rgb.red = 255
    app.foregroundColor.rgb.green = 255
    app.foregroundColor.rgb.blue = 255

    //Вырезать текущий слой
    activeDocument.activeLayer.cut();

    //Вставить его
    activeDocument.paste()

    //Переименовать
    activeDocument.activeLayer.name = 'Фото 1'

    //Изменить размер холста
    activeDocument.resizeCanvas(layerWidth, layerHeight)

    eval('render' + width + 'x' + height + 'x' + count + '(' + width + ', ' + height + ')');
    var str='';
    for( var i = 0; i < activeDocument.artLayers.length; i++) {
        var layer = app.activeDocument.artLayers[i];

        if (layer.kind == LayerKind.NORMAL && !layer.isBackgroundLayer) {
            app.activeDocument.activeLayer = layer

            addStroke ()
        }
    }

    return true;
}