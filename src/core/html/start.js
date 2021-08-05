import { Helmet } from 'react-helmet';
import config from 'config';
import pkg from '../../../package.json';
import { fontsCSS } from './critical';

export default function start({ linkTags, styleTags }) {
  const helmet = Helmet.renderStatic();

  return `<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    <!-- ${pkg.name} V${pkg.version} -->
    ${helmet.base.toString()}
    ${helmet.title.toString()}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5"> 
    ${helmet.meta.toString()}
    
    <link rel="manifest" href="/manifest.json">
    ${linkTags}
    ${helmet.link.toString()}
    
    <style type="text/css">${[fontsCSS].join('')}</style>
    ${styleTags}
    ${helmet.style.toString()}

    <!--[if lt IE 9]>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
    <![endif]-->
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <noscript>
      <div>Website memerlukan javascript untuk dapat ditampilkan.</div>
    </noscript>
    <div id="app">`;
}
