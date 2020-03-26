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

### Bikes Comparation

**Request**

- method : GET
- endpoint : `/api/bikes/compare/:seal`,
- query ;
  bike : list of id bike compare, divide comas (max 4), sample : bike=1,2,3,4

### Bike Detail

Endpoint to request bike detail based on bike id

**Request**

- method : GET
- endpoint: `/api/bikes/:id/:seal`

### Bike Brand List

Endpoint to request list of bike brand

**Request**

- method : GET
- endpoint : `/api/bikes-brand/:seal`

### Bike Brand Type

Endpoint to request list of bike type

**Request**

- method : GET
- endpoint : `/api/bikes-type/:seal`

## Bikes Super Only

## Create New Bike

Endpoint to create a new bike.
