const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

// CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ── Rewriter de rutas (forma correcta en json-server) ────────────────────────
const rewriter = jsonServer.rewriter({
  '/reporting/reports/clients':       '/reporting-reports-clients',
  '/reporting/reports/clients/:id':   '/reporting-reports-clients/:id',
  '/reporting/kpis/fulfillment':      '/reporting-kpis-fulfillment',
  '/reporting/kpis/fulfillment/:id':  '/reporting-kpis-fulfillment/:id',
  '/reporting/kpis/sectors':          '/reporting-kpis-sectors',
  '/reporting/kpis/sectors/:id':      '/reporting-kpis-sectors/:id',
  '/catalog/products':                '/inventory',
  '/catalog/products/:id':            '/inventory/:id',
  '/fulfillment/vehicles':            '/vehicles',
  '/fulfillment/vehicles/:id':        '/vehicles/:id',
  '/fulfillment/drivers':             '/drivers',
  '/fulfillment/drivers/:id':         '/drivers/:id',
  '/fulfillment/deliveries':          '/deliveries',
  '/fulfillment/deliveries/:id':      '/deliveries/:id'
});

server.use(rewriter);
server.use(middlewares);
server.use(router);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`JSON Server running on port ${PORT}`);
});
