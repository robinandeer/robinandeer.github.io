# robinandeer.github.io
Personal portfolio

## Deploying
To deploy, just run the following again:

```console
yarn build
git checkout master
\cp -r ./dist/ ./
git commit -am "Update site"
git push
```

## Using a custom domain name
Create a file `source/CNAME` containing your domain name:
