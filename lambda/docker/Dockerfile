FROM golang:1.22.1 as build
WORKDIR /work
COPY go.mod go.sum ./
COPY main.go .
RUN go build -tags lambda.norpc -o app main.go

FROM public.ecr.aws/lambda/provided:al2023
COPY --from=build /work/app ./app
ENTRYPOINT [ "./app" ]
