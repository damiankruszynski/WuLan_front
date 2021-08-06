chcp 1250
mvn clean install
if( Test-Path "target/WuLAN.war" -PathType Leaf){
  Copy-Item "target/WuLAN.war" -Destination "c:\Tomcat\webapps\"
  start c:\Tomcat\bin\shutdown.bat
  start c:\Tomcat\bin\startup.bat
}
else{
  Write-Host "Coœ nie tak z kompilacj¹"
  Pause
  EXIT
}
