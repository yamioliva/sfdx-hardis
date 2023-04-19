---
title: Initialize SFDX Project
description: Learn how to initialize a Salesforce DX Project for CI/CD
---
<!-- markdownlint-disable MD013 -->

- Clone locally the [repository that you created in previous step](salesforce-ci-cd-setup-git.md) (or reuse an existing sfdx project repo)

- Create a new git branch named **cicd** under your lower major branch (usually **integration**)

- Run the following command and select options to create a new sfdx-hardis project

`sfdx hardis:project:create` (also available in VsCode in **Operations -> Create new SFDX Project**)

- Open file **manifest/package.xml** and replace the content by the following code

```yaml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <version>56.0</version> <!-- use current latest Salesforce api version -->
</Package>
```

- Update .gitignore file to add the following lines at the end:
  - `hardis-report`
  - `config/user`

- If you are using Gitlab CI
  - If you use sandboxes only (not scratch orgs), open **gitlab-ci-config.yml** at the root of the repository, and set variable **USE_SCRATCH_ORGS** to `"false"`
  - Update or remove [tags](https://docs.gitlab.com/ee/ci/yaml/#tags) properties from **gitlab-ci.yml** so Gitlab CI runners catch the job requests

You can now go to step [Setup CI Authentication](salesforce-ci-cd-setup-auth.md)

