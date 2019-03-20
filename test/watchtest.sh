# gulpfile is in ./test
cd ./test

# start gulp watch in the background and remember the process ID
gulp watch &
PID=$!

echo "wait 3s..."
sleep 3

# write a file to a watched directory
echo "body{color:red}" > ./input/css/watchtest.scss
echo "wait 3s again ..."
sleep 3

# kill the watch task and remove the source file#
rm -f ./input/css/watchtest.scss
kill $PID
