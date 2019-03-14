/****************************************************************************
 *
 * Proj.02: An implementation of the Mastermind game
 *
 * File Name: mastermind.cpp
 * Name:      ?
 * Course:    CPTR 141
 * Date:      November 27, 2017
 *
 */

#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
using namespace std;

//global int for the size of the guess and flag
bool debugging = false;
const int C_SIZE = 4;

//checks how many pins you guesed are in the right position
void check_numbers(int[], int[], int&);

//checks home many pins are in the right place.
void check_position(int[], int[], int&);

int main(){



    cout << "Welcome to Mastermind" << endl << endl;

    srand(time(0));
    int c_nums[C_SIZE];
    int p_guess[C_SIZE], colors_right = 0, position_right = 0, counter = 0;
    bool loop = true, incorrect;

    //creates random computer numbers
    for(int x = 0; x < C_SIZE; x++){
       c_nums[x] = rand()%6;
    }
    // output instructions for the game
    cout << "Guess the four digit password with the numbers 0 thru 5." << endl;
    cout << "  1. Make sure there is a space in between each number." << endl;
    cout << "  2. A black peg means that one of your numbers is in the right place." << endl;
    cout << "  3. A white peg means that one of your numbers is the right number but-" << endl;
    cout << "     not in the right place." << endl << endl;
    //if debugging is true will print out computer guess
    if(debugging){
        cout << "This is the computer guess: ";
        for(int x = 0; x < C_SIZE; x++){
             cout << c_nums[x] << " ";
        }
        cout << endl;
    }
    //outputs to file mastermind.txt
    ofstream fout;
    fout.open("mastermind.txt");
    if(!fout) {
        cout << "Can't open file.";
    }else{
        fout << "Welcome to Mastermind." << endl;
        fout << "You can see your previous guesses below." << endl << endl;
        //loops until user guesses the right password or reaches 10 guesses.
        do{

            counter++;

            if(counter < 12){
                cout << endl << "You have " << 11 - counter << " tries left. ";
            }else{
                cout << endl << "This is your last try.";
            }
            cout << endl << "Make your guess: ";
            //error checking
            do{
                incorrect = false;
                for(int x = 0; x < C_SIZE; x++){
                    cin >> p_guess[x];
                }
                //error checking
                for(int x = 0; x < C_SIZE; x++){
                    if(p_guess[x] < 0 || p_guess[x] > 5 || !cin){
                        cerr << "Invalid Entry. Please Try Again: ";
                        cin.clear();
                        cin.ignore(100000000000, '\n');
                        incorrect = true;
                        break;
                    }
                }
            }while(incorrect);
            //check color and position functions
            check_numbers(p_guess, c_nums, colors_right);
            check_position(p_guess, c_nums, position_right);
            // prints gueses to file
            for(int x = 0; x < C_SIZE; x++){
                    fout << p_guess[x];
                    fout << " ";
            }
            //prints pegs
            cout << position_right << " black peg";
            fout << " |  " << position_right << " black peg";

            if (position_right != 1){
              cout << "";
              fout << "";
            }

            cout << " and ";
            fout << " and ";
            cout << colors_right - position_right << " white peg";
            fout << colors_right - position_right << " white peg";

            if (colors_right - position_right != 1){
               cout << "s";
               fout << "s";
            }

            cout <<"." << endl << endl;
            fout <<"." << endl << endl;

            if(debugging){
                cout << endl << "Computer guess vs your Guess to check pegs." << endl;
                for(int x = 0; x < C_SIZE; x++){
                    cout << c_nums[x] << " ";
                }
                cout << endl;
                for(int x = 0; x < C_SIZE; x++){
                    cout << p_guess[x] << " ";
                }
                cout << endl;
            }

            //exits if you have tried to many times or tells you if you are correct
            if(position_right == 4){
                loop = false;
                cout << endl << "Congratulations that is correct!";
                fout << endl << "Congratulations that is correct!";
            }else if(counter > 9){
                loop = false;
                cout << endl << "You took to many turns. ";
                fout << endl << "You took to many turns. ";
                cout << endl << "The numbers were ";
                fout << endl << endl << "The numbers were ";

                for(int x = 0; x < C_SIZE; x++){
                    cout << c_nums[x];
                    fout << c_nums[x];
                    cout << " ";
                    fout << " ";
                }
                cout << ".";
            }
        //main game loop
        }while(loop);

        fout.close();

    }


    return 0;
}

//functions
void check_numbers(int person[C_SIZE], int computer[C_SIZE], int &colors_right){

    colors_right = 0;
    int counter2 = 13;
    int p_1[4], c_1[4];

    for(int i = 0; i < C_SIZE; i++){
        p_1[i] = person[i];
        c_1[i] = computer[i];
    }
    //checks how many colors you got right.
    for(int x=0; x< C_SIZE; x++){
        for(int i = 0; i < 4; i++)
        if (p_1[i] == c_1[x]){
            colors_right++;
            c_1[x] = ++counter2;
        }
    }
}

void check_position(int person[C_SIZE], int computer[C_SIZE], int &position_right){

   position_right = 0;
   for(int x = 0; x < C_SIZE; x++){
        if(person[x] == computer[x]){
            position_right++;
        }
    }
}


