---
title: Salesforce project for 2GP packages (managed or unlocked)
description: Learn how setup a CI/CD pipeline to build 2GP packages (managed packages or unlocked packages)
---
<!-- markdownlint-disable MD013 -->

- [Introduction](#introduction)
- [Pre-requisites](#pre-requisites)
- [Setup steps](#setup-steps)

___

## Introduction

sfdx-hardis can be used to handle client projects, but also to create ISV applications to be released on Salesforce AppExchange, or just distributed via installation links !

The steps are almost the same than for client projects, with some specificities that are described in the following documentation.

## Pre-requisites

- Training with Git and Salesforce DX
  - _If you don't have experience with them, here are links to learning resources_
    - [Git Tuto](https://learngitbranching.js.org/)
    - [SFDX Trailmix](https://trailhead.salesforce.com/fr/users/manueljohnson/trailmixes/sfdx)
- [Install necessary applications on your computer](salesforce-ci-cd-use-install.md)
- Access to a Git server (Gitlab, GitHub, Azure...) with CI/CD server minutes
- Access to a Salesforce [Environment Hub Org](https://developer.salesforce.com/docs/atlas.en-us.packagingGuide.meta/packagingGuide/environment_hub_intro.htm) (or at least a Dev Hub, but they are usually the same org)

## Setup steps

### Git repository and branches

Read the following documentation, to build a simple branches tree

- **main** (the branch that will contain the sources corresponding to the production package(s), and that must be protected)
  - **init-ci** (your temporary branch to initialize the project)

[Create git repository and configure branches](salesforce-ci-cd-setup-git.md)

### Activate DevHub

Apply the following documentation: [Activate DevHub](salesforce-ci-cd-setup-activate-org.md)

### Initialize Project

- Initialize the project following documentation [Initialize sfdx project](salesforce-ci-cd-setup-init-project.md)
  - Scratch orgs only
  - Developement branch: `main`
- Rename force-app folder into your package-_yournamespace_
- Update sfdx-project.json to rename force-app into package-_yournamespace_ ([namespace info](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_dev2gp_plan_namespaces.htm))
- Update gitlab-ci.yml (or equivalent)
  - Remove steps check_deploy_to_target_branch_org, check_deploy_to_current_branch_org and deploy_to_org

### Configure DevHub Auth

Configure **only DevHub CI authentication**, following this documentation: [Configure authentication](salesforce-ci-cd-setup-auth.md)

### Configure Integrations

Configure the integrations you need.

- [Integrations](salesforce-ci-cd-setup-integrations-home.md) _(optional)_
  - [Configure Microsoft Teams notifications](salesforce-ci-cd-setup-integration-ms-teams.md) _(optional)_
  - [Configure Gitlab to receive deployment results on on Merge Requests](salesforce-ci-cd-setup-integration-gitlab.md) _(optional)_
  - [Configure Azure Pipelines to receive deployment results on on Pull Requests](salesforce-ci-cd-setup-integration-azure.md) _(optional)_

### Create your first scratch org

Use menu **Work on a task (advanced) -> Create scratch org (force new)** to check that the scratch org creation is working.

### Create your first merge request

Once all jobs are green, you can merge !


