### Pesky .orig files
In git after you have had to fix merge conflicts, you may end up with a bunch
of untracked files in your repository. These files are nice when you need to
go back to the original version of the conflicted file, but most of the time
they just clutter my repository and I have to go in and delete them manually.

I was doing this enough that it was worth figuring out the command to do this
automatically. I did not want to recursively search through each folder
since there are a lot of directories in the repository and it took a little
while. I figured the best approach was to just use `git status` to tell me
which files were untracked, and then selectively remove them. The powershell
command I came up with is the following:
```powershell
C:\repos\my-repo [branch-a +0 ~2 -0 | +33 ~0 -0 !]> git status | %{$_.trim().replace("/","\")} | sls -Pattern ".*\.orig" | %{rm "C:\repos\my-repo\$($_)"}
```
Kind of a lot but breaking it down should make it more clear. First, git status
will output something like the following:
```
C:\repos\my-repo [branch-a +0 ~2 -0 | +33 ~0 -0 !]> git status
On branch branch-a
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   items.csv
        modified:   template.xlsx

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        items.csv.orig
        ...
```
We then pipe this output into the `%{$_ ...}` which is short for doing a for-each loop
in Powershell and the `$_` is a reference to each item that is looped. In this loop,
we then trim any whitespace on each line (represented by `$_`) and replace the unix style 
separator with the backslash that is used in Windows paths.

Next we pipe the output into the `sls` command, which is an alias for the `Select-String`
command. This will match each line against the supplied `-Pattern` argument, and either
output it if the input line matches, or ignore it. In this case our pattern will match
any line that ends in `.orig`.

Last we pipe any lines that match our pattern and then format them into the full
path to the file. We use another for-each loop to remove each of these files.

### Summary
I am hoping this will save me some time rather than manually deleting the files. There
may be an easier way but a quick search online did not yield much results.