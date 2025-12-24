module.exports = async function (context, req) {
  const API_URL = process.env.API_URL
  const method = req.method.toUpperCase()
  const id = context.bindingData.id

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

  if (!url) {
    context.res = { status: 404, body: 'Ruta no soportada' }
    return
  }

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: ['GET', 'DELETE'].includes(method)
      ? undefined
      : JSON.stringify(req.body)
  })

  const data = await res.text()

  context.res = {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') ?? 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: data
  }
}