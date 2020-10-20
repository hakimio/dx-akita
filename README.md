# DevExtreme Akita

"DevExtreme Akita" is a demo project meant to show how [DevExtreme Angular](https://js.devexpress.com/Overview/Angular/) 
and [Akita](https://datorama.github.io/akita/) can be used together. It's an unofficial project and the author is not 
affiliated with "DevExpress" or "Datorama" in any way.

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

## License

MIT
