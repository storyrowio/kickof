FROM golang:1.23-alpine

WORKDIR /app
COPY . .
RUN go mod tidy

COPY *.go ./

RUN go build -o /kickof

EXPOSE 8000

CMD [ "/kickof" ]