/**
 * Module defining an HTML view from the definition of a
 * [Virtual DOM](https://platform.youwol.com/api/assets-gateway/raw/package/QHlvdXdvbC9mbHV4LXZpZXc=/latest/dist/docs/interfaces/VirtualDOM.html).
 *
 * @module
 */
import { inputsCommon, schemaCommonBase } from './common'
import { map } from 'rxjs/operators'
import { Configurations, Modules } from '@youwol/vsf-core'

export const configuration = {
    schema: schemaCommonBase,
}

export const inputs = inputsCommon

export const module = (fwdParams: Modules.ForwardArgs) => {
    type TSchema = typeof configuration.schema
    type TInputs = typeof inputs
    type OutputMapper = Modules.OutputMapperArg<TSchema, TInputs>
    const configInstance = Configurations.extractConfigWith<TSchema>({
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
                return {
                    tag: 'div',
                    children: [
                        {
                            source$: m.inputSlots.input$.preparedMessage$.pipe(
                                map((m: Modules.ProcessingMessage) => {
                                    return m.data
                                }),
                            ),
                            vdomMap: (message) =>
                                configInstance.vdomMap(message, m),
                        },
                    ],
                }
            },
        },
        fwdParams,
    )
}
