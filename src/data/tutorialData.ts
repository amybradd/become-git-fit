import { 
  GitCommit,
  GitBranch,
  GitMerge,
  GitFork,
  RefreshCcw,
  Upload,
  Download,
  History,
  Search,
  Tag,
  List,
  Undo,
  Eye,
  Trash
} from 'lucide-react';

const tutorialData = [
  {
    id: 1,
    title: 'Getting Started with Git',
    description: 'Learn the basics of Git and version control.',
    commands: [
      {
        name: 'Git Init',
        description: 'Initialize a new Git repository in your project folder. This creates a hidden .git directory that stores all the version history.',
        syntax: 'git init',
        icon: GitCommit,
        example: 'cd my-project\ngit init\n# Initialized empty Git repository in /path/to/my-project/.git/',
        visual: 'init'
      },
      {
        name: 'Git Status',
        description: 'Check the status of your working directory, showing which files are tracked, modified, or untracked.',
        syntax: 'git status',
        icon: GitCommit,
        example: 'git status\n# On branch main\n# No commits yet\n# Untracked files:\n#   (use "git add <file>..." to include in what will be committed)\n#         index.html\n#         style.css',
        visual: 'status'
      },
    ],
  },
  {
    id: 2,
    title: 'Basic Git Commands',
    description: 'Essential commands for your daily workflow.',
    commands: [
      {
        name: 'Git Add',
        description: 'Stage changes for commit. This moves files from your working directory to the staging area, preparing them to be included in the next commit.',
        syntax: 'git add <filename>\ngit add .',
        icon: GitCommit,
        example: 'git add index.html\ngit add .\n# All changes staged for commit',
        visual: 'add'
      },
      {
        name: 'Git Commit',
        description: 'Record your staged changes to the repository history with a descriptive message explaining what changes were made and why.',
        syntax: 'git commit -m "Your commit message"',
        icon: GitCommit,
        example: 'git commit -m "Add navigation bar to homepage"\n# [main 5d7e6f3] Add navigation bar to homepage\n# 1 file changed, 15 insertions(+), 2 deletions(-)',
        visual: 'commit'
      },
    ],
  },
  {
    id: 3,
    title: 'Branching and Merging',
    description: 'Learn how to work with branches in Git.',
    commands: [
      {
        name: 'Git Branch',
        description: 'Create a new branch or list all branches. Branches allow you to develop features, fix bugs, or experiment with new ideas in isolation from your main codebase.',
        syntax: 'git branch <branch-name>\ngit branch',
        icon: GitBranch,
        example: 'git branch feature-login\ngit branch\n# * main\n#   feature-login',
        visual: 'branch'
      },
      {
        name: 'Git Checkout',
        description: 'Switch between branches or restore working tree files. This changes which branch you\'re working on in your local directory.',
        syntax: 'git checkout <branch-name>\ngit checkout -b <new-branch>',
        icon: GitFork,
        example: 'git checkout feature-login\n# Switched to branch \'feature-login\'\n\ngit checkout -b feature-signup\n# Switched to a new branch \'feature-signup\'',
        visual: 'checkout'
      },
      {
        name: 'Git Merge',
        description: 'Incorporate changes from one branch into another. This combines the history and changes from the specified branch into your current branch.',
        syntax: 'git merge <branch-name>',
        icon: GitMerge,
        example: 'git checkout main\n# Switched to branch \'main\'\n\ngit merge feature-login\n# Merge made by the \'recursive\' strategy.\n# index.html | 25 ++++++++++++++++++++-----\n# 1 file changed, 20 insertions(+), 5 deletions(-)',
        visual: 'merge'
      },
    ],
  },
  {
    id: 4,
    title: 'Remote Repository Operations',
    description: 'Learn how to work with remote repositories like GitHub, GitLab, or Bitbucket.',
    commands: [
      {
        name: 'Git Remote',
        description: 'Manage remote repositories. Add, view, or remove connections to other repositories.',
        syntax: 'git remote add <name> <url>\ngit remote -v\ngit remote remove <name>',
        icon: RefreshCcw,
        example: 'git remote add origin https://github.com/username/repo.git\ngit remote -v\n# origin  https://github.com/username/repo.git (fetch)\n# origin  https://github.com/username/repo.git (push)',
        visual: 'remote'
      },
      {
        name: 'Git Push',
        description: 'Send your local branch commits to the remote repository. This updates the remote to match your local branch history.',
        syntax: 'git push <remote> <branch>\ngit push origin main',
        icon: Upload,
        example: 'git push origin main\n# Enumerating objects: 5, done.\n# Counting objects: 100% (5/5), done.\n# Writing objects: 100% (3/3), 285 bytes | 285.00 KiB/s, done.\n# Total 3 (delta 0), reused 0 (delta 0), pack-reused 0\n# To https://github.com/username/repo.git\n#    a1b2c3d..e4f5g6h  main -> main',
        visual: 'push'
      },
      {
        name: 'Git Pull',
        description: 'Fetch changes from a remote repository and merge them into your current branch. Combines git fetch and git merge in one command.',
        syntax: 'git pull <remote> <branch>',
        icon: Download,
        example: 'git pull origin main\n# From https://github.com/username/repo\n# * branch            main     -> FETCH_HEAD\n# Updating a1b2c3d..e4f5g6h\n# Fast-forward\n# index.js | 4 ++--\n# 1 file changed, 2 insertions(+), 2 deletions(-)',
        visual: 'pull'
      },
    ],
  },
  {
    id: 5,
    title: 'Inspecting & Comparing',
    description: 'Explore commands for examining repository history and changes.',
    commands: [
      {
        name: 'Git Log',
        description: 'View the commit history of the repository. See who made changes, when they were made, and what was changed.',
        syntax: 'git log\ngit log --oneline\ngit log --graph',
        icon: History,
        example: 'git log --oneline\n# e4f5g6h Add search feature\n# a1b2c3d Fix navigation bug\n# 7h8i9j0 Initial commit',
        visual: 'log'
      },
      {
        name: 'Git Diff',
        description: 'Show differences between commits, commit and working tree, etc. Helps you see exactly what was changed and where.',
        syntax: 'git diff\ngit diff <commit> <commit>\ngit diff --staged',
        icon: Search,
        example: 'git diff\n# diff --git a/index.html b/index.html\n# index 1234567..abcdefg 100644\n# --- a/index.html\n# +++ b/index.html\n# @@ -10,7 +10,7 @@\n# -    <h1>Hello World</h1>\n# +    <h1>Hello Git</h1>',
        visual: 'diff'
      },
    ],
  },
  {
    id: 6,
    title: 'Advanced Git Operations',
    description: 'Master powerful Git features for professional version control.',
    commands: [
      {
        name: 'Git Tag',
        description: 'Create, list, delete or verify tags in your Git repository. Tags are used to mark specific points in history, typically for release versions.',
        syntax: 'git tag <tagname>\ngit tag -a <tagname> -m "message"\ngit tag -l',
        icon: Tag,
        example: 'git tag -a v1.0 -m "Release version 1.0"\ngit tag\n# v1.0',
        visual: 'tag'
      },
      {
        name: 'Git Stash',
        description: 'Temporarily save changes that you don\'t want to commit immediately. Useful when you need to switch branches but aren\'t ready to commit your work.',
        syntax: 'git stash\ngit stash list\ngit stash apply\ngit stash pop',
        icon: List,
        example: 'git stash\n# Saved working directory and index state WIP on main: a1b2c3d Add login page\n\ngit stash list\n# stash@{0}: WIP on main: a1b2c3d Add login page',
        visual: 'stash'
      },
      {
        name: 'Git Reset',
        description: 'Reset current HEAD to the specified state. Can be used to undo changes or move HEAD to a different commit.',
        syntax: 'git reset <commit>\ngit reset --soft <commit>\ngit reset --hard <commit>',
        icon: Undo,
        example: 'git reset --soft HEAD~1\n# Moves HEAD back one commit, keeping changes staged',
        visual: 'reset'
      },
      {
        name: 'Git Revert',
        description: 'Create a new commit that undoes all of the changes made in a specified commit, then apply it to the current branch.',
        syntax: 'git revert <commit>',
        icon: Undo,
        example: 'git revert a1b2c3d\n# [main e4f5g6h] Revert "Add login page"\n# 1 file changed, 5 deletions(-)',
        visual: 'revert'
      },
    ],
  },
  {
    id: 7,
    title: 'Git Maintenance & Cleanup',
    description: 'Keep your repository clean and efficient with these maintenance commands.',
    commands: [
      {
        name: 'Git Clean',
        description: 'Remove untracked files from the working tree. Useful for cleaning up build artifacts or generated files.',
        syntax: 'git clean -n\ngit clean -f',
        icon: Trash,
        example: 'git clean -n\n# Would remove build/\n# Would remove temp.txt\n\ngit clean -f\n# Removing build/\n# Removing temp.txt',
        visual: 'clean'
      },
      {
        name: 'Git Blame',
        description: 'Show what revision and author last modified each line of a file. Helps identify who introduced specific code.',
        syntax: 'git blame <file>',
        icon: Eye,
        example: 'git blame index.html\n# a1b2c3d (John Doe 2023-01-15) 1) <!DOCTYPE html>\n# e4f5g6h (Jane Smith 2023-02-10) 2) <html>\n# a1b2c3d (John Doe 2023-01-15) 3) <head>',
        visual: 'blame'
      },
    ],
  },
];

export default tutorialData;
