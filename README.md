# NUS Cats

Find your favourite cats!

https://nuscats.herokuapp.com

| Name                | Number    | Contributions             |
| ------------------- | --------- | ------------------------- |
| Tan Kang Liang      | A0150038R | Fullstack, Sightings      |
| Huang Weijie        | A0190270M | Fullstack, Cats           |
| Lim Jin Hao         | A0205878R | Fullstack, Authentication |
| Let Yan Wen Dominic | A0183831A | Fullstack, Profile        |

## Development

The frontend can be found at [http://localhost:3000](http://localhost:3000).

The backend can be found at [http://localhost:3001](http://localhost:3001)

### With Docker

#### Prerequisites

1. [Docker](https://docs.docker.com/get-docker/)
1. [docker-compose](https://docs.docker.com/compose/install/)

#### Environment

The following variables are needed in `frontend/.env`

```
REACT_APP_MAPBOX_TOKEN
MESSAGING_VAPID_KEY
```

The following variables are needed in `backend/.env`

```
POSITIONSTACK_API_KEY
EMAIL_ID
EMAIL_PASS
EMAIL_HOST
EMAIL_PORT
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```


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

#### Environment

Please refer to the above for `frontend/.env`.

Please refer to `backend/src/config/config.schema.ts` for all variables used.

#### Running

**Frontend**
```bash
yarn fe:start
```

**Backend**
```bash
yarn be:start
```

### Logging in as Admin in-app:
* email: admin@gmail.com
* password: admin

