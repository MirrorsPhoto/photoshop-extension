
var layerWidth = 10,
    layerHeight = 15,
    offset = 0.1,
    border = 0.2,
    isAddDate = true

function isCrop(width, height) {
    var activeDocument = app.activeDocument;

    return ((activeDocument.height.value.toFixed(2) == height) && (Math.abs(activeDocument.height.value.toFixed(2) - height) < 0.05)) && ((activeDocument.width.value.toFixed(2) == width) && (Math.abs(activeDocument.width.value.toFixed(2) - width) < 0.05))
}

function isFit(width, height, count) {
    return (layerWidth * layerHeight) >= (count * width * height);
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

function addLogo() {
    var idsetd = charIDToTypeID( "setd" );
    var desc131 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref68 = new ActionReference();
    var idPrpr = charIDToTypeID( "Prpr" );
    var idLefx = charIDToTypeID( "Lefx" );
    ref68.putProperty( idPrpr, idLefx );
    var idLyr = charIDToTypeID( "Lyr " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idTrgt = charIDToTypeID( "Trgt" );
    ref68.putEnumerated( idLyr, idOrdn, idTrgt );
    desc131.putReference( idnull, ref68 );
    var idT = charIDToTypeID( "T   " );
    var desc132 = new ActionDescriptor();
    var idScl = charIDToTypeID( "Scl " );
    var idPrc = charIDToTypeID( "#Prc" );
    desc132.putUnitDouble( idScl, idPrc, 2497.666677 );
    var idpatternFill = stringIDToTypeID( "patternFill" );
    var desc133 = new ActionDescriptor();
    var idenab = charIDToTypeID( "enab" );
    desc133.putBoolean( idenab, true );
    var idpresent = stringIDToTypeID( "present" );
    desc133.putBoolean( idpresent, true );
    var idshowInDialog = stringIDToTypeID( "showInDialog" );
    desc133.putBoolean( idshowInDialog, true );
    var idMd = charIDToTypeID( "Md  " );
    var idBlnM = charIDToTypeID( "BlnM" );
    var idNrml = charIDToTypeID( "Nrml" );
    desc133.putEnumerated( idMd, idBlnM, idNrml );
    var idOpct = charIDToTypeID( "Opct" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc133.putUnitDouble( idOpct, idPrc, 100.000000 );
    var idPtrn = charIDToTypeID( "Ptrn" );
    var desc134 = new ActionDescriptor();
    var idNm = charIDToTypeID( "Nm  " );
    desc134.putString( idNm, """Mirror's Photo""" );
    var idIdnt = charIDToTypeID( "Idnt" );
    desc134.putString( idIdnt, """f5b21870-c6e8-117a-984c-916c37fd56c3""" );
    var idPtrn = charIDToTypeID( "Ptrn" );
    desc133.putObject( idPtrn, idPtrn, desc134 );
    var idScl = charIDToTypeID( "Scl " );
    var idPrc = charIDToTypeID( "#Prc" );
    desc133.putUnitDouble( idScl, idPrc, 60.000000 );
    var idAlgn = charIDToTypeID( "Algn" );
    desc133.putBoolean( idAlgn, true );
    var idphase = stringIDToTypeID( "phase" );
    var desc135 = new ActionDescriptor();
    var idHrzn = charIDToTypeID( "Hrzn" );
    desc135.putDouble( idHrzn, 0.000000 );
    var idVrtc = charIDToTypeID( "Vrtc" );
    desc135.putDouble( idVrtc, 0.000000 );
    var idPnt = charIDToTypeID( "Pnt " );
    desc133.putObject( idphase, idPnt, desc135 );
    var idpatternFill = stringIDToTypeID( "patternFill" );
    desc132.putObject( idpatternFill, idpatternFill, desc133 );
    var idLefx = charIDToTypeID( "Lefx" );
    desc131.putObject( idT, idLefx, desc132 );
    executeAction( idsetd, desc131, DialogModes.NO );
}

function addDatetime(width, height, position) {
    if (!isAddDate) {
      return;
    }

    var docRef = app.activeDocument;

    var s = "Date Time"

    var now = new Date();

    var year = now.getFullYear();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    if(day < 10){day = "0" + day}
    if(month < 10){month= "0" + month}
    if(hours < 10){hours= "0" + hours}
    if(minutes < 10){minutes= "0" + minutes}
    if(seconds < 10){seconds= "0" + seconds}

    var dd = ".";
    var td = ":";

    var dt = day + dd +
        month + dd +
        year + 'г. ' +
        hours + td +
        minutes;

    var textColor = new SolidColor;
    textColor.rgb.red = 0;
    textColor.rgb.green = 0;
    textColor.rgb.blue = 0;


    var newTextLayer = docRef.artLayers.add();
    newTextLayer.kind = LayerKind.TEXT;

    newTextLayer.textItem.position = [width, height];

    if (position == 'right') {
      newTextLayer.rotate(90);
    }

    newTextLayer.textItem.size = 10;
    newTextLayer.textItem.color = textColor;

    newTextLayer.textItem.font = "SFUIText-Light";

    newTextLayer.name = s;


    newTextLayer.textItem.contents = dt;

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

    addDatetime (border + width + offset + width + offset + width + offset, border + 0.36, 'right')
}

function render25x3x4(width, height)
{
    var layer = activeDocument.activeLayer;

    layer.translate((-(layerWidth - width) / 2) + border, (-(layerHeight - height) / 2) + border)

    var newLayer = layer.duplicate();

    newLayer.name = 'Фото 2';

    newLayer.translate(width + offset)

    newLayer = newLayer.duplicate();

    newLayer.name = 'Фото 3';

    newLayer.translate(0, height + offset)

    newLayer = newLayer.duplicate();

    newLayer.name = 'Фото 4';

    newLayer.translate(-(width + offset))

    addDatetime (border, border + height + offset + height + 0.25 + offset)
}

function render35x45x2(width, height)
{
    var layer = activeDocument.activeLayer;

    layer.rotate(90);

    layer.translate((-(layerWidth - height) / 2) + border, (-(layerHeight - width) / 2) + border)

    var newLayer = layer.duplicate();

    newLayer.name = 'Фото 2';

    newLayer.translate(0, width + offset)

    addDatetime (border, border + width + offset + width + 0.25 + offset)
}

function render36x46x2(width, height)
{
    var layer = activeDocument.activeLayer;

    layer.rotate(90);

    layer.translate((-(layerWidth - height) / 2) + border, (-(layerHeight - width) / 2) + border)

    var newLayer = layer.duplicate();

    newLayer.name = 'Фото 2';

    newLayer.translate(0, width + offset)

    addDatetime (border, border + width + offset + width + 0.25 + offset)
}

function render35x45x4(width, height)
{
    var layer = activeDocument.activeLayer;

    layer.rotate(90);

    layer.translate((-(layerWidth - height) / 2) + border, (-(layerHeight - width) / 2) + border)

    var newLayer = layer.duplicate();

    newLayer.name = 'Фото 2';

    newLayer.translate(height + offset)

    newLayer = newLayer.duplicate();

    newLayer.name = 'Фото 3';

    newLayer.translate(0, width + offset)

    newLayer = newLayer.duplicate();

    newLayer.name = 'Фото 4';

    newLayer.translate(-(height + offset))

    addDatetime(border + height + offset + height + offset, border + 0.36, 'right')
}

function render36x46x4(width, height)
{
    var layer = activeDocument.activeLayer;

    layer.rotate(90);

    layer.translate((-(layerWidth - height) / 2) + border, (-(layerHeight - width) / 2) + border)

    var newLayer = layer.duplicate();

    newLayer.name = 'Фото 2';

    newLayer.translate(height + offset + 0.4)

    newLayer = newLayer.duplicate();

    newLayer.name = 'Фото 3';

    newLayer.translate(0, width + offset)

    newLayer = newLayer.duplicate();

    newLayer.name = 'Фото 4';

    newLayer.translate(-(height + offset) - 0.4)

    addDatetime(border + height + offset + height + offset, border + 0.36, 'right')
}


function render3x4x4(width, height) {
  var layer = activeDocument.activeLayer;

  layer.translate((-(layerWidth - width) / 2) + border, (-(layerHeight - height) / 2) + border)

  var newLayer = layer.duplicate();

  newLayer.name = 'Фото 2';

  newLayer.translate(width + offset)

  newLayer = newLayer.duplicate();

  newLayer.name = 'Фото 3';

  newLayer.translate(0, height + offset)

  newLayer = newLayer.duplicate();

  newLayer.name = 'Фото 4';

  newLayer.translate(-(width + offset))

  addDatetime (border, border + height + offset + height + 0.25 + offset)
}

function render4x6x2(width, height)
{
    var layer = activeDocument.activeLayer;

    layer.rotate(90);

    layer.translate((-(layerWidth - height) / 2) + border, (-(layerHeight - width) / 2) + border)

    var newLayer = layer.duplicate();

    newLayer.name = 'Фото 2';

    newLayer.translate(0, width + offset)

    addDatetime (border, border + width + offset + width + 0.25 + offset)
}

function render5x5x2(width, height)
{
    var layer = activeDocument.activeLayer;

    layer.translate((-(layerWidth - width) / 2) + border, (-(layerHeight - height) / 2) + border)

    var newLayer = layer.duplicate();

    newLayer.name = 'Фото 2';

    newLayer.translate(0, width + offset)

    addDatetime (border, border + height + offset + height + 0.25 + offset)
}

function render9x12x1(width, height) {
    addDatetime ((layerWidth - width) / 2, (layerHeight - height) / 2 + height + 0.25 + offset)
}

function render10x15x1(width, height) {}

function open(path) {
    var fileRef = new File(path)

    app.open( fileRef)
}

function render(width, height, count, isBorder, isLogo, isDate) {
    isAddDate = isDate
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
        alert(count + " фотографии " + width + "х" + height + " не вмещаются на холст " + layerWidth + "х" + layerHeight);
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

    eval('render' + String(width).replace ('.', '') + 'x' + String(height).replace ('.', '') + 'x' + count + '(' + width + ', ' + height + ')');

    if (isBorder) {
      for( var i = 0; i < activeDocument.artLayers.length; i++) {
        var layer = app.activeDocument.artLayers[i];

        app.activeDocument.activeLayer = layer

        if (layer.kind == LayerKind.NORMAL && !layer.isBackgroundLayer) {
            addStroke ()
        }
      }
    }
    

    app.activeDocument.activeLayer.isBackgroundLayer = false
    app.activeDocument.activeLayer.name = 'Фон'

    if (isLogo) {
      addLogo()
    }

    activeDocument.mergeVisibleLayers()

    return true;
}
