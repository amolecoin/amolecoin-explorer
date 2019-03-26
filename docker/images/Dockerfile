# amolecoin build
# reference https://github.com/amolecoin/amolecoin
FROM golang:1.10.2-stretch AS build
# dirs
RUN mkdir -p $GOPATH/src/github.com/amolecoin/

# copy code to build
ADD . $GOPATH/src/github.com/amolecoin/amolecoin-explorer

# install amolecoin-explorer
RUN cd $GOPATH/src/github.com/amolecoin/amolecoin-explorer && \
  CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /go/bin/amolecoin-explorer .

# change to bash to be able to use `source` command
RUN ln -sf /bin/bash /bin/sh

# install node, explorer dependencies build Angular's project
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash && \
	source /root/.profile && \
	nvm install 8.9 && \
	nvm use 8.9 && \
	cd $GOPATH/src/github.com/amolecoin/amolecoin-explorer && \
	npm install webpack @angular-devkit/build-optimizer && \
	npm install && \
	npm run build

# amolecoin image
FROM busybox:latest

# copy all the binaries
COPY --from=build /go/bin/* /usr/bin/

# copy assets
COPY --from=build /go/src/github.com/amolecoin/amolecoin-explorer/dist ./dist

ENV EXPLORER_HOST="0.0.0.0:8001" \
    AMOLECOIN_ADDRESS="http://127.0.0.1:9981"

EXPOSE 8001

ENTRYPOINT ["/usr/bin/amolecoin-explorer"]
