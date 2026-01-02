export async function getSasUrl(filename: string): Promise<{ uploadUrl: string }>{
    const res = await fetch(`https://crud-vue-azure-config-e7ccfgbmfrbghvg6.canadacentral-01.azurewebsites.net/api/httpTrigger2?filename=${encodeURIComponent(filename)}`)
    if(!res.ok) throw new Error('No se obtuvo el SAS')
    return res.json() 
}