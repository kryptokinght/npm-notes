# NPM

What the different properties inside the **package.json** mean - [package.json](https://docs.npmjs.com/files/package.json)

## Common npm Commands:
* `npm <command_name> -h` : Gives help info about the `install` command, Eg: `npm install -h`
* `npm help <command_name>` : Same as above, but with more details, Eg: `npm help install`
* `npm help-search <keyword>` : Gives a list of all the comamnds related with the keyowrd, for example the commands  related to the keyword 'remove'. Try `npm help-search remove` .
* `npm set inti-author-name 'Minanshu Singh'` : Set it common for all package.json
* `npm set inti-license 'MIT '` : Set it common for all package.json
* `git config delete inti-author-name` : delete the value set by the above command
* `npm list --depth 1` : show the dependency tree only one level deep
* `npm list --global true --depth 0` : show the global dependency tree only zero level deep
* `npm list --depth 0 --parsable true` : gives output in parsable format
* `npm list --depth 0 --json true` : gives output in JSON format
* `npm list --depth 0 --long true` : gives details of each dependecy
* `npm list --depth 0 --dev true` : gives list of only dev dependecies
* `npm list --depth 0 --prod true` : gives list of only production dependecies
* `npm repo <package_name>` : Opens up the package github repo in your browser
* `--silent` : Use this falg to remove errors and warnings from output

### Installing, Uninstalling, Updating packages

**Install**
* `npm i npm@latest -g` : Install the latest version of npm(updating npm)
* `npm i <package_name>@1.8.0` : Install a specific version of the package
* `npm i underscore@1.8.0 --save --save-exact` : Install a specific version of the package and do not add the ^ in package.json, which means later the package will not be updated, only exact version required.

**Uninstall**
* `npm uninstall <package_name>` : Only removes it from the node_modules folders, entry remains in package.json
* `npm uninstall <package_name> --save` : Uninstall the package and Remove it from the package.json for your project
* `npm un <package_name> -g` : Uninstall a global package(un is shot for uninstall)
* `npm prune` : prunes out extraneous packages, those that are not mentioned in package.json
* `npm prune --production` : Used when deploying file to production, removes all dev dependencies

**Update**
* `npm outdated --global true` : Show global packages that are outdated
* `npm update --global true` : Update global packages that are outdated

### npm packages created by you or your org
* `npm version patch` : increments your patch version (1.2.x) and automatically amkes a commit
* `npm version major` : increments your major version (x.0.0) and automatically makes a commit  
* `npm version minor` : increments your minor version (1.x.0) and automatically makes a commit
* [**NOTE** : After updating the tag using npm, you have to perform the following two commands to first push your tag to your github repo and second to update your file changes `git push --tags`, `git push`]  
* `npm publish` : Publish the new version of your packages to npm registry. It is recommended to update your package version before publishing it.

### Publishing an npm package to npmjs.com

* [Contributing packages to the registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) - the official guide to publishing packages to the npm registry.

## Semantic versioning

[Official npm doc on semantic versioning(semver).](https://www.npmjs.com/package/semver#versions)

* `^` : latest (minor or patch) version of that major release. Eg: `^1.3.0` gives `1.8.5` if 1.8.5 is the latest in 1.x.x releases
* `~` : latest patch version of that minor release. Eg: `~1.3.0` gives `1.3.9` if 1.3.9 is latest in 1.3.x releases 



