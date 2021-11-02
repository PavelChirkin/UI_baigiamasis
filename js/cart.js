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
        //console.log(products);
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

    function isEmpty(object) {
        for (var key in object)
            if (object.hasOwnProperty(key)) return true;
        return false;
    }

    function fillCartTable(array) {
        //console.log(array.length);
        console.log(cart);
        if(isEmpty(cart)) {
            $('#table').removeClass('invisible');
            $('#total').removeClass('invisible');
            let rows = '';
            let total = 0;
            for (var item in cart) {
                //console.log(cart);
                total = total + products[item].price*cart[item];
                totalString = "$" + total.toString();
                //console.log(products[item].title);
                rows +='<tr>'+
                    '<td><img src="'+products[item].image+'" class="image-thumbnail" alt="..."></td>'+
                    '<td>'+products[item].title+'</td>'+
                    '<td>'+products[item].category+'</td>'+
                    '<td>'+products[item].description+'</td>'+
                    '<td class="qty-input">'+
                    '<div class="input-group mb-3">'+
                    '<button class="minus-products" cart-id="'+item+'">-</button>'+
                    '<input type="text" class="form-control" placeholder="'+parseInt(cart[item])+'">'+
                    '<button class="plus-products" cart-id="'+item+'">+</button>'+
                    '</div>'+
                    '</td>'+
                    '<td>'+"$"+ products[item].price*cart[item] +'</td>'+
                    '</tr>'
            }
            $('table tbody').html(rows);
            $('.total-body').html(totalString);
        } else {

        }
    }

    $(document).on('click', '.minus-products', function(){
        const cartId = parseInt($(this).attr('cart-id'));
        console.log(cartId);
        //reduce products quantity

        if (cart[cartId]===1) {
            delete cart[cartId];
        }
        else {
            cart[cartId]--;
        }
        saveCart();
        fillCartTable(products);

        //console.log(cart);
        //localStorage.setItem('cart', JSON.stringify(cart));

    });

    $(document).on('click', '.plus-products', function(){
        const cartId = parseInt($(this).attr('cart-id'));
        console.log(cartId);
        //increase products quantity

        cart[cartId]++;
        saveCart();
        fillCartTable(products);

        console.log(cart);
        //localStorage.setItem('cart', JSON.stringify(cart));
    });


    function saveCart() {
        //save cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart)); //cart to local storage
    }
});
