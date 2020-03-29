## Bikes

### List Bikes

**Request**

- method : GET
- endpoint : `/api/bikes/:seal`
- query :
  - page : number, default = 1
  - limit : number, default = 12
  - type: id of type ,
  - brand : id of brand
  - q : string, keyword to search

### Bike Spec Group

**Request**

- method : GET
- endpoint : `/api/bike-group-specs/:seal`

**Response**

```
{
    "status": 200,
    "message": "data available",
    "results": [
        {
            "name": "frameset",
            "specs": [
                "frame spesification"
            ]
        },
        {
            "name": "groupset",
            "specs": [
                "front derailleur",
                "rear derailleur"
            ]
        }
    ]
}
```

### Bike Detail

Endpoint to request bike detail based on bike id

**Request**

- method : GET
- endpoint: `/api/bikes/:id/:seal`

### Bike Brand List

Endpoint to request list of bike brand

**Request**

- method : GET
- endpoint : `/api/bike-brands/:seal`

### Bike Brand Type

Endpoint to request list of bike type

**Request**

- method : GET
- endpoint : `/api/bike-types/:seal`

## Bikes Super Only

## Create New Bike

Endpoint to create a new bike.
