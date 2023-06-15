#  Hello Word Jira Plugin Template with React and Typescript.

### Description 

This plugin allows you to implement the React and Typescript in your Jira plugin.

### Pre-requisites
- Node.js 16.x
- pnpm

### Most used commands

Run Jira in debug mode with your plugin installed.
```bash
atlas-debug
```
Run Jira with your plugin installed.
```bash
atlas-run
```
Compile and package the plugin into a JAR file that can be installed on a Jira instance. If running atlas-run or atlas-debug, the plugin will be automatically updated.
```bash
atlas-package
```
When using atlas-run or atlas-debug, this command will allow you to have hot-reload on the frontend modules.
```bash
pnpm watch
```

---
### Atlassian Plugin SDK

Here are the SDK commands you'll use immediately:
Full documentation is always available at [here](https://developer.atlassian.com/server/framework/atlassian-sdk):

Other useful commands:

Remove files from the project directory that were generated during the build.
```bash
atlas-clean
```
Print description for all commands in the SDK
```bash
atlas-help
```