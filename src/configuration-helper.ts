interface ConfigurationOptions {
    generatedFile: string
    accountSlug: string
    introspectionToken: string
}

export function getConfiguration(opts: ConfigurationOptions) {
    const schemaUrl = `https://data.stackables.io/${opts.accountSlug}?introspection=${opts.introspectionToken}`
    return {
        schema: schemaUrl,
        extensions: {
            codegen: {
                generates: {
                    [opts.generatedFile]: {
                        documents: [
                            {
                                [schemaUrl]: {
                                    loader: 'codegen-stackables-webhooks',
                                },
                            },
                        ],
                        plugins: ['typescript', 'typescript-operations', 'stackables-webhooks'],
                        config: {
                            preResolveTypes: true,
                            onlyOperationTypes: true,
                            fragmentRegistryName: 'StackablesEvents',
                            fragmentRegistryDirective: 'register'
                        }
                    }
                }
            }
        }
    }
}
