using System;
using System.Collections.Generic;

namespace Mastermind
{
    public class Mastermind
    {
        private int [] computerCode;
        private static Random getRandom = new Random();
        public Mastermind() {
            computerCode = new int[4];
            for (int x = 0; x < 4; x++) 
            {
                computerCode[x] = getRandom.Next(1, 7);
            }
        }
        public void gameWelcome() {
            Console.WriteLine("Welcome to Mastermind!");
            Console.WriteLine("Guess the four digit password with the numbers 1 thru 6.");
            Console.WriteLine("  1. Make sure there is spaces between each number.");
            Console.WriteLine("  2. A black peg means that one of your numbers is in the right place.");
            Console.WriteLine("  3. A white peg means that one of your numbers is the right number but-");
            Console.WriteLine("     not in the right place.");
        }
        public int positionsRight(int[] HumanGuess) {
        int positionsRight = 0;
        for(int x = 0; x<4; x++){
            if (HumanGuess[x] == computerCode[x]) {
                positionsRight++;
            }
        }
        return positionsRight;  
        }
        public int colorsRight (int[] humanGuess){
            int colorsRight = 0;
            int counter2 = 20;
            int[] p1 = new int[4];
            int[] c1 = new int[4];
        
            for(int i = 0; i < 4; i++){
                p1[i] = humanGuess[i];
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
        public void printComputerCode()
        {
            Console.Write("\nThe correct code was: ");
            foreach(var item in computerCode)
            {
                Console.Write($" {item.ToString()}");
            }
            Console.Write("\n");
        } 
    }
}