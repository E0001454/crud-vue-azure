module.exports = async function (context, req) {
  const API_URL = process.env.API_URL
  const method = req.method.toUpperCase()
  const id = context.bindingData.id

  context.log('--- personas function ---')
  context.log('method:', method)
  context.log('id:', id)
  context.log('API_URL:', API_URL)

  let url = null

  if (method === 'GET' && !id) {
    url = `${API_URL}/consultar/clientes`
  }

  if (method === 'GET' && id) {
    url = `${API_URL}/consultar/cliente/${id}`
  }

  if (method === 'POST') {
    url = `${API_URL}/registrar/cliente`
  }

  if (method === 'PUT' && id) {
    url = `${API_URL}/actualizar/cliente/${id}`
  }

  if (method === 'DELETE' && id) {
    url = `${API_URL}/eliminar/cliente/${id}`
  }

  context.log('final url:', url)

  if (!url) {
    context.res = { status: 404, body: 'Ruta no soportada' }
    return
  }

  let res
  try {
    res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: ['GET', 'DELETE'].includes(method)
        ? undefined
        : JSON.stringify(req.body)
    })
  } catch (err) {
    context.log('FETCH ERROR:', err)
    context.res = { status: 500, body: 'Error al contactar backend' }
    return
  }

  const data = await res.text()

  context.log('backend status:', res.status)
  context.log('backend response:', data)

  context.res = {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') ?? 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: data
  }
}