using System;
using System.IO;
using System.Collections.Generic;


namespace Mastermind
{
    class Program
    {
        static void Main(string[] args)
        {
            bool debugging = false;
            bool allCorrect = false;
            int turn = 0;
            var game = new Mastermind();
            game.gameWelcome();
            
            if(debugging){
                game.printComputerCode();
            }
            do{
                turn++;
                Console.WriteLine($"You are on turn {turn}.");
                //Enter Human Guess, converts it to array and checks it against computer code
                Console.Write("Type your guess: ");
                String sHumanGuess = Console.ReadLine();
                string[] cHumanGuess = sHumanGuess.Split(' ');
                int[] iHumanGuess = Array.ConvertAll(cHumanGuess, Int32.Parse);
                
                int blackPegs = game.positionsRight(iHumanGuess);
                int whitePegs = (game.colorsRight(iHumanGuess) - blackPegs);
                //Displays black and white pegs if black pegs does not equal four.
                if (blackPegs != 4){
                    Console.WriteLine($"You have {blackPegs} Black Pegs ");
                    Console.WriteLine($"and {whitePegs} White Pegs.");
                } else {
                    allCorrect = true;
                }
                
            } while ((allCorrect == false) && (turn < 10));
             
            if(turn >= 10){
                game.printComputerCode();
            }else{
                Console.WriteLine("Congradulations! You guessed the correct code!");
            }
        }
    }
}
