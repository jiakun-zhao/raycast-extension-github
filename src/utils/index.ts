import { Octokit } from '@octokit/rest'
import { getPreferenceValues } from '@raycast/api'

let octokit: Octokit | undefined

export function getOctokit() {
  return octokit ?? (octokit = new Octokit(getPreferenceValues<ExtensionPreferences>()))
}

export function strDate2Num(strDate: string | null) {
  return new Date(strDate ?? '0000-00-00 00:00:00').getTime()
}
