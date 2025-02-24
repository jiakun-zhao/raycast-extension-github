import { Octokit } from '@octokit/rest'
import { getPreferenceValues, LocalStorage } from '@raycast/api'
import fetch from 'node-fetch'
import * as functions from './functions'

type Functions = typeof functions
type Key = keyof Functions
type Value<T extends Key> = Promise<Awaited<ReturnType<Functions[T]>>>

async function fetchFromGitHub(key: Key) {
  const { auth } = getPreferenceValues<ExtensionPreferences>()
  const octokit = new Octokit({ auth, request: { fetch } })
  return await functions[key](octokit) as unknown
}

export async function get<T extends Key>(key: T): Value<T> {
  const value = await LocalStorage.getItem<string>(`github-${key}`)
  return value ? JSON.parse(value) : []
}

export async function set(key: Key) {
  const value = await fetchFromGitHub(key)
  await LocalStorage.setItem(`github-${key}`, JSON.stringify(value))
}
