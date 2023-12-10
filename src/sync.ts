import { Toast, showToast, updateCommandMetadata } from '@raycast/api'
import { set } from './utils'

export default async function Command() {
  try {
    await showToast({ title: 'Fetch followed...', style: Toast.Style.Animated })
    await set('followed')
    await showToast({ title: 'Fetch repos...', style: Toast.Style.Animated })
    await set('repos')
    await showToast({ title: 'Fetch stars...', style: Toast.Style.Animated })
    await set('stars')
    await showToast({ title: 'Success.', style: Toast.Style.Success })
    await updateCommandMetadata({ subtitle: `Last update: ${new Date().toLocaleString()}` })
  } catch {
    await showToast({ title: 'Fail.', style: Toast.Style.Failure })
  }
}
