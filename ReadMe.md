# Request Broker

<div align="center">
  <img alt="request_broker_logo" src="https://s3.amazonaws.com/com.request.broker.queue/img/request_broker_logo.png" width="400px" />
</div>

Request Broker is a payment processing pipeline that delivers payment requests to a queue to be processed by a variety of applications depending on the type of messages in the queue.

## Getting Started

These instructions will get your copy of the application up and running on your local machine for development and testing purposes.

### Prerequisites

The setup of this application assumes you have Node.js already installed

```
Please download the latest version of Node.js here: https://nodejs.org/en/download/
```

### Installing

To get this client up and running on your local machine

In the root of the repository: 

- Run this command to install all the dependencies listed in the package.json file

```
npm install
```

- Run this command to compile and host the application on a local server

```
npm run dev
```

After running the previous command, go to http://localhost:5000 in your web browser

You should see the webpage below

<div align="center">
  <img alt="request_broker_screenshot" src="https://s3.amazonaws.com/com.request.broker.queue/img/request_broker_screenshot.png" width="400px" />
</div>

## Built With

* [Next.js](https://nextjs.org/) - react framework
* [Express.js](https://expressjs.com/) - web application framework
* [Ant Design](https://ant.design/) - materialized design system
* [Amazon Web Services](https://aws.amazon.com/) - serverless infrastructure 
* [Serverless Framework](https://serverless.com/) - toolkit for serverless applications
* [Virus Total API](https://developers.virustotal.com/reference) - malware scanning API

## Authors

* **Vaughn Whitehurst** - *Initial work* - [Request_Broker](https://github.com/vaughnpw/Request_Broker)
