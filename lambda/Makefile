.PHONY: docker-build
docker-build:
	docker build -t cdk-stepfunctions-sample-lambda:dev -f docker/Dockerfile .

.PHONY: docker-run
docker-run:
	docker run -p 9000:8080 --entrypoint /usr/local/bin/aws-lambda-rie cdk-stepfunctions-sample-lambda:dev ./app

.PHONY: dev
dev:
	curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"message":"hello world!"}'
