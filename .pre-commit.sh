echo "********************************"
echo "*  PRETTIERJS pre-commit-hook  *"
echo "********************************"

git diff -- name-only HEAD | grep ".*\.js" | xargs prettier — write