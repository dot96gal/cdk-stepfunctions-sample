package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
)

type MyEvent struct {
	Message string `json:"message"`
}

type MyResponse struct {
	Message string `json:"message"`
}

func HandleRequest(ctx context.Context, event *MyEvent) (*MyResponse, error) {
	if event == nil {
		return nil, fmt.Errorf("received nil event")
	}

	response := MyResponse{Message: event.Message}

	return &response, nil
}

func main() {
	lambda.Start(HandleRequest)
}
