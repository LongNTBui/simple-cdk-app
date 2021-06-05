import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SimpleCdkApp from '../lib/simple-cdk-app-stack';
import "@aws-cdk/assert/jest";

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SimpleCdkApp.SimpleCdkAppStack(app, 'MySimpleAppBucketNameExport');
    // THEN
    expectCDK(stack).to(matchTemplate({
        "Resources": {
            "MySimpleAppBucket6B59014A": {
                "Type": "AWS::S3::Bucket",
                "Properties": {
                    "BucketEncryption": {
                        "ServerSideEncryptionConfiguration": [
                            {
                                "ServerSideEncryptionByDefault": {
                                    "SSEAlgorithm": "AES256"
                                }
                            }
                        ]
                    }
                },
                "UpdateReplacePolicy": "Retain",
                "DeletionPolicy": "Retain"
            }
        },
        "Outputs": {
            "MySimpleAppBucketNameExport": {
                "Value": {
                    "Ref": "MySimpleAppBucket6B59014A"
                },
                "Export": {
                    "Name": "MySimpleAppBucketName"
                }
            }
        }
    }, MatchStyle.EXACT))
});

test("Stack create a S3 bucket", () => {
    // ARRANGE
    const app = new cdk.App();
    // ACT
    const stack = new SimpleCdkApp.SimpleCdkAppStack(app, "MyTestStack")
    // ASSERT
    expect(stack).toHaveResource('AWS::S3::Bucket');
})
