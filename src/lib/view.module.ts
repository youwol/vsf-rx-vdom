/**
 * Module defining an HTML view from the definition of a
 * [Virtual DOM](https://platform.youwol.com/api/assets-gateway/raw/package/QHlvdXdvbC9mbHV4LXZpZXc=/latest/dist/docs/interfaces/VirtualDOM.html).
 *
 * @module
 */
import { inputsCommon, schemaCommonBase } from './common'
import { child$ } from '@youwol/flux-view'
import { map } from 'rxjs/operators'
import { extractConfigWith, Modules } from '@youwol/vsf-core'

export const configuration = {
    schema: schemaCommonBase,
}

export const inputs = inputsCommon

export const module = (fwdParams) => {
    type OutputMapper = Modules.OutputMapperArg<
        typeof configuration.schema,
        typeof inputs
    >
    const configInstance = extractConfigWith({
        configuration,
        values: fwdParams.configurationInstance,
    })
    return new Modules.Implementation(
        {
            configuration,
            inputs,
            outputs: (args: OutputMapper) => {
                return configInstance.outputs(args.state)
            },
            state: configInstance.state,
            html: (m) => {
                return child$(
                    m.inputSlots.input$.preparedMessage$.pipe(
                        map((m: Modules.ProcessingMessage) => {
                            return m.data
                        }),
                    ),
                    (message) => configInstance.vDomMap(message, m),
                )
            },
        },
        fwdParams,
    )
}
