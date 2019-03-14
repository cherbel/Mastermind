! ------- Create dictionary if it is not present
run
| aSymbol names userProfile |
aSymbol := #'MastermindGlobals'.
userProfile := System myUserProfile.
names := userProfile symbolList names.
(names includes: aSymbol) ifFalse: [
	| symbolDictionary |
	symbolDictionary := SymbolDictionary new name: aSymbol; yourself.
	userProfile insertDictionary: symbolDictionary at: names size + 1.
].
%
! ------------------- Class definition for Mastermind
expectvalue /Class
doit
Object subclass: 'Mastermind'
  instVarNames: #( hiddenCode guesses)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: MastermindGlobals
  options: #()

%
expectvalue /Class
doit
Mastermind comment: 
'No class-specific documentation for Mastermind, hierarchy is: 
Object
  Mastermind
'
%
expectvalue /Class
doit
Mastermind category: 'Kernel'
%
! ------------------- Class definition for UserInteraction
expectvalue /Class
doit
Object subclass: 'UserInteraction'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: MastermindGlobals
  options: #()

%
expectvalue /Class
doit
UserInteraction category: 'Kernel'
%

! ------------------- Remove existing behavior from Mastermind
expectvalue /Metaclass3       
doit
Mastermind removeAllMethods.
Mastermind class removeAllMethods.
%
! ------------------- Class methods for Mastermind
set compile_env: 0
category: 'other'
classmethod: Mastermind
new

	^self basicNew
		initialize;
		yourself
%
! ------------------- Instance methods for Mastermind
set compile_env: 0
category: 'Game'
method: Mastermind
gameOver

	self turn > 10
		ifTrue: [
			Transcript 
				nextPutAll: 'You Loose. You took to many Turns'; lf;
				nextPutAll: 'The correct code was ', (String withAll: hiddenCode) printString, '.'; lf.
		] ifFalse: [
			Transcript 
				nextPutAll: 'Congratulations! You guessed the correct code!'; lf;
				nextPutAll: 'It took you ', (self turn - 1) asString, ' turn(s).'; lf.
		].
%
category: 'Game'
method: Mastermind
playGame
	
	| playerGuess |
	[ ((String withAll: hiddenCode) ~= playerGuess) and: [self turn <= 10]] whileTrue: [
		self printTurn.
		playerGuess := self promptForGuess.
		playerGuess == nil
			ifTrue: [^nil].
		self
			takeTurn: playerGuess;
			printBackGuess: playerGuess;
			checkPegs;
			addTranscriptSpace.
	].
	self gameOver.
%
category: 'Game'
method: Mastermind
takeTurn: aString

	guesses add: aString.
%
set compile_env: 0
category: 'Initializer'
method: Mastermind
initialize

	guesses := Array new.
	self createHiddenCode.
%
set compile_env: 0
category: 'other'
method: Mastermind
addTranscriptSpace
	
	Transcript lf.
%
category: 'other'
method: Mastermind
createHiddenCode


	| random allowedCharacters code |
	random := Random new. 
	allowedCharacters := 'BGRYWO'.
	code := Array new.
	4 timesRepeat: [
		code add: (allowedCharacters at: (random integerBetween: 1 and: 6)).
	].
	hiddenCode := code
%
category: 'other'
method: Mastermind
printBackGuess: aString

	Transcript nextPutAll: 'You Guessed ' , aString printString; lf.
%
category: 'other'
method: Mastermind
printTurn

	Transcript nextPutAll: 'You are on turn ', (self turn + 1) printString, '.'; lf.
%
category: 'other'
method: Mastermind
promptForGuess
"
	UserInteraction new promptForGuess.
"
	| answer |
	answer := UserInteraction new
		prompt: 'Enter your Guess. Choose four letters from "BGRYWO":'
		caption: 'MasterMind'.
	answer ifNil: [^nil].
	answer := answer decodeToString asUppercase.
	(self validateGuess: answer) ifTrue: [^answer].
	^self promptForGuess
%
category: 'other'
method: Mastermind
turn

	^guesses size
%
category: 'other'
method: Mastermind
validateGuess: aString
	
	| allowedCharacters |
	allowedCharacters :=  'BGRYWO'.
	"Checks that guess is exactly four characters"
	aString size ~= 4 ifTrue: [
		UserInteraction new
			message: 'Please Enter four characters'
			caption: 'Mastermind Game'
			icon: #error
			buttons: #ok.
		^false
	].
	"Checks that guesses are from allowed characters"
	(aString allSatisfy: [:eachGuess | allowedCharacters includes: eachGuess]) ifFalse: [
		UserInteraction new
			message: 'Please enter characters from "', allowedCharacters , '"!'
			caption: 'Mastermind Game'
			icon: #error
			buttons: #ok.
		^false
	].
	^true
%
set compile_env: 0
category: 'Pegs'
method: Mastermind
blackPegs

	^self positionsRight.
%
category: 'Pegs'
method: Mastermind
checkPegs

	self
		printPegsBlack: self blackPegs
		andWhite: self whitePegs.
%
category: 'Pegs'
method: Mastermind
colorsRight

	| colorsRight hiddenCode2 humanGuess2 counter |
	colorsRight := 0.
	counter := 40.
	hiddenCode2 := hiddenCode copy.
	humanGuess2 := guesses last copy.
	1 to: 4 do: [:x |
		1 to: 4 do: [ :i |
			(hiddenCode2 at: x) == (humanGuess2 at: i)
				ifTrue: [
					colorsRight := colorsRight + 1.
					hiddenCode2 at: x put: counter asCharacter.
					counter := counter + 1.
					humanGuess2 at: i put: counter asCharacter.
					counter := counter + 1.
				].
		].
	].
	^colorsRight
%
category: 'Pegs'
method: Mastermind
positionsRight

	| positionsRight |
	positionsRight := 0.
	1 to: 4 do: [:i |
			(guesses last at: i) == (hiddenCode at: i)
				ifTrue: [positionsRight := positionsRight + 1].
		].
	^positionsRight
%
category: 'Pegs'
method: Mastermind
printPegsBlack: blackPegs andWhite: whitePegs

	Transcript 
			nextPutAll: 'You have ' , blackPegs printString, ' black pegs.'; lf;
			nextPutAll: 'You have ' , whitePegs printString, ' white pegs.' ; lf.
%
category: 'Pegs'
method: Mastermind
 whitePegs

	^self colorsRight - self positionsRight
%

! ------------------- Remove existing behavior from UserInteraction
expectvalue /Metaclass3       
doit
UserInteraction removeAllMethods.
UserInteraction class removeAllMethods.
%
! ------------------- Class methods for UserInteraction
! ------------------- Instance methods for UserInteraction
set compile_env: 0
category: 'other'
method: UserInteraction
alert: aString

	^(System __sessionStateAt: 3)
		message: aString
		caption: 'MastermindGame'
		icon: #prompt
		buttons: #yesNoCancel.
%
category: 'other'
method: UserInteraction
message: messageString caption: captionString icon: iconSymbol buttons: buttonSymbol

	^(System __sessionStateAt: 3)
		message: messageString
		caption: captionString
		icon: iconSymbol
		buttons: buttonSymbol.
%
category: 'other'
method: UserInteraction
prompt: promptString

	^(System __sessionStateAt: 3)
		prompt: promptString
		caption: 'MasterMindGame'.
%
category: 'other'
method: UserInteraction
prompt: promptString caption: captionString

	^(System __sessionStateAt: 3)
		prompt: promptString
		caption: captionString
%
