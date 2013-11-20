#Contributing to Asimov

We'd love for you to contribute to our source code and to make Asimov even better than it is
today! Here are the guidelines we'd like you to follow:

## Found an Issue?
If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting and issue to our [GitHub Repository][github]. Even better you can submit a Pull Request
with a fix.

**Please see the Submission Guidelines below**.

## Want a Feature?
You can request a new feature by submitting an issue to our [GitHub Repository][github].

## Submission Guidelines

### Submitting an Issue
Before you submit your issue follow the following guidelines:

* Search the archive first, it's likely that your question was already answered.
* A live example demonstrating the issue, will get an answer faster.
* Create one using [Plunker][plunker] or [JSFiddle][jsfiddle].
* If you get help, help others. Good karma rulez!

If your issue appears to be a bug, and hasn't been reported, open a new issue.
Help us to maximize the effort we can spend fixing issues and adding new
features, by not reporting duplicate issues.

## Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**.  But also,
we use the git commit messages to **generate the Asimov change log**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on github as well as in various git tools.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope
The scope could be anything specifying place of the commit change. For example `$location`,
`$browser`, `$compile`, `$rootScope`, `ngHref`, `ngClick`, `ngView`, etc...

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes"
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.


A detailed explanation can be found in this [document][commit-message-format].


## Submitting Your Changes

To create and submit a change:

1. Create and checkout a new branch off the master branch for your changes:

   ```shell
   git checkout -b my-fix-branch master
   ```

2. Create your patch, including appropriate test cases.

3. Commit your changes and create a descriptive commit message (the commit message is used to
   generate release notes, please check out our [commit message conventions](#commit-message-format):

   ```shell
   git commit -a
   ```

4. Push your branch to Github:

   ```shell
   git push origin my-fix-branch
   ```

5. In Github, send a pull request to `asimov-core:master`.

That's it! Thank you for your contribution!

When the patch is reviewed and merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

```shell
# Delete the remote branch on Github:
git push origin :my-fix-branch

# Check out the master branch:
git checkout master

# Delete the local branch:
git branch -D my-fix-branch

# Update your master with the latest upstream version:
git pull --ff upstream master
```


[github]: https://github.com/asimov-core/asimov-core.js
[plunker]: http://plnkr.co/edit
[jsfiddle]: http://jsfiddle.net/
[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
