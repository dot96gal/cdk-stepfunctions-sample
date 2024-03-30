import * as cdk from "aws-cdk-lib";
import { Duration } from "aws-cdk-lib";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sfn from "aws-cdk-lib/aws-stepfunctions";
import * as tasks from "aws-cdk-lib/aws-stepfunctions-tasks";
import type { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const lambda01 = new lambda.DockerImageFunction(
			this,
			"CdkStepfunctionsSampleLambda",
			{
				code: lambda.DockerImageCode.fromImageAsset("../lambda", {
					file: "docker/Dockerfile",
					platform: Platform.LINUX_AMD64,
					exclude: ["cdk"],
				}),
				memorySize: 128,
				timeout: Duration.seconds(30),
			},
		);

		const task01 = new tasks.LambdaInvoke(
			this,
			"CdkStepfunctionsSampleLambdaTask01",
			{
				lambdaFunction: lambda01,
			},
		);

		const task02 = new tasks.LambdaInvoke(
			this,
			"CdkStepfunctionsSampleLambdaTask02",
			{
				lambdaFunction: lambda01,
				inputPath: "$.Payload",
			},
		);

		const stateMachine = new sfn.StateMachine(
			this,
			"CdkStepfunctionsSampleStateMachine",
			{
				definition: task01.next(task02).next(new sfn.Succeed(this, "finish")),
			},
		);
	}
}
