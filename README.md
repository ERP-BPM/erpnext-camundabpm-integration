# erpnext-camundabpm-integration

# Stack
<!-- (demo image-label rendered in real time) 
![](https://img.shields.io/badge/LABEL-MESSAGE-COLOR) 
-->
![](https://img.shields.io/badge/TypeScript-✓-blue.svg)
![](https://img.shields.io/badge/JavaScript-✓-blue.svg)
![](https://img.shields.io/badge/Kubernetes-✓-blue.svg)
![](https://img.shields.io/badge/Docker-✓-blue.svg)
![](https://img.shields.io/badge/Postgresql-✓-blue.svg)
![](https://img.shields.io/badge/Node.JS-✓-blue.svg)

# File structure (DEMO)

```
THIS/
 │
 ├── Folder Example...
 │   ├── File Example...
 │   ├── File Example...
 │   └── File Example...
 │
 ├── .gitignore
 └── README.md
```

# Introducción

Este proyecto fue creado con el fin de crear un ecosistema que integre dos herramientas muy conocidad, la cuales son ERPNext y Camunda BPM. Esto es debido a que no existe, hasta el momento, manera alguna de unir estas dos herramientas para poder utilizarlas dentro de un mismo contexto.

Incio como un proyecto escolar para Proyectos Computacionales en la carreara de Ingeniería en Sistemas Inteligentes, en la UASLP.

Este repositorio fue creado para albergar todo lo necesario para instanciar el stack ERP-BPM además de los microservicios necesarios para iniciar la comunicacion entre los dos recurso.

A continuación, se explicara la manera de implementar, instanciar y utilizar el ecosistema completo. 

## Prerrequsitos

Los requisitos necesarios para ello son los siguientes:

# Implementation Details
In order to implement a ready to test environment of tecnologies used in this project we need cover the configuration steps in the next sections.

We going to need get the main stack that results after cloning the repository using git ([download](https://git-scm.com/)), then we configure the environment with Docker ([how to install](https://github.com/AngelAngelopoulos/ERPNext-CamundaBPM-Integration/wiki/Requisites#docker-installation)) and YAML files. 

For some implementations, tecnologies, modifications and more is necessary that we [install NodeJS](https://nodejs.org/es/) in our computer.


## ERPNext environment
In order to install and configure a local ERPNext client we can follow the next steps. To see other options and details about a more complete configuration for the environment see [ERPNext installation](https://github.com/AngelAngelopoulos/ERPNext-CamundaBPM-Integration/wiki/ERPNext-Environment).

1. Cloning the repository for ERPNext client
```
git clone https://github.com/frappe/frappe_docker.git
```

3. Move to the repo directory.
```
cd frappe_docker
```

4. Copy the example docker environment file to .env
```
cp env-local .env
```

5. Start docker containers with the name of your proyect. This step can take minutes to be ready.
```
# docker-compose --project-name <project-name> up -d
```

4. The default user is `Administrator` and password `$ADMIN_PASSWORD`.




## Zeebe environment and Camunda client
Now to configure the environment for Zeebe local client we need to follow the next steps. Also we can see a more complete configuration at [Zeebe](https://github.com/zeebe-io/zeebe-docker-compose).

1. Clone repository for Zeebe
```
git clone https://github.com/zeebe-io/zeebe-docker-compose
```

2. Move to operate folder in repository folder
```
https://github.com/AngelAngelopoulos/ERPNext-CamundaBPM-Integration/wiki/Zeebe-Environment
```

3. Run docker containers
```
docker-compose up
```

4. Now we can easily access to Docker Desktop on "Images" section and run **camunda/operate** to start the local client of Camunda Cloud with Zeebe.

5. Finally we can access to http://127.0.0.1:8080/login in our navigator to access the local client. Default user is `demo` and password is `demo`.


### Camunda Modeler
To achieve implement a process in the Camunda client is necesary design a diagram that represent the flow of the process using [BPMN](https://camunda.com/bpmn/reference/) a graphical notation to design business processes. [Camunda Modeler](https://camunda.com/download/modeler/) is a tool from Camunda that help us to create our process diagrams and simplify deployment on Camunda client.

For a demo we use two process examples: ***(ACTUALIZA ENLACES)***
* Diagram of [Selling a product online](https://myDiagram)
* Diagram of [Patient admission to a hospital](https://myDiagram)

> Note: The BPMN language suported on Camunda differs from Camunda Cloud because have different workflow engines, both supported by community and may have more features in future relases. See the [actual BPMN elements alowed latest relase for Camunda Cloud](https://docs.camunda.io/docs/reference/bpmn-processes/bpmn-coverage/).

### Hasura

To install Hasura its requiredhave Docker installed and configured, this will be our Microservice trigger, when a new Patient (or another Entity) is created, Hasura activates an Event, this is a webhooks that sends a POST message to an endpoint (our service start-process) and initiates the process in Camunda BPM, in operate portal we shall be the new instance of the process


### Microservice Core

You can instantiate the functions in the Cloud using Openfaas (see the [Installation Guide](https://github.com/AngelAngelopoulos/ERPNext-CamundaBPM-Integration/wiki/Open-faas-%28faas-cli%29-Environment)) or AWS lambda (see our Implmenetation Guide) in each case, it can be achieved using a Multiservice gestor, so, this can be used as trigger for the functions, using Javascript to create Microservices, then, is is the API and the endpoints start-process and send-message   


# Contribution
