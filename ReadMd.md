i cloned the movies time repo, will perform pull request by following these steps----->
[200~Fork the original repository on GitHub by clicking the "Fork" button in the top-right corner. This creates a copy of the original repo under your GitHub account.

Clone your forked repository to your local machine using the command:
git clone https://github.com/YourUsername/repo-name.git

Navigate into the cloned directory:
cd repo-name

Add the original repository as a remote source named "upstream":
git remote add upstream https://github.com/OriginalOwner/repo-name.git

Create a new branch for your changes to keep your main branch clean:
git checkout -b branch-name
(Example: git checkout -b fix-typo)

Make the necessary changes in your code using any text editor (VSCode, Notepad++, etc.)

Stage the changes you made:
git add .

Commit the changes with a clear and meaningful message:
git commit -m "Your descriptive commit message here"

Push your new branch to your forked GitHub repository:
git push origin branch-name

Go to your forked repository on GitHub. You’ll see an option to “Compare & pull request” — click on it.

Fill in the Pull Request form:

Add a clear title for your PR.

Provide a brief description of what you changed and why.

Then click “Create pull request.”
