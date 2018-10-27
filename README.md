맛집 공유 서비스 Restful API 샘플
==================================
CanDoVueJS(가제)의 클라이언트 어플리케이션 제작을 위해 만들어진 Restful API 서버 입니다.

시작하기
---------------

1. 원하는 작업 디렉토리로 이동 후 프로젝트를 클론받으세요
```sh
$ cd my-workspace
$ git clone https://github.com/CanDoVueJS/hot-place-share-api.git
```

2. 클론받은 프로젝트의 디렉토리로 이동하세요
```sh
cd hot-place-share-api
```
# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start
```
Docker Support
------
```sh
cd express-es6-rest-api

# Build your docker
docker build -t es6/api-service .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 es6/api-service
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   

```

License
-------

MIT
