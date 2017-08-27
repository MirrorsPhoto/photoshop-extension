function init() {
    csInterface = new CSInterface();

    if (!navigator.onLine && !JSON.parse(localStorage.getItem('photo_size'))) {
        alert('Не удаётся загрузить размеры фото');
        return false;
    }

    var selectData;

    if (navigator.onLine) {
        $.get({
            url: 'http://api.jonkofee.ru/photo/size',
            async: false,
            success: function (data) {
                localStorage.setItem('photo_size', JSON.stringify(data.response));
                selectData = data.response;
            }
        })
    } else {
        selectData = JSON.parse(localStorage.getItem('photo_size'));
    }

    for (objSize of selectData) {
        size.innerHTML += '<option data-width="' + objSize.width + '" data-height="' + objSize.height + '" value="' + objSize.id + '">' + objSize.width + 'х' + objSize.height + '</option>'
    }
}


$('#test').click(function () {
    var selectedSize = $('#size option:selected');

    var width = selectedSize.data('width');
    var height = selectedSize.data('height');

    var count = $('#count').val();

    var price;

    // csInterface.evalScript('render(' + width + ', ' + height + ', ' + count + ')');

    if (navigator.onLine) {
        $.get({
            url: 'http://mirrors.local/photo/price',
            data: {
                width: width,
                height: height,
                count: count
            },
            success: function (data) {
                intPrice = data.response

                $(".error").hide()
                $('#price').show();
                $('#price').find('span').text(intPrice)
            },
            error: function (e) {
                
                $('#price').hide()

                $('.error').text(e.responseJSON.message);
                $('.error').show()
            }
        })
    }


});