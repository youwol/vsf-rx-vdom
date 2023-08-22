/**
 * See [flux-view.childrenAppendOnly](https://platform.youwol.com/api/assets-gateway/raw/package/QHlvdXdvbC9mbHV4LXZpZXc=/latest/dist/docs/functions/childrenAppendOnly_.html).
 *
 * @module
 */
import { childrenAppendOnly$ } from '@youwol/flux-view'
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
    return moduleCommon(fwdParams, configInstance, (m, vDomMap) =>
        childrenAppendOnly$(
            m.inputSlots.input$.preparedMessage$.pipe(map((m) => [m])),
            (message: Modules.ProcessingMessage) => vDomMap(message.data, m),
            {
                orderOperator: configInstance.options.orderOperator,
            },
        ),
    )
}
