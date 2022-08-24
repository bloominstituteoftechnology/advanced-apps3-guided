# Advanced Web Applications - PUT and DELETE

## Tools

- Node 16.x
- NPM 8.x (update NPM executing `npm i -g npm`)
- Postman (download the desktop version [here](https://www.postman.com/downloads/))
- Chrome >= 100.x

Other browser/Node/NPM configurations might work but haven't been tested.

## Project Set Up

- Clone, and `npm install`.
- Launch the project on a development server executing `npm run dev`.
- Visit your app by navigating to `http://localhost:3000` with Chrome.

## API Endpoints

The following endpoints exist in this project and should be explored with Postman prior to coding:

- `POST http://localhost:9000/api/login`
- `GET http://localhost:9000/api/articles`
- `POST http://localhost:9000/api/articles`
- `PUT http://localhost:9000/api/articles/:id`  { topic, text, title, article_id }
- `DELETE http://localhost:9000/api/articles/:id`
