/**
 * See [flux-view.childrenAppendOnly](https://platform.youwol.com/api/assets-gateway/raw/package/QHlvdXdvbC9mbHV4LXZpZXc=/latest/dist/docs/functions/childrenFromStore_.html).
 *
 * @module
 */
import { configurationCommon, inputsCommon, moduleCommon } from './common'
import { childrenFromStore$ } from '@youwol/flux-view'
import { map } from 'rxjs/operators'
import { Configurations, Modules } from '@youwol/vsf-core'

export const configuration = configurationCommon

export const inputs = inputsCommon

export const module = (fwdParams) => {
    const configInstance = Configurations.extractConfigWith({
        configuration,
        values: fwdParams.configurationInstance,
    })
    return moduleCommon(fwdParams, configInstance, (m, vDomMap) =>
        childrenFromStore$(
            m.inputSlots.input$.preparedMessage$.pipe(
                map((m: Modules.ProcessingMessage) => {
                    return m.data
                }),
            ),
            (message) => vDomMap(message, m),
            {
                orderOperator: configInstance.options.orderOperator,
            },
        ),
    )
}
