This project was built using [Fluree's blockchain-backed graph database](https://docs.flur.ee)

## Introduction

This repo offers a look at Fluree identity management via the [Password API](https://docs.flur.ee/api/downloaded-endpoints/overview#password-authentication-endpoints) and user roles.

Included is a simple React app that demonstrates how Fluree's built-in user roles can be leveraged to provide role-specific functionality. You will need to be running a local instance of a Fluree database to use the app. This demo was built and tested using [Fluree v0.15.0](https://fluree-releases-public.s3.amazonaws.com/fluree-0.15.0.zip), although it should also run on the latest version, available [here](https://fluree-releases-public.s3.amazonaws.com/fluree-latest.zip).

Check out the accompanying video (coming soon!) to see a more in-depth example of how the Password API works, along with a quick walkthrough of the example app.

## Starting a local Fluree instance

Before you can use the app, you need a local instance of Fluree running. In the folder you extracted Fluree into, use the terminal command `./fluree_start.sh` (you can use the built-in terminal emulator with Linux/Mac; for Windows you will need to download a Bash emulator (e.g. [Git for Windows](https://gitforwindows.org/)))

For more detailed instructions, you can check out the [Fluree docs](https://docs.flur.ee/docs/getting-started/fluree-anywhere) on the subject.

## Starting the React App

Use the command `npm install` in the project directory to locally install the project dependencies.

As long as you have a local instance of Fluree running (see above), run `npm start`, and the app should automatically create the database in the Fluree ledger, set up the schema, and populate seed data upon mounting. If you are running your Fluree instance on a port other than the default (8080), set the port number as the enviroment variable `REACT_APP_FLUREE_PORT`. 