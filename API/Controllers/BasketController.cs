using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController: BaseApiController
    {
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
            this._context = context;
        
    }

        //endpoints fetch, add, remove 

        [HttpGet(Name="GetBasket")] 

        public async Task<ActionResult<BasketDTO>> GetBasket ()
        {
        var basket = await RetrieveBasket();

        if (basket == null) return NotFound();
        return MapBasketToDto(basket);
        }



        [HttpPost] //query string api/basket?productId=3&quantity=2
        //locationHeader 201 created Mozilla 
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int quantity) {

            //get basket 
            var basket =  await RetrieveBasket(); 

            if(basket == null) basket = CreateBasket();

            var product = await _context.Products.FindAsync(productId); 

            if(product == null) return NotFound(); //just being defensive 
            //add item
            basket.AddItem(product, quantity); 

            var result = await _context.SaveChangesAsync() > 0; 
            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails {Title="Problem saving item to basket"}); 

        }

        [HttpDelete]

        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity) {

            var basket = await RetrieveBasket(); 
            if(basket == null) return NotFound(); 
            basket.removeItem(productId, quantity); 
            var result = await _context.SaveChangesAsync() > 0; 
            if(result) return Ok(); 

            return BadRequest(new ProblemDetails{Title = "Problem removing item from the basket"}); 
        }


        private async Task<Basket> RetrieveBasket()
        {
        return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString(); 
            //cookie 
            var cookieOptions = new CookieOptions{
                IsEssential = true, 
                Expires = DateTime.Now.AddDays(30), //Do Not Add HttpOnly flag, it means it's only going to be sent & recieved over
                                                    // network requests over HTTP requests. Makes it impossive to retrieve by TS & JS 
            };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions); 

            var basket = new Basket{BuyerId = buyerId}; 
            _context.Baskets.Add(basket); 
            return basket; 
        }
        private static ActionResult<BasketDTO> MapBasketToDto(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                    {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                    }).ToList()
            };
        }
    
    }
}