# CHANGELOG OF DATABASE

## 23 May 2020

### Changed

- db.users.createIndex({username: 1}, {unique: true})
- db.users.createIndex({email: 1}, {unique: true})
- db.videos.createIndex({id: 1}, {unique: true})
- db.videos.createIndex({title: 1}, {unique: true})
- db.bikes_specs.createIndex({spec_group_id: 1}, {unique: false})
- db.bikes_specs.createIndex({name: 1}, {unique: true})
- db.bikes_specs_groups.createIndex({name: 1}, {unique: true})
- db.bikes_specs_relations.createIndex({bike_id: 1}, {unique: false})
- db.bikes_specs_relations.createIndex({spek_id: 1}, {unique: false})
- db.bikes_types.createIndex({name: 1}, {unique: true})
- db.bikes_brands.createIndex({name: 1}, {unique: true})

## 25 Maret 2019

### Add

- create new collection `bikes`, collection to save list bike
- create new collection `bikes_types`, collection to save bike types
- create new collection `bikes_brand`, collection to save bike brand
