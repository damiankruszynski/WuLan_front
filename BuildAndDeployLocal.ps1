chcp 1250
mvn clean install
if( Test-Path "target/WuLAN.war" -PathType Leaf){
  Copy-Item "target/WuLAN.war" -Destination "c:\Tomcat\webapps\"
}
else{
  Write-Host "Co? nie tak z kompilacj?"
  Pause
  EXIT
}
