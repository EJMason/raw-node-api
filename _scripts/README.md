# List of Scripts


### Development start server
> clear && NODE_ENV=dev node index.js

### Create certs for HTTPS
> openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

