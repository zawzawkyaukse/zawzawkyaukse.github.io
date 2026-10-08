$(document).ready(function(){

    count();
    

    function count(){
        let shopString = localStorage.getItem('shops');
        if (shopString){
            let shopArray = JSON.parse(shopString);

            if (shopString != null){
                $('.count_item').text(shopArray.length);
            }
        }
    }

    
   
    $('.addToCart').click(function(){
       // alert('hi');
       let id = $(this).data('id');
       let name = $(this).data('name');
       let price = $(this).data('price');

       //console.log(id,name,gen,price);

        let shop_items = {
            id: id,
            name: name,
            price: price,
            qty: 1
        }

        let shopString = localStorage.getItem('shops');
        let shopArray;

        if (shopString == null){
            shopArray = [];
        }else{
            shopArray = JSON.parse(shopString);
        }

        let status = false;
        $.each(shopArray,function(i,v){
            if(id == v.id){
                status = true;
                v.qty++;
            }
            
        })

        if (status == false){
            shopArray.push(shop_items);
        }

        
        let shopData = JSON.stringify(shopArray);
        localStorage.setItem('shops',shopData);

        count();
    })

    getData();

    function getData(){
        let shopString = localStorage.getItem('shops');
        if(shopString){
            let shopArray = JSON.parse(shopString);

            let data = '';
            let a = 1;
            let total = 0;

            $.each(shopArray,function(i,v){
                data += `
                            <tr>
                                <td>${a++}</td>
                                <td>${v.name}</td>
                                <td>${v.price}</td>
                                <td>
                                <button class="min" data-key="${i}">-</button>
                                    ${v.qty}
                                <button class="max" data-key="${i}">+</button>
                                </td>
                                
                                <td>${v.price * v.qty}</td>
                            </tr>
                        `;

                    total += v.price * v.qty;
            })

                data +=`
                            <tr>
                                <td colspan="4"> Total </td>
                                <td> ${total} </td>
                            </tr>
                        `;

            $('#itemTbody').html(data);
        }
    }

    $('#itemTbody').on('click','.min',function(){
        //alert('hi');
        let key = $(this).data('key');
       // console.log(key);

       let shopString = localStorage.getItem('shops');

       if(shopString){
        let shopArray = JSON.parse(shopString);

        let status = false;
        $.each(shopArray,function(i,v){
            if(key == i){
                v.qty--;

                if(v.qty<=0){
                    shopArray.splice(key,1);                    
                }
            }
        })

        let shopData = JSON.stringify(shopArray);
        localStorage.setItem('shops',shopData);

        getData();
       }

    })

    $('#itemTbody').on('click','.max',function(){
        //alert('hi');
        let key = $(this).data('key');
       // console.log(key);

       let shopString = localStorage.getItem('shops');

       if(shopString){
        let shopArray = JSON.parse(shopString);


        $.each(shopArray,function(i,v){
            if(key == i){
                v.qty++;
            }
        })

        let shopData = JSON.stringify(shopArray);
        localStorage.setItem('shops',shopData);

        getData();
       }

    })

    $('.order-btn').click(function(){


        let shop = localStorage.getItem('shops');

        if (shop == null) {
            alert("First Choose Your Items!");
            window.location.href = 'index.html';
        }

        


        let ans = confirm('Are You Sure Order?');

        
                if (ans){
                    localStorage.removeItem('shops');
                    alert('Successful Order Now');
                    window.location.href = 'index.html';
                }

      
        

        
    })
 

})