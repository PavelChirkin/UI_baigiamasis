$(function() {
    var goods = [];
    var cart = []; //card with chosen products

    $.ajax({
        url: 'https://fakestoreapi.com/products',
        dataType: 'json',
        success: successHandler,
        error: errorHandler
    });

    function successHandler(response) {
        goods = response;
        console.log(goods);
        fillCartTable(goods);
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

    function isEmpty(object) {
        for (var key in object)
            if (object.hasOwnProperty(key)) return true;
        return false;
    }

    function fillCartTable(array) {
        //console.log(array.length);
        console.log(cart);
        if(isEmpty(cart)) {
           // $('#table').removeClass('invisible');
            let rows = '';
            console.log(goods["0"]);
            //array.forEach(function(item){
            for (var item in cart) {
                //console.log(cart);
                //console.log(goods[item].title);
                rows +='<tr>'+
                    '<td><img src="'+goods[item].image+'" class="image-thumbnail" alt="..."></td>'+
                    '<td>'+goods[item].title+'</td>'+
                    '<td>'+goods[item].category+'</td>'+
                    '<td>'+goods[item].description+'</td>'+
                    '<td class="qty-input">'+
                    '<div class="input-group mb-3">'+
                    '<button class="minus-goods" cart-id="'+item+'">-</button>'+
                    '<input type="text" class="form-control" placeholder="'+parseInt(cart[item])+'">'+
                    '<button class="plus-goods" cart-id="'+item+'">+</button>'+
                    '</div>'+
                    '</td>'+
                    '<td>'+ goods[item].price*cart[item] +'</td>'+
                    '</tr>'
            }
            $('table tbody').html(rows);

        } else {

        }
    }

    $(document).on('click', '.minus-goods', function(){
        const cartId = parseInt($(this).attr('cart-id'));
        console.log(cartId);
        //reduce goods quantity

        if (cart[cartId]===1) {
            delete cart[cartId];
        }
        else {
            cart[cartId]--;
        }
        saveCart();
        fillCartTable(goods);

        //console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart));

    });

    $(document).on('click', '.plus-goods', function(){
        const cartId = parseInt($(this).attr('cart-id'));
        console.log(cartId);
        //increase goods quantity

        cart[cartId]++;
        saveCart();
        fillCartTable(goods);

        console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    });


    function saveCart() {
        //save cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart)); //cart to local storage
    }
});
