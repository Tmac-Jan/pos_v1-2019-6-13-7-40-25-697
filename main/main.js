'use strict';

const calculateItemsPromotion = (items, promotions) => {
    let promotion;
    promotions.map(function (element) {
        if (element.type == 'BUY_TWO_GET_ONE_FREE') {
            promotion = element;
        }
    });
    return items.map(function (item) {
        promotion.barcodes.map(function (barcode) {
            if (item.barcode === barcode) {
                item.itemTotalPrice = calculatePromotedItem(item);
            }
        })
    });
};

const calculatePromotedItem = (item) => {
    let itemTotalPrice = 0;
    if (item.count > 2) {
        itemTotalPrice += (item.count - 1) * (item.price * 100) / 100;
    }
    return itemTotalPrice;
};
const decodeBarcodes = (barcodes) => {
    let items = [];
    let itemMap = new Map();
    barcodes.forEach(function (barcode) {
        let count = 0;
        if (barcode.indexOf('-') != -1) {
            barcode = barcode.split('-')[0];
            count = parseFloat(barcode.split('-')[1]);
            itemMap.set(barcode, code);
        } else {
            count = itemMap.get(barcode) === undefined ? 1 : itemMap.get(barcode) + 1;
            itemMap.set(barcode, count);
        }
    });
    let allItems = loadAllItems();
    itemMap.forEach(function (value, key) {
        allItems.map(function (element) {
            if (element.barcode == key) {
                let item = {};
                item.barcode = element.barcode;
                item.name = element.name;
                item.unit = element.unit;
                item.price = element.price;
                item.count = value;
                item.itemTotalPrice = element.price * value;
                items.push(item);
            }
        })
    });
    return items;
};

const calculateSavedMoneyAndOriginalTotalPrice = (items) => {
    let originalTotalPrice = 0, promotedTotalPrice = 0;
    item.forEach((element) => {
        promotedTotalPrice += element.itemTotalPrice;
        originalTotalPrice += element.price * element.count;
    });
    return [originalTotalPrice, promotedTotalPrice];
};

const calculateReceiptItemsPrice = (items) => {
    let originalAndPromotedArray = [];
    let promotions = loadPromotions();
    items = calculateItemsPromotion(items,promotions);//拿到打折后的单
    originalAndPromotedArray = calculateSavedMoneyAndOriginalTotalPrice(items);
    let receiptItems={};
    receiptItems.cartItems=items;
    receiptItems.sumPrice=originalAndPromotedArray;
    return receiptItems;
};

const generateReceipt = (items) => {
    let receiptItems = calculateReceiptItemsPrice(items);
    let cartItems = receiptItems['cartItems'];
    let originalAndPromotedArray=receiptItems['sumPrice'];
    let receipt = '';
    receipt +=
        `***<没钱赚商店>收据***
`;
    cartItems.forEach((element) => {
        receipt+=`名称：${element.name}，数量：${element.count}${element.unit}，单价：${element.price}(元)，小计：${element.itemTotalPrice}(元)
        `;
    });
       receipt+=`总计：${originalAndPromotedArray[0]}(元)
       节省：${originalAndPromotedArray[1]}(元)
       `;
       return receipt;
};
const printReceipt = (barcodes)=>{
    let items = decodeBarcodes(barcodes);
    let receiptString = generateReceipt(items);
    console.log(receiptString) ;
};