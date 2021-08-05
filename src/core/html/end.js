import serialize from 'serialize-javascript';
import config from 'config';

export default function end({ initState = {}, initCacheState = {} }, scriptTags) {
  return `</div>
    <div id="modal-root"><!--MODAL--></div>
    <div id="drawer-root"><!--DRAWER--></div>

    <script type="text/javascript">
      window.__data = ${serialize(initState)};
      window.__cache = ${serialize(initCacheState)};
    </script>
    
    <script type="text/javascript">
      window.CONFIG = ${serialize(config.globals)}
    </script>    
    
    ${scriptTags}
  </body>
</html>`;
}
