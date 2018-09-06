# gulpfile is in ./test
cd ./test

# start gulp watch in the background and remember the process ID
gulp watch &
PID=$!

echo "wait 5s..."
sleep 5

# write a file to a watched directory
echo "body{color:red}" > ./input/css/watchtest.scss
echo "wait 5s again ..."
sleep 5

# kill the watch task and remove the source file#
rm -f ./input/css/watchtest.scss
kill $PID
