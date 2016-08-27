:: Ephellon Dantzler - Paramour Java Compiler 2015
@ECHO off
@SET next=a 

:mas
  @IF [%1]==[] GOTO media
  :1
    @java -jar paramour.jar %1
    @SHIFT
    @GOTO mas

:media
  @CHOICE /M "Would you like to compile %next%Paramour file?"
  @SET next=another 
  @GOTO %ERRORLEVEL%

:2
@EXIT