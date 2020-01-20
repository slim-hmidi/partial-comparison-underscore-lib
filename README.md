# partial-comparison-underscore-lib
This is a small application which allows to compare the execution time using a manual partial function and the partial function provided by underscore library in order to sum a list of elements for a given array.
In this app, we generate some random data and store them in files.txt locally, then we parsed the data and execute the sum function for each file and calculate the execution time for both functions (the partial function provided by underscore and the manual partial function that we created ).
The execution time is displayed in the stdout.

To test this app, just download the zip folder or clone it using:
```
git clone git@github.com:slim-hmidi/partial-comparison-underscore-lib.git

```
Then:
```
$ cd ./partial-comparison-underscore-lib

```
Install the packages:
```
npm install

```

Launch the server using:
```
npm start

```
We write some unit tests using jest, if you want to run them:

```
npm test

```