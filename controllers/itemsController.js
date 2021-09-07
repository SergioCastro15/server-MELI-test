const axios = require('axios');

exports.getItems = async (req, res, next) => {
    try {
        const { data } = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`)
        let categoriesValue = [];
    
        const categoriesProduct = data.available_filters.find(element => element.id === "category")

        if(categoriesProduct && categoriesProduct.values) {
            categoriesValue = categoriesProduct.values.map(value => value.name);
        }
    
        const parsedItems = data.results.map(element => {
            return {
                "author": {
                    "name": "Sergio",
                    "lastname": "Castro"
                },
                categories: categoriesValue,
                items: [{
                    "id": element.id,
                    "title": element.title,
                    "price": {
                        "currency": element.address.state_name,
                        "amount": element.price,
                        "decimals": 123,
                    },
                    "picture": element.thumbnail,
                    "condition": element.condition,
                    "free_shipping": element.shipping.free_shipping
                }]
            }
        });
    
        const allItemsResponse = parsedItems.filter((_, index) => index < 4 )

        res.json(allItemsResponse)

    } catch (error) {
        console.log(error)
        next()
    }
}

exports.getItem = async (req, res, next) => {
    try {
        const { data } = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}`)
        const { data: descriptionData } = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}/description`)
    
        const parsedItems = {
            "author": {
                "name": "Sergio",
                "lastname": "Castro"
            },
            "item": {
                "id": data.id,
                "title": data.title,
                "price": {
                    "currency": data.currency_id,
                    "amount": data.price,
                    "decimals": 123,
                },
            },
            "picture": data.thumbnail,
            "condition": data.condition,
            "free_shipping": data.accepts_mercadopago,
            "sold_quantity": data.sold_quantity,
            "description": descriptionData.plain_text
        }
    
        res.json(parsedItems);
        
    } catch (error) {
        console.log(error)
        next()
    }
}