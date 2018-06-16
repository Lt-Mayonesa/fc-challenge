# Cache Api

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