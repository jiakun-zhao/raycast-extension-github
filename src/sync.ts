import { environment, LaunchType, showToast, Toast, updateCommandMetadata } from '@raycast/api'
import { set } from './utils'

export default async function Command() {
  const notBackground = environment.launchType !== LaunchType.Background
  try {
    notBackground && await showToast({ title: 'Fetch followed...', style: Toast.Style.Animated })
    await set('followed')
    notBackground && await showToast({ title: 'Fetch repos...', style: Toast.Style.Animated })
    await set('repos')
    notBackground && await showToast({ title: 'Fetch stars...', style: Toast.Style.Animated })
    await set('stars')
    notBackground && await showToast({ title: 'Success.', style: Toast.Style.Success })
    await updateCommandMetadata({ subtitle: `Last update: ${new Date().toLocaleString()}` })
  } catch {
    notBackground && await showToast({ title: 'Fail.', style: Toast.Style.Failure })
  }
}
