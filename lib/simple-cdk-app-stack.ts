import * as cdk from '@aws-cdk/core';
import {Bucket, BucketEncryption} from "@aws-cdk/aws-s3";

export class SimpleCdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "MySimpleAppBucket", {
      encryption: BucketEncryption.S3_MANAGED
    });
    new cdk.CfnOutput(this, 'MySimpleAppBucketNameExport', {
      value: bucket.bucketName,
      exportName: "MySimpleAppBucketName"
    })
  }
}
