# API

## Rutas

## .../components

Devuelve los componentes para que el vendedor seleccione el que quiere vender agregándole el precio.

_Endpoints_

 __.../components/cpu__

Devuelve todos los cpu, se le puede pasar por query una marca (brand) para que solo devuelva los intel ó amd.

_Ejemplo:_ 

.../components/cpu?brand=intel  --> devuelve solo los intel

La info tiene la siguiente estructura:

    [
        {
            "name": "Intel Core i5-7400",
            "rating": 4,
            "rating_count": 14,
            "price_usd": 196.5,
            "core_count": "4",
            "core_clock": "3 GHz",
            "boost_clock": "3.5 GHz",
            "tdp": "65 W",
            "integrated_graphics": "Intel HD Graphics 630",
            "smt": false
        }
    ]

__.../components/gpu__

Devuelve todos los gpu o video-card, se le puede pasar por query una búsqueda y devolverá solo los que coincidan. (busca tanto en la propiedad name como en la prop chipset)

_Ejemplo:_

.../components/gpu?search=3060

La info tiene la siguiente estructura:

    [
        {
            "name": "Asus ROG STRIX GAMING OC",
            "rating": 4,
            "rating_count": 3,
            "price_usd": null,
            "chipset": "GeForce RTX 3060",
            "memory": "12 GB",
            "core_clock": "1320 MHz",
            "boost_clock": null,
            "color": "Black / Silver",
            "length": "300 mm"
        }
    ]


## _.../products_  

(...en proceso)

Devuelve todos los productos publicados por los vendedores. Tendrá rutas específicas por tipo de producto y filtrados por marca, tipo, socket, etc...