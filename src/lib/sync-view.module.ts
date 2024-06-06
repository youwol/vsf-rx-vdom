/**
 * See [flux-view.childrenAppendOnly](https://platform.youwol.com/api/assets-gateway/raw/package/QHlvdXdvbC9mbHV4LXZpZXc=/latest/dist/docs/functions/childrenFromStore_.html).
 *
 * @module
 */
import { configurationCommon, inputsCommon, moduleCommon } from './common'
import { map } from 'rxjs/operators'
import { Configurations, Modules } from '@youwol/vsf-core'

export const configuration = configurationCommon

export const inputs = inputsCommon

export const module = (fwdParams) => {
    const configInstance = Configurations.extractConfigWith({
        configuration,
        values: fwdParams.configurationInstance,
    })
    return moduleCommon(fwdParams, configInstance, (m, vdomMap) => ({
        policy: 'sync',
        source$: m.inputSlots.input$.preparedMessage$.pipe(
            map((m: Modules.ProcessingMessage) => {
                return m.data
            }),
        ),
        vdomMap: (message) => vdomMap(message, m),
        orderOperator: configInstance.options.orderOperator,
    }))
}
