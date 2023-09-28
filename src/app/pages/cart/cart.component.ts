import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  cartData = [
    {
      productName : 'Allen Solly Gray T Shirt',
      size : 'M',
      color : 'Gray',
      price : 699,
      image : 'https://sslimages.shoppersstop.com/sys-master/images/h9f/h97/17472023101470/A21KPGRGFR68012_GREY_alt1.jpg_2000Wx3000H'
    },
    {
      productName : 'Roadster Blue T Shirt',
      size : 'L',
      color : 'Blue',
      price : 899,
      image : 'https://rukminim2.flixcart.com/image/850/1000/xif0q/t-shirt/b/l/g/m-rd22mkrgrsur01375-roadster-original-imagq6bvwphwhzra.jpeg?q=90'
    },
    {
      productName : 'US Polo Black T Shirt',
      size : 's',
      color : 'Black',
      price : 599,
      image : 'https://cdn11.nnnow.com/web-images/large/styles/R819RU7SKWO/1638772859434/1.jpg'
    },
    {
      productName : 'Peter England White T Shirt',
      size : 'XL',
      color : 'White',
      price : 999,
      image : 'https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/1/tr:w-270,/21106caAditya-PJKCPSNFU63433_3.jpg?rnd=20200526195200'
    },
  ]
  ngOnInit(): void {
  }

}
