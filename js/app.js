$(function() {
    let products = [];

    $.ajax({
        url: 'https://fakestoreapi.com/products',
        dataType: 'json',
        success: successHandler,
        error: errorHandler
    });

    function successHandler(response) {
        products = response;
        fillDivs(response);
    }

    function errorHandler(response) {
        console.log(response.status);
    }

  /*  $('#search').click(function() {
        //const search = parseFloat($('#searchText').val()); //filter by price
        //let filteredArray = products.filter(p => p.price === search); //filter by price
        const search = $('#searchText').val();
        let filteredArray = products.filter(p => p.title.includes(search)
            || p.description.includes(search)
            || p.category.includes(search));
        fillTable(filteredArray);
    }); */






    function fillDivs(products) {

        let out='';
        products.forEach(function(item){
                 out +='<div class="cart">';
                 out +='<p class="name">'+ item.title +'</p>';
                 out +='<img src="'+item.image+'" class="image-cart" alt="...">';
                 out +='<div class="cost">'+ item.price+'</div>';
                 out +='<button class="add-to-cart">Add to basket</button>';
                 out +='</div>';
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

    }
});
