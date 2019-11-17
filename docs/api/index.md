# Api Documentations 

## Events 

#### List All Events

**Request**
- method : GET
- endpoint : /api/events/:seal
- query :
  - page : default 1
  - limit : default 7
  - status : default "accept" || "all"

**Response**
```
{

}
```

#### Events Detail

**Request**
- method : GET
- endpoint : /api/events/:seal/:id

**Response**
```
{

}
```

#### Create Event
**Request**
- method : POST
- endpoint : /api/events/:seal/:event_id
- formdata : 
  - email : string (required)
  - title : string (required)
  - start_time : number / epochtime (required)
  - location_name : string
  - location_coordinate : string / json string
  - link : string
  - note : string
  - poster : file object

**Response**
```
{
  
}
```

#### Event Action (Admin Only)

**Request**
- method : POST
- endpoint : /api/events/:seal/:event_id
- formdata : 
  - status : "accept" | "decline"

**Response**
```
{
  
}
```

#### Delete Event (Admin Only)
**Request**
- method : DELETE
- endpoint : /api/events/:seal/:event_id

**Response**
```
{
  
}
```