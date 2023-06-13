<?php
  $host = "localhost";
        $dbUserName = "yfsqjdve";
        $dbPwd = "J[B3n5+r8Lbh5H";
        $dbName = "yfsqjdve_cstmr";

// create connection..
$conn = new mysqli($host, $dbUserName, $dbPwd, $dbName);

// getting data from acc table..
$result = mysqli_query($conn, "SELECT * FROM accepted");
$theData = array();
while($row = mysqli_fetch_assoc($result)) {
    $theData[] = $row;
}
echo json_encode($theData);
// storing data in array..

// returning all data into JSON format..


