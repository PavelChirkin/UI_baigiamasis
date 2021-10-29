$(function() {
    let products = [];
    var cart = {}; //card with chosen products

    loadCart();
    showMiniCart();

    $.ajax({
        url: 'https://fakestoreapi.com/products',
        dataType: 'json',
        success: successHandler,
        error: errorHandler
    });

    function successHandler(response) {
        products = response;
        fillDivs(response);
        //console.log(response);
    }

    function errorHandler(response) {
        console.log(response.status);
    }

    $('#search').click(function() {
        //const search = parseFloat($('#searchText').val()); //filter by price
        //let filteredArray = products.filter(p => p.price === search); //filter by price
        const search = $('#searchText').val();
        let filteredArray = products.filter(p => p.title.includes(search)
            || p.description.includes(search)
            || p.category.includes(search));
        fillDivs(filteredArray);
    });



    function fillDivs(products) {

        let out='';
        products.forEach(function(item){
                 //out +='<div class="col-md-9">';
                 //out +='<div class="row">';
                 //out +='<div class="col-4 col-sm-6">';
                 out +='<div class="col-md-4 d-md-inline-flex">';
                 out +='<div class="product">';
                 out +='<div class="product-img">';
                 out +='<a href="#"><img src="'+item.image+'" class="product-img" alt="..."></a>';
                 out +='</div>';
                 out +='<p class="product-title">'
                 out +='<a href="#">'+ item.title +'</a></p>';
                 out +='<p class="product-desc">'+ item.category+'</p>';
                 out +='<p class="product-price">$ '+ item.price+'</p>';
                 out +='<div class="add-button">';
                 out +='<button class="add-to-cart" product-id="'+item.id+'" type="button" class="btn btn-outline-success rounded-circle" alt="..."><i class="fa-solid fa-cart-plus"></i></button>';
                 out +='</div>';
                 out +='</div>';
                 out +='</div>';
                 //out +='</div>';


              /*  rows +='<tr>'+
                    '<td><img src="'+item.image+'" class="image-thumbnail" alt="..."></td>'+
                    '<td>'+ item.title +'</td>'+
                    '<td>'+ item.category +'</td>'+
                    '<td>'+ item.description +'</td>'+
                    '<td class="qty-input">'+
                    '<div class="input-group mb-3">'+
                    '<span class="input-group-text">-</span>'+
                    '<input type="text" class="form-control">'+
                    '<span class="input-group-text">+</span>'+
                    '</div>'+
                    '</td>'+
                    '<td>'+ item.price +'</td>'+
                    '</tr>' */
            });
        $('#goods').html(out);
        //$('button.add-to-cart').on('click', addToCart());
    }

    $(document).on('click', '.add-to-cart', function(){
        const productId = parseInt($(this).attr('product-id'));
        //const number = 0;
        //const index = cart.findIndex(product => product.id === productId);
        //reservations.splice(index, 1);
        console.log(productId);

        if (cart[productId]===undefined) {
            //cart[productId] = productId;
            cart[productId] = 1;//если в корзине нет товара - делаем равным 1
        }
        else {
            cart[productId]++; //если такой товар есть - увеличиваю на единицу
        }
        showMiniCart();
        console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart));

    });

    /*function addToCart() {
        //добавляем товар в корзину
        console.log('data-art');

        let id = $(this).attr('data-art');
         console.log(id);
        if (cart[id]===undefined) {
            cart[id] = 1; //если в корзине нет товара - делаем равным 1
        }
        else {
            cart[id]++; //если такой товар есть - увеличиваю на единицу
        }
        //showMiniCart();
        console.log(cart);
        //saveCart();
    } */

    function saveCart() {
        //сохраняю корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
    }
    function showMiniCart() {
        //показываю мини корзину
        var out= 0;
        for (var key in cart) {
            out = out + parseInt(cart[key]);
        }
        //console.log(out);
        $('.mini-cart').html(out);
    }

    function loadCart() {
        //проверяю есть ли в localStorage запись cart
        if (localStorage.getItem('cart')) {
            // если есть - расширфровываю и записываю в переменную cart
            cart = JSON.parse(localStorage.getItem('cart'));
            //showMiniCart();
            console.log(cart);
        }
    }
});
