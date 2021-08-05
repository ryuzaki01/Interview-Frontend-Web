# interview-frontend-web (React SSR + GraphQL)

## Table of Contents
1. [Requirements](#requirements)
2. [Getting Started](#getting-started)
2. [Service Handling](#service-handling)

## Minimum Requirements
* node `8.11.1 (LTS)`
* npm `5.6.0`
* redis `^3.2.6`

## Configuration (Local Machine)
- Copy Environment configuration file from .env.example to .env
```bash
$ cp .env.example .env
```
- Modify it based on your configuration preference

## Configuration (Server Machine)
There are two method on how to set the environment configuration :
- Using .env File
  - Copy Environment configuration file from .env.example to .env
    ```bash
    $ cp .env.example .env
    ```
  
  - Modify it based on server configuration preference
- Using Machine Environment
  - Edit ~/.bash_profile or create a bash script that run the server
  - Put all the required environment configuration there
  - ``` 
    # NodeJS Environment
    NODE_ENV=production
    
    # Cluster worker count
    # Remove Comment to limit workers
    RECLUSTER_WORKERS=1
    
    # PID File Output
    #PIDFILE=/var/run/interview-frontend-web.pid
    
    HOST=localhost
    PORT=3030
    SECRET=197eadef69e4957631a5c3cf97961b33
    
    # Host Configuration example: https://screening.moduit.id
    APPHOST=http://localhost:3000
    APPDOMAIN=localhost
    
    # NewRelic Configuration
    NEW_RELIC_ENABLED=false
    NEW_RELIC_NO_CONFIG_FILE=true
    NEW_RELIC_APP_NAME=interview-frontend-web
    NEW_RELIC_LICENSE_KEY=
    NEW_RELIC_LOG_LEVEL=info
    
    # Build Configuration
    PRETTY_LOG=false
    SOURCE_MAP=true
    #DEBUG=express-session*
    #NODE_DEBUG=true
    
    # Log configuration
    #LOGDIR=/var/logs/
    #LOG_SIZE=500m
    #LOG_KEEP=5
    

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements),
you can start the site by running these commands:

```bash
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
```

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start` |Serves your app at `localhost:3035`. HMR will be enabled and `client.css` file will not be generated.|
|`build`|Compiles the application to disk (`~/build` by default).|
|`serve` |Serves your builded app at `localhost:3035`. Using `./bin/cluster`, to simulate production behaviour.|
|`test`|Runs all tests in sequence|
|`lint:js`|Run javascript linter.|
  
***Important note:***

Before you commit, make sure to always run:

```bash
$ npm test
```

and have all the tests pass.

## Service Handling

**CPU USAGE**  
By default app will use all of the CPU core to spawn it's worker,
this can be changed by modifying `RECLUSTER_WORKERS=1` to any CPU count you require

**GRACEFUL RESTART**  
To make sure that all process were not used before killing the process
and gracefully kill the child process use :  
``kill -s SIGUSR2 `cat /var/project-path/project-name.pid` ``  

to change PID file output location you could modify the env `PIDFILE=/var/project-name.pid`


**GRACEFUL KILL**  
``kill -s SIGTERM `cat /var/project-path/project-name.pid` ``

## Branches
There are following branches used in project:
* `master` that is what is running on production server
* `devel` is always on top of `master` (fast-forward) and that is branch you should fork when you start working on a new feature
That is also the branch you should rebase onto daily while you are working on your feature.
* `feature/*` each feature may have it's own branch and that branch may be deployed somewhere for testing as well.

