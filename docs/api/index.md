# Api Documentations 

## Events 

### List All Events

**Request**
- method : GET
- endpoint : /api/events/:token
- query :
  - page : default 1
  - limit : default 7
  - status : default "accept" || "all"

**Response**
```
{

}
```

### Event Action

**Request**
- method : POST
- endpoint : /api/events/:token/:event_id
- formdata : 
  - status : "accept" | "decline"

**Response**
```
{
  
}
```

### Delete Event
**Request**
- method : DELETE
- endpoint : /api/events/:token/:event_id

**Response**
```
{
  
}
```