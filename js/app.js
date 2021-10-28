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
       // console.log(response);
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
                 out +='<button type="button" class="btn btn-outline-success rounded-circle" alt="..."><i class="fa-solid fa-cart-plus"></i></button>';
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

    }
});
