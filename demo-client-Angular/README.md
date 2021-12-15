# Angular

## Installation 📝

To be able to visualize and interact a frontend is necessary, in this case a simple one was deployed in Angular.

For that reason, you need to install Angular first: https://angular.io/guide/setup-local.


## Endpoints ans keys 🔑

Once installed, you need to include the AWS endpoint and the Hashura key.

```
AWS/
 │
 ├── src/
 |   ├── app/
 |   |   └── graphql.module.ts
 |   |
 │   └── enviroment/
 │       ├── environment.prod.ts
 │       └── environment.ts
 ...
```
```json
{
  // Production mode
  "production": false,
  // AWS endpoint
  "endpoint": "",
  // Hashura endpoint
  "gql": "",
  // Hashura key
  "gqlkey": ""
}
```

[AWS endpoint](https://github.com/ERP-BPM/erpnext-camundabpm-integration/tree/main/AWS#aws-endpoint)

## Implementation 💻

To deploy the application in a development environment it is enough to execute.

```
ng serve -o
```

In case of implementing in a production environment https://angular.io/guide/deployment.