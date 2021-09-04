import { getConfiguration } from '../src'

test('Configuration snapshot', () => {
    const config = getConfiguration({
        accountSlug: 'test-account',
        generatedFile: './src/generated/webhooks.ts',
        introspectionToken: 'ab68132b-a320-489b-bfa4-2c938f20784e',
    })

    expect(config).toMatchSnapshot()
})