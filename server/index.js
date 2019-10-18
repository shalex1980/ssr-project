import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/components/App';

const app = express();

//app.use(express.static(__dirname + '/public/assets'));

app.use((req, res) => {
  const componentHTML = ReactDOMServer.renderToString(< App />);

  return res.end(renderHTML(componentHTML));
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050/public/assets' : '/';



function renderHTML(componentHTML) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel="stylesheet" href="${assetUrl}/styles.css">
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/bundle.js"></script>
      </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Server listening on ', PORT);
})