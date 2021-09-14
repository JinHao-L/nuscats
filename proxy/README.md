# Proxy

This proxy is used locally to resolve networking issues when using docker-compose networking with minio.

## Problem

With docker-compose DNS, our backend retrieves a signed URL e.g. `http://s3:9000/signedURL` which does not work on a browser since it is on the host network. The signature fails as well if we try to access it through `http://localhost:9000/signedURL` due to the host name being part of the signature.

Proxy solution: https://docs.min.io/docs/setup-nginx-proxy-with-minio.html