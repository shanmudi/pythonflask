export const envVars = {
    REGION: 'ca-central-1',
    APP_NAME: process.env.APP_NAME || 'develop',
    REPO_OWNER: process.env.REPO_OWNER,
    REPO_NAME: process.env.REPO_NAME,
    APP_STAGE_NAME: process.env.APP_STAGE_NAME || 'develop',
  };