'use strict';

const calculateItemsPromotion = (items,promotions)=>{
      let promotion ;
      promotions.map(function(element){
         if(element.type =='BUY_TWO_GET_ONE_FREE' ){
            promotion = element;
         }
      });
      items.map(function(item){
         promotion.barcodes.map(function(barcode){
             if(item.barcode === barcode){

             }
         })
      });
}

const calculatePromotedItem(items){
     let itemTotalPrice = 0;
     //items.map(function(item){
        if(item.count>2){
           itemTotalPrice+=(item.count-1)*(item.price*100)/100;
        }
    // });
     return itemTotalPrice;
}
const decodeBarcodes = (barcodes)=>{
   let items = [];
   let itemMap = new Map();
   barcodes.forEach(function(barcode){
      let count = 0;
         if(barcode.indexOf('-')!=-1){
             barcode = barcode.split('-')[0];
             count = parseFloat(barcode.split('-')[1]);
             itemMap.set(barcode,code);
         }else{
             count = itemMap.get(barcode)=== undefined?1:itemMap.get(barcode)+1;
             itemMap.set(barcode,count);
         }
   });
   let allItems = loadAllItems();
   itemMap.forEach(function(value,key){
       allItems.map(function(element){
            if(element.barcode==key){
             let item = {


             }
            }
       })
   })
}