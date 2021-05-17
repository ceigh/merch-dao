import { $fetch } from 'ohmyfetch/node'
import admin from './admin'
import type { Plugin } from '@nuxt/types'
import type { FetchOptions } from 'ohmyfetch'

let baseURL: string
// TODO: add auth header
export function createCall (prefix = '') {
  interface CallArgs {
    fn: string
    method?: FetchOptions['method']
    body?: FetchOptions['body']
    // used in end of url
    // (https://a.b/c/d) d is param
    param?: string
    // used as query params
    // (https://a.b/c?d=e) { d: 'e' } is query
    query?: FetchOptions['params']
  }

  return async <T = void>(args: CallArgs) => {
    const { fn, body, param, query } = args
    const method = args.method ?? 'POST'
    const path = [prefix, fn, param].join('/')

    try {
      return await $fetch<T>(path, {
        baseURL, method, body, params: query
      })
    } catch (e) { throw new Error(e.data) }
  }
}

const api = {
  admin
}

type Api = typeof api
declare module 'vue/types/vue' {
  interface Vue { $api: Api }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions { $api: typeof api }
  interface Context { $api: Api }
}
declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> { $api: Api }
}

const apiPlugin: Plugin = ({ $config }, inject) => {
  baseURL = $config.apiEndpoint
  inject('api', api)
}
export default apiPlugin
