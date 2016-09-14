package paramour;

import java.io.*;
import java.util.Scanner;
import javax.script.*;

public class Paramour {
  private static Scanner input = new Scanner(System.in);
  private static String JAVA_STRING = "JAVA_STRING = ";
  private static String Paramour = "\n\n";
  private static Scanner ParamourJS;
  private static File from;
  // Obtain a ScriptEngine that supports the JavaScript short name
  public static ScriptEngineManager manager = new ScriptEngineManager();
  public static ScriptEngine engine = manager.getEngineByName("JavaScript");

  public static void main (String [] args) throws ScriptException, FileNotFoundException {
    ParamourJS = new Scanner(new File("Paramour.js"));
  
    for(;ParamourJS.hasNextLine();) {
      Paramour += ParamourJS.nextLine() + '\n';
    } ParamourJS.close();

    // if a list was given, parse it
    if(args.length > 0) {
      for(int x = 0; x < args.length; x++) {
        from = new File(args[x]);
        eval(from);
      }
    }
    // if a list wasn't given, ask for a file
    else {
      System.out.println("Enter your file directory/name: ");
      from = new File(input.nextLine());
      eval(from);
    }

    // done
    System.out.println ("Paramour has compiled the files");
  }

  private static String eval(File from) throws ScriptException, FileNotFoundException {
    Scanner medium = new Scanner(from);
    String to = from.getAbsolutePath().replace(".par", ".par.js");
  
    PrintStream out = new PrintStream(new FileOutputStream(to));
  
    for(;medium.hasNextLine();) {
      JAVA_STRING += '"' + medium.nextLine().replace("\\", "\\\\").replace("\"", "\\\"") + "\\n\" + \n";
    } JAVA_STRING += "''; println(Paramour(JAVA_STRING) + '\n/* Ephellon Dantzler - 2016 */');";
  
    // Redirect the engine's standard output to a StringWriter instance
    StringWriter writer = new StringWriter();
    PrintWriter printer = new PrintWriter(writer, true);
    engine.getContext().setWriter(printer);
  
    // Evaluate the script
    System.out.println("Compiling: " + from.getAbsolutePath() + "\n");
    engine.eval(JAVA_STRING + Paramour);

    // Obtain the string buffer's contents
    String PAR = writer.getBuffer().toString();
    out.print(PAR);
    out.close();
    medium.close();
    return to;
  }
}