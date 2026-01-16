# GitHub Actions CI/CD Workflows

This directory contains automated workflows for testing, building, and deploying the AI Tools Platform.

## Available Workflows

### 1. CI Workflow (`ci.yml`)

**Trigger**: Automatically runs on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**What it does**:
1. Sets up Node.js (tests with 18.x and 20.x)
2. Installs dependencies (`npm ci`)
3. Runs TypeScript type checking (`npm run type-check`)
4. Runs ESLint linting (`npm run lint`)
5. Runs test suite (`npm run test`)
6. Uploads coverage reports to Codecov
7. Builds the project (`npm run build`)
8. Archives build artifacts for inspection

**Status checks**: Pull requests will require this workflow to pass before merging.

### 2. Deploy Workflow (`deploy.yml`)

**Trigger**: Automatically runs when CI workflow succeeds on `main` branch

**What it does**:
1. Checks out the code
2. Builds the project
3. Deploys to Netlify using secrets
4. Notifies on PR (if applicable)

**Required secrets**:
- `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
- `NETLIFY_SITE_ID`: Your Netlify site ID

## Setup Instructions

### 1. Configure GitHub Repository Secrets

To enable the deployment workflow, add the following secrets to your GitHub repository:

1. Go to **Settings → Secrets and variables → Actions**
2. Click "New repository secret"
3. Add each secret:

**NETLIFY_AUTH_TOKEN**:
- Get from Netlify: User menu → Account settings → Applications → Personal access tokens
- Create a new token with deploy scope

**NETLIFY_SITE_ID**:
- Get from Netlify: Site settings → General → Site ID

### 2. Enforce CI Checks on Main Branch

To prevent merging failing code:

1. Go to **Settings → Branches**
2. Add rule for `main` branch
3. Require status checks to pass:
   - `test-and-build` (Node 18.x)
   - `test-and-build` (Node 20.x)
4. Require PR reviews: At least 1
5. Require code review from code owners (optional)

### 3. Configure Netlify Connection (Alternative)

If you prefer Netlify's native GitHub integration:

1. Go to Netlify: Site settings → Build & deploy
2. Connect GitHub repository
3. Netlify will auto-build on push

Both approaches can coexist - this gives you redundancy.

## Viewing Workflow Results

1. Go to **Actions** tab in your GitHub repository
2. Select workflow or specific run
3. View logs for each step
4. Download artifacts from successful builds

## Troubleshooting

### Workflow fails with "npm: command not found"
- Node.js setup action may have cached incorrectly
- Clear cache: **Actions → all workflows → Clear all caches**

### Netlify deploy fails
- Verify `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` are set correctly
- Check Netlify site can be deployed manually
- Verify `dist/` directory is created during build

### Tests timeout
- Increase timeout in workflow if needed (default: 360 minutes per job)
- Optimize tests or split into multiple jobs

### Coverage upload fails
- Codecov may be temporarily unavailable
- The workflow continues (fail_ci_if_error: false)
- Check coverage reports in Codecov dashboard later

## Local Development

To test workflows locally before pushing:

```bash
# Install act (requires Docker)
brew install act

# Run specific workflow
act -j test-and-build

# Run all workflows
act
```

## Best Practices

1. **Write tests for all new code** - Workflows enforce 60%+ coverage
2. **Use feature branches** - Create PR from feature branch, CI validates changes
3. **Keep dependencies updated** - Workflows test with latest Node versions
4. **Monitor Codecov reports** - Track coverage trends over time
5. **Squash commits before merge** - Keeps history clean
6. **Review workflow logs** - Understand what CI is checking

## Adding Custom Workflows

To add new workflows:

1. Create new `.yml` file in this directory
2. Follow the workflow syntax: https://docs.github.com/en/actions/quickstart
3. Test locally with `act`
4. Commit and push - GitHub will recognize automatically

## Questions?

- GitHub Actions docs: https://docs.github.com/en/actions
- Netlify docs: https://docs.netlify.com/
- Setup issues: Check workflow logs for detailed error messages
