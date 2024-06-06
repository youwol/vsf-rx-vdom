/**
 * See [flux-view.childrenAppendOnly](https://platform.youwol.com/api/assets-gateway/raw/package/QHlvdXdvbC9mbHV4LXZpZXc=/latest/dist/docs/functions/childrenAppendOnly_.html).
 *
 * @module
 */
import { map } from 'rxjs/operators'
import { configurationCommon, inputsCommon, moduleCommon } from './common'
import { Configurations, Modules } from '@youwol/vsf-core'

export const configuration = configurationCommon

export const inputs = inputsCommon

export const module = (fwdParams) => {
    const configInstance = Configurations.extractConfigWith({
        configuration,
        values: fwdParams.configurationInstance,
    })
    return moduleCommon(fwdParams, configInstance, (m, vdomMap) => ({
        policy: 'append',
        source$: m.inputSlots.input$.preparedMessage$.pipe(map((m) => [m])),
        vdomMap: (message: Modules.ProcessingMessage) =>
            vdomMap(message.data, m),
        orderOperator: configInstance.options.orderOperator,
    }))
}
