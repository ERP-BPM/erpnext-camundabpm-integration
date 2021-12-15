# AWS

In the following section we describe the implementation using Amazon Web Services (AWS) as the cloud provider.

## Getting Started

### Account

In order to deploy the microservices to AWS, it is necessary to have an AWS account and configure the profile in CLI as shown in: [getting started](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-prereqs.html).

We recommend creating a IAM policy profile for making the deployment instead of using the root credentials, this is a good practice beacause it allows for more robust project security in order to avoid malicious actions in the AWS account.

### NodeJS install

In order to deploy the project wee NodeJS installed. We use NodeJS as the engine for the lambda handler and it is also used for CDK project.

Binaries, installers, and source tarballs are available at
<https://nodejs.org/en/download/>.


### CDK install

In order to make deployment of the statck, it is necessary to install CDK, for that we install it using npm as a global module:

Version 2 or higher is required in order for the deployment to work.

 * `npm install -g aws-cdk@1.x`
 * `npm install -g aws-cdk@X.YY.Z`
 * `install latest 1.x version`
 * `install specific version`


## Modules

For the AWS implementation we created 2 modules, one that holds the lambda functions code that uses NodeJS as its engine and a AWS Cloud Development Kit project that the descirbe the stack.

### Lambda handlers

The module of the lambda functions code can be found in the folder called `erp-bpm-integration-api`, in where we found two folder one with the send message function and another with the start process function. If you want to change the lambda functions implementations modify each accordingly.

```
erp-bpm-integration-api/
 │
 ├── erp-bpm-integration-api
 │   └── send_message
 │   └── start_process
  ...
```

### AWS CDK

In order to modify the structure of the stack, it is necessary to navigate to the `erp-bpm-stack` folder. In the bin folder we see the instance of the stack that will be deployed and in the stack file we see the definition of the different resources that are goint to be used. If you want to add more resources to the stack you will need to modify the stack file.

```
erp-bpm-stack/
 │
 ├── bin
 |   └── erp-bpm-cdk.ts
 ├── lib
 |   └── erp-bpm-cdk-stack.ts
  ...
```


## Deployment

Only if it is the first time deploying is it necessary to bootstrap beforehand. The boostrap command will setup the necessary tools in AWS Cloud Formation to make deployment of the AWS CDK constructs.
  
```
cdk bootstrap
```

Whether some changes have been made or if it is the first time making deployment of the stack, the project must first be compiled. By using the following command:

```
npm run build
```

Once compiled, the stack can be deployed by running:

```
cdk deploy
```

When ever we are deploying some resource for the first time cdk may prompt you to give IAM permission to the new resources being deployed, this will only happen the first time or when we add new resoruces to the stack. In order to accept the permissions we only type `y`.

### API endpoint

Once it finishes deployment we will see the following output in the terminal with the Api Gateway endpoint. This endpoint can be used to communicate with Camunda Cloud.

```
✅  Stack

endpoint: // AWS endpoint
```

## More Resources
* [CDK Workshop](https://cdkworkshop.com/)
* [CDK Documentation](https://docs.aws.amazon.com/cdk/api/latest/)
