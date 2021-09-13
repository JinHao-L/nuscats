# NUS Cats


## Development

The frontend can be found at [http://localhost:3000](http://localhost:3000).

The backend can be found at [http://localhost:3001](http://localhost:3001)

### With Docker

Note that our local setup currently uses all `host` networks due to some complications with `minio`. 

#### Prerequisites

1. [Docker](https://docs.docker.com/get-docker/)
1. [docker-compose](https://docs.docker.com/compose/install/)

#### Running 

From the root of this repository, run
```bash
$ docker-compose up --build
```
This will spin both the frontend and backend in development mode with watch mode and changes should be reflected automatically.

If you only need either frontend/backend, you can specify only one like
```bash
$ docker-compose up frontend
```


To shut down services after you are done, run
```bash
$ docker-compose down
```

### Without Docker

Note that without Docker, you will need to have your own instance of Postgres running and set the necessary environment variables when running the backend. You will also need to set up a local Minio server to simulate S3 features.

#### Prerequisites

1. Node
1. Yarn

#### Running

**Frontend**
```bash
yarn fe:start
```

**Backend**
```bash
yarn be:start
```