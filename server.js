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

// ── Rutas personalizadas para Reporting ──────────────────────────────────────
// Redirige /reporting/reports/clients → /reporting-reports-clients
server.use('/reporting/reports/clients', (req, res, next) => {
  req.url = '/reporting-reports-clients' + (req.url === '/' ? '' : req.url);
  next();
});

// Redirige /reporting/kpis/fulfillment/:id → /reporting-kpis-fulfillment/:id
server.use('/reporting/kpis/fulfillment', (req, res, next) => {
  req.url = '/reporting-kpis-fulfillment' + (req.url === '/' ? '' : req.url);
  next();
});

// Redirige /reporting/kpis/sectors → /reporting-kpis-sectors (si lo usas)
server.use('/reporting/kpis/sectors', (req, res, next) => {
  req.url = '/reporting-kpis-sectors' + (req.url === '/' ? '' : req.url);
  next();
});

// Rutas de catálogo e inventario
server.use('/catalog/products', (req, res, next) => {
  req.url = '/inventory' + (req.url === '/' ? '' : req.url);
  next();
});

// Rutas de fulfillment
server.use('/fulfillment/vehicles', (req, res, next) => {
  req.url = '/vehicles' + (req.url === '/' ? '' : req.url);
  next();
});

server.use('/fulfillment/drivers', (req, res, next) => {
  req.url = '/drivers' + (req.url === '/' ? '' : req.url);
  next();
});

server.use('/fulfillment/deliveries', (req, res, next) => {
  req.url = '/deliveries' + (req.url === '/' ? '' : req.url);
  next();
});

// ─────────────────────────────────────────────────────────────────────────────

server.use(middlewares);
server.use(router);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`JSON Server running on port ${PORT}`);
});
