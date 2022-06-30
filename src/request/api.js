import request from './request'

export const RegisterApi = (params) => request.post('/api/register',params)