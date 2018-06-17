# Cache Api

Your task is to build a REST API that exposes methods to interact with a cache that you will
build. You will have to use Node.js and Express.js to build the API and MongoDB to store the
cache data in. The cache does not have another data source in the background that is cached.
All data returned by the cache is random dummy data. You do not need to build a frontend.
The API shall be used with tools like curl or Postman.

## Usage
For this project to work you need to have a MongoDB instance at hand and Node.js installed.

Installing
```
git clone https://github.com/Lt-Mayonesa/fc-challenge.git
cd fc-challenge
npm install
```
Running the app (with live-realod)
```
npm run dev
```
Running the app
```
npm start
```

### Configuration
All configuration can be found in ``./src/config/index.js``

## Endpoints (using prefix '/cache/v1')

### GET ``/cache/v1/``
Get all keys stored in db

Returns ``[Array]``:
 - all keys stored

### GET ``/cache/v1/:key``
Get one key from cache

Returns ``String``:
 - on miss -> new random string
 - on hit -> value of key

### PUT ``/cache/v1/:key``
Create or update passed key

Body ``{value: 'string'}``
 - the value to store

Returns ``{Object}``:
 -  created object

### DELETE ``/cache/v1/:key``
Delete one key from db

Returns ``String``:
 - empty string if successful

### DELETE ``/cache/v1/flush/all``
Delete all keys from db

Returns ``[Array]``:
 - empty array if successfull



## Following features have to be implemented for the cache:
- Add an endpoint that returns the cached data for a given key
	- If the key is not found in the cache:
		- Log an output “Cache miss”
		- Create a random string
		- Update the cache with this random string
		- Return the random string
	- If the key is found in the cache:
		- Log an output “Cache hit”
		- Get the data for this key
		- Return the data
- Add an endpoint that returns all stored keys in the cache
- Add an endpoint that creates/updates the data for a given key
- Add an endpoint that removes a given key from the cache
- Add an endpoint that removes all keys from the cache