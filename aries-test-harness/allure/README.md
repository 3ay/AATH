
# ALLURE Reporting with Aries Agent Test Harness

  

## LOCAL USAGE

Execute Allure Docker Service from this directory

```sh

docker-compose up -d allure allure-ui

```

  

- Verify if Allure API is working. Go to -> http://localhost:5050/allure-docker-service/latest-report

  

- Verify if Allure UI is working. Go to -> http://localhost:5252/allure-docker-service-ui/

  

Each time tests are executed with the -r allure option, and those results need to be pushed to an official service for tracking test execution history you will need to send those results up to the Allure Service to the appropriate project.

```sh

./send_results.sh ./allure-results http://localhost:5050 -p acapy

```

## CONITNUOUS INTEGRATION
The AATH is executed with varying configurations and Aries Agent types at pre-determined intervals to make find issues and track deltas between builds of these agents. You can find the Allure reports for these test runs at the following links.

- [Acapy to Acapy Agent Interop Testing](https://allure.vonx.io/allure-docker-service-ui/projects/acapy/reports/latest)
- [Full Acapy to Acapy Agent Interop Testing](https://allure.vonx.io/allure-docker-service-ui/projects/acapy-full/reports/latest)
- [Acapy to Dotnet Agent Interop Testing](https://allure.vonx.io/allure-docker-service-ui/projects/acapy-b-dotnet/reports/latest)
- [Acapy to JavaScript Agent Interop Testing](https://allure.vonx.io/allure-docker-service-ui/projects/acapy-b-javascript/reports/latest)
- [Dotnet to Dotnet Agent Interop Testing](https://allure.vonx.io/allure-docker-service-ui/projects/dotnet/reports/latest)
- [JavaScript to JavaScript Agent Interop Testing](https://allure.vonx.io/allure-docker-service-ui/projects/javascript/reports/latest)
- [JavaScript to Dotnet Agent Interop Testing](https://allure.vonx.io/allure-docker-service-ui/projects/javascript-b-dotnet/reports/latest)
- [Acapy to AFGO Agent Interop Testing](https://allure.vonx.io/allure-docker-service-ui/projects/acapy-b-afgo/reports/latest)
- [AFGO to AFGO Agent Interop Testing](https://allure.vonx.io/allure-docker-service-ui/projects/afgo/reports/latest)


## REFERENCES
See Allure Docker Service documentation here:

- https://github.com/fescobar/allure-docker-service

- https://github.com/fescobar/allure-docker-service-ui