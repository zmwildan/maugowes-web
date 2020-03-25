## Events

#### List All Events

**Request**

- method : GET
- endpoint : /api/events/:seal
- query :
  - page : default 1
  - limit : default 7
  - status : one of : default "accept" || "reject | "waiting" | "all"

**Response**

```
{
    "status": 200,
    "messages": "success",
    "results": [
        {
            "id": "5dd1d2b89b1df5086578c3d1",
            "email": "yussan@mailiantor.com",
            "title": "judul event kedua",
            "link": "https://link.com",
            "start_time": "1574004162",
            "location": {
                "address": "location address",
                "coordinate": {
                    "lat": -7.7829162,
                    "lng": 110.3670518
                }
            },
            "note": "this is note",
            "status": "waiting",
            "poster": {
                "600": "https://res.cloudinary.com/dhjkktmal/image/upload/w_600,c_scale/maugowes/2019/41b7351aaeb545faf1d48d282eaa3100.jpg.jpg",
                "original": "https://res.cloudinary.com/dhjkktmal/image/upload/v1574005171/maugowes/2019/41b7351aaeb545faf1d48d282eaa3100.jpg.jpg"
            }
        }
    ],
    "total": 1
}
```

#### Events Detail

**Request**

- method : GET
- endpoint : /api/events/:seal/:id

**Response**

```
{
    "id": "5dd1d2b89b1df5086578c3d1",
    "email": "yussan@mailiantor.com",
    "title": "judul event kedua",
    "link": "https://link.com",
    "start_time": "1574004162",
    "location": {
        "address": "location address",
        "coordinate": {
            "lat": -7.7829162,
            "lng": 110.3670518
        }
    },
    "note": "this is note",
    "status": 200,
    "poster": {
        "600": "https://res.cloudinary.com/dhjkktmal/image/upload/w_600,c_scale/maugowes/2019/41b7351aaeb545faf1d48d282eaa3100.jpg.jpg",
        "original": "https://res.cloudinary.com/dhjkktmal/image/upload/v1574005171/maugowes/2019/41b7351aaeb545faf1d48d282eaa3100.jpg.jpg"
    },
    "message": "success"
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
  - location_address : string
  - location_coordinate : string / json string , sample : '{"lat": -7.7829162,"lng": 110.3670518}'
  - link : string
  - note : string
  - poster : file object

**Response**

```
{
    "status": 201,
    "message": "Terimakasih, event telah terkirim dan segera diproses oleh moderator."
}
```

#### Event Action (Admin Only)

**Request**

- method : POST
- endpoint : /api/events/action/:seal/:event_id
- formdata :
  - status : "accept" | "reject" \*required
  - note : string will sent to event creator

**Response**

```
{
    "status": 200,
    "message": "Update status success"
}
```

#### Delete Event (Admin Only)

**Request**

- method : DELETE
- endpoint : /api/events/:seal/:event_id

**Response**

```
{
 status: 200
}
```
