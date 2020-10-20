# DevExtreme Akita

"DevExtreme Akita" is a demo project meant to show how [DevExtreme Angular](https://js.devexpress.com/Overview/Angular/) 
and [Akita](https://datorama.github.io/akita/) can be used together. It's an unofficial project and the author is not 
affiliated with "DevExpress" or "Datorama" in any way.

![Ticket App](https://user-images.githubusercontent.com/768105/96586185-ee01c600-12e0-11eb-97c8-a5137473ca89.png)

## Features shown in the demo

- State management with Akita
- Responsive UI design
- Authentication with [JWT rotating refresh token](https://auth0.com/blog/securing-single-page-applications-with-refresh-token-rotation/#Introducing-Refresh-Token-Rotation)

## Running the demo locally
 
- Install dependencies
```bash
yarn install
```
- Copy `/apps/api/src/environments/environment.example.ts` to `environment.ts`
- Open `environment.ts` and update options in `typeOrm`  and `JWT` sections
- Import [MySQL dump](https://github.com/hakimio/dx-akita/files/5408162/ticket_app.zip) to your local MySQL database
- Start the backend:
```bash
yarn start:backend
```
- Start the frontend:
```bash
yarn start:frontend
```
- Open [localhost:4200](http://localhost:4200) in your browser and login with user `don`, password `admin`
- Optional step: install [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
 to monitor  application's state changes as you interact with it.

## Entity Relationship Diagram
![Entity Relationship Diagram](https://user-images.githubusercontent.com/768105/96582167-2dc5af00-12db-11eb-9abc-308f0a5b7b5b.png)

## License

MIT
