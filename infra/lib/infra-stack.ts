import * as cdk from '@aws-cdk/core';
import * as elasticbeanstalk from '@aws-cdk/aws-elasticbeanstalk';
import * as s3assets from '@aws-cdk/aws-s3-assets';
import { envVars } from './config';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Upload Zip file to S3
      const ZipFile = new s3assets.Asset(this, 'PythonDockerAppZip', {
      path:`../app/Dockerrun.aws.json.zip`
    });
    
    const appName = 'PythonFlaskDocker';
    const app = new elasticbeanstalk.CfnApplication(this, 'Application', {
        applicationName: appName,
    });
    
    const optionSettingProperties: elasticbeanstalk.CfnEnvironment.OptionSettingProperty[] = [
      {
          namespace: 'aws:autoscaling:launchconfiguration',
          optionName: 'InstanceType',
          value: 't2.micro',
      },
      {
          namespace: 'aws:autoscaling:launchconfiguration',
          optionName: 'IamInstanceProfile',
          value: 'aws-elasticbeanstalk-ec2-role',
      },
      {
        // none – Amazon Linux AM and Docker w/DC only
        namespace: 'aws:elasticbeanstalk:environment:proxy',
        optionName: 'ProxyServer',
        value: 'none'
      }
    ];

    const appVersion = new elasticbeanstalk.CfnApplicationVersion(this, 'AppVersion', {
      applicationName: appName,
      sourceBundle: {
          s3Bucket: ZipFile.s3BucketName,
          s3Key: ZipFile.s3ObjectKey,
      },
    });

    const EBEnv = new elasticbeanstalk.CfnEnvironment(this, 'Environment', {
      environmentName: 'PythonFlaskEnv',
      applicationName: app.applicationName || appName,
      solutionStackName: '64bit Amazon Linux 2 v3.2.5 running Docker',
      optionSettings: optionSettingProperties,

    });

  appVersion.addDependsOn(app);
  }

}

