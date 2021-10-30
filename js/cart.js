$(function() {
    var products = [];
    var cart = []; //card with chosen products

    $.ajax({
        url: 'https://fakestoreapi.com/products',
        dataType: 'json',
        success: successHandler,
        error: errorHandler
    });

    function successHandler(response) {
        products = response;
        console.log(products);
        fillCartTable(products);
    }

    function errorHandler(response) {
        console.log(response.status);
    }

    loadCart();

    function loadCart() {
        //check cart existing in localStorage
        if (localStorage.getItem('cart')) {
            // fulfilling cart
            cart = JSON.parse(localStorage.getItem('cart'));
            //showMiniCart();
            console.log(cart);
        }
    }



    console.log(products);
    console.log(cart);
    console.log(products["1"]);

    function fillCartTable(array) {
        if(array.length > 0) {
            $('#table').removeClass('invisible');
            let rows = '';
            array.forEach(function(item){
                console.log(cart);
                rows +='<tr>'+
                    '<td><img src="${products[id].img}" class="image-thumbnail" alt="..."></td>'+
                    '<td>'+products[item].title+'</td>'+
                    '<td>'+products[item].category+'</td>'+
                    '<td>'+products[item].description+'</td>'+
                    '<td class="qty-input">'+
                    '<div class="input-group mb-3">'+
                    '<span class="input-group-text">-</span>'+
                    '<input type="text" class="form-control">'+
                    '<span class="input-group-text">+</span>'+
                    '</div>'+
                    '</td>'+
                    '<td>'+ products[item].price +'</td>'+
                    '</tr>'
            });
            $('table tbody').html(rows);
        } else {

        }
    }
});
