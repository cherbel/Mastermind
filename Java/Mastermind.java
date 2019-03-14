import java.io.Console;
import java.util.Arrays;
import java.io.IOException;
import java.util.Random;

public class Mastermind {
    
    public static void main (String args[]) throws IOException {
        
        boolean debugging = false;
        int[] computerCode = new int[4];
        MastermindGame game = new MastermindGame();
        game.generateComputerCode(computerCode);
        boolean allCorrect = false;
        int turn = 0;
        
        Console c = System.console();
        if (c == null) {
            System.err.println("No console.");
            System.exit(1);
        }
        //Welcome Messages
        c.printf("Welcome to Mastermind!\n");
        c.printf("Guess the four digit password with the numbers 1 thru 6.\n");
        c.printf("  1. Make sure there is spaces between each number.\n");
        c.printf("  2. A black peg means that one of your numbers is in the right place.\n");
        c.printf("  3. A white peg means that one of your numbers is the right number but-\n");
        c.printf("     not in the right place.\n\n");
        
        if(debugging){
            c.printf("This is the computer guess: " + Arrays.toString(computerCode) + "\n\n");
        }
        
        do{
            turn++;
            c.printf("You are on turn " + turn + ".\n");
            //Enter Human Guess, converts it to array and checks it against computer code
            String sHumanGuess = c.readLine("Enter your guess: ");
            int[] iHumanGuess = game.humanGuessToIntArray(sHumanGuess);
            int blackPegs = game.positionsRight(iHumanGuess, computerCode);
            int whitePegs = (game.colorsRight(iHumanGuess, computerCode) - blackPegs);
            //Displays black and white pegs if black pegs does not equal four.
            if (blackPegs != 4){
                c.printf("You have " + blackPegs + " Black Pegs ");
                c.printf("and " + whitePegs + " White Pegs.\n\n");
            } else {
                allCorrect = true;
            }
        } while ((allCorrect == false) && (turn < 10));
        
        if(turn >= 10){
            c.printf("You Loose. The corect code was: " + Arrays.toString(computerCode) + ".");
        }else{
            c.printf("Congradulations! You guessed the correct code!");
        }
    }
}

class MastermindGame {
    //checks for positions right
    public int positionsRight(int[] HumanGuess, int[] computerCode) {
        int positionsRight = 0;
        for(int x = 0; x<4; x++){
            if (HumanGuess[x] == computerCode[x]) {
                positionsRight++;
            }
        }
        return positionsRight;  
    }
    //checks for amount of colors right
    public int colorsRight(int[] HumanGuess, int[] computerCode) {
        int colorsRight = 0;
            int counter2 = 13;
            int[] p1 = new int[4];
            int[] c1 = new int[4];
        
            for(int i = 0; i < 4; i++){
                p1[i] = HumanGuess[i];
                c1[i] = computerCode[i];
            }
            //checks how many colors you got right.
            for(int x=0; x < 4; x++){
                for(int i = 0; i < 4; i++)
                if (p1[i] == c1[x]){
                    colorsRight++;
                    c1[x] = ++counter2;
                    p1[i] = ++counter2;
                }
            }
        return colorsRight;  
    }
    //Create Random Computer Code
    public void generateComputerCode(int[] computerCode) {
        Random rand = new Random();
        for (int x = 0; x < 4; x++) {
            computerCode[x] = (rand.nextInt(4) + 1);
        }
    }
    public int[] humanGuessToIntArray(String sHumanGuess) {
        String[] aHumanGuess = sHumanGuess.split(" ");
        int[] iHumanGuess = new int[4];
        for (int x = 0; x < 4; x++){
            iHumanGuess[x] = Integer.parseInt(aHumanGuess[x]);
        }
        return iHumanGuess;
    }
}