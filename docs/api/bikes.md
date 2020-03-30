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

**Request**

- method : POST
- endpoint : `/api/bikes/:seal`
- payload :
  - name
  - brand_id
  - type_id
  - estimated price, number
  - released date, string
  - images, array in string format, sample ["image 1", "image 2","image 3","image 4"]
  - geometry, image url
  - source, url

## Uppdate Bike

Endpoint to update a bike.

**Request**

- method : POST
- endpoint : `/api/bikes/:id/:seal`
- payload :
  - name
  - brand_id
  - type_id
  - estimated price, number
  - released date, string
  - images, array in string format, sample ["image 1", "image 2","image 3","image 4"]
  - geometry, image url
  - source, url

## Create New Bike Specs Relation

Endpoint to create a new bike specs relation

- method : POST,
- endpoint: `/api/bikes-specs-relation/:seal`,
- payload :
  - bike_id, string
  - spec_id, string
  - description, string

## Update Bike Specs Relation

Endpoint to update bike specs relation

- method : POST,
- endpoint ; `/api/bikes-specs-relation/:id/:seal`,
- payload :
  - bike_id, string
  - spec_id, string
  - description, string

## Endpoint to Delete Bike Specs Relation

Endpoint to delete bike specs relation

- method : DELETE
- endpoint : `/api/bikes-specs-relation/:seal`,
- payload :
  - bike_spec_relation_id, string
