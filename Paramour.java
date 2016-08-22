package paramour;

//ScriptDemo5.java

import java.io.*;
import java.util.Scanner;
import javax.script.*;

public class Paramour {
  private static Scanner input = new Scanner(System.in);
  private static String JAVA_STRING = "JAVA_STRING = ";
  private static String Paramour = "\n\n";
  
  public static void main (String [] args) throws ScriptException, FileNotFoundException {
   // pre-compile the file
   System.out.println("Enter your file directory/name: ");
   File f = new File(input.nextLine());
   Scanner F = new Scanner(new File("Paramour.js"));
   System.out.println("Compiling: " + f.getAbsolutePath() + "\n");

   Scanner file = new Scanner(f);
   String newName = f.getAbsolutePath().replace(".par", ".par.js");

   PrintStream out = new PrintStream(new FileOutputStream( newName ));

   for(;file.hasNextLine();) {
     JAVA_STRING += '"' + file.nextLine().replace("\\", "\\\\").replace("\"", "\\\"") + "\\n\" + \n";
   } JAVA_STRING += "\"\"";

   for(;F.hasNextLine();) {
     Paramour += F.nextLine() + '\n';
   } F.close();

   // Create a ScriptEngineManager that discovers all script engine
   // factories (and their associated script engines) that are visible to
   // the current thread's class loader
   ScriptEngineManager manager = new ScriptEngineManager();

   // Obtain a ScriptEngine that supports the JavaScript short name
   ScriptEngine engine = manager.getEngineByName("JavaScript");

   // Redirect the engine's standard output to a StringWriter instance
   StringWriter writer = new StringWriter();
   PrintWriter printer = new PrintWriter(writer, true);
   engine.getContext().setWriter(printer);

   // Evaluate a script
   engine.eval(JAVA_STRING + Paramour);

   // Obtain the string buffer's contents
   String PAR = writer.getBuffer().toString();
   out.print(PAR);
   out.close();
   file.close();

   // done
   System.out.println ("Paramour has compiled \"" + f.getName() + "\"\nA file named \"" + newName +"\" has been made");
  }
}