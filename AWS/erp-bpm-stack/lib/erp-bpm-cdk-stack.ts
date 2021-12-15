import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_apigateway as apigateway } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';

export class ErpBpmCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'erp-bpm-api', {
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowCredentials: true,
        allowMethods: apigateway.Cors.ALL_METHODS, // this is also the default
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      },
    });

    const fnTest = new lambda.Function(this, "test-func", {
      // layers: [layer],
      timeout: Duration.seconds(30),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "test/handler.handler",
      memorySize: 512,
      code: new lambda.AssetCode("../erp-bpm-integration-api/"),
    });

    const fnSend = new lambda.Function(this, "send-func", {
      // layers: [layer],
      timeout: Duration.seconds(30),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "send-message/handler.handler",
      memorySize: 512,
      code: new lambda.AssetCode("../erp-bpm-integration-api/"),
    });

    const fnStart = new lambda.Function(this, "start-func", {
      // layers: [layer],
      timeout: Duration.seconds(30),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "start-process/handler.handler",
      memorySize: 512,
      code: new lambda.AssetCode("../erp-bpm-integration-api/"),
    });

    api.root.addMethod('ANY', new apigateway.LambdaIntegration(fnTest));

    const send = api.root.addResource('send');
    send.addMethod('ANY', new apigateway.LambdaIntegration(fnSend));

    const start = api.root.addResource('start');
    start.addMethod('ANY', new apigateway.LambdaIntegration(fnStart));
  }
}
