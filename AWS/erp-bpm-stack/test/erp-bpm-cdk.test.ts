import * as cdk from 'aws-cdk-lib';
import * as ErpBpmCdk from '../lib/erp-bpm-cdk-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ErpBpmCdk.ErpBpmCdkStack(app, 'MyTestStack');
    // THEN
    const actual = app.synth().getStackArtifact(stack.artifactId).template;
    expect(actual.Resources ?? {}).toEqual({});
});
