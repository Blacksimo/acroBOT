# acroBOT - Your Acrobatics Coach Robot
### Using Pepper Robot

## Introduction

The main idea is to develop a coach robot which shows you, in its tablet, a set of positions to assume and evaluates the user’s skills in performing that particular position using a pose estimation model on a shot from its camera. It then compares the results of the model’s prediction with the position shown on the tablet.

## Demo scenario 

A child who wants to improve its motor coordination and memory skills playing with the pepper as its social coach, stands in front of the robot and wait for him to ask to play.

**Robot**: Hi, i’m acroBOT, do you want to play a game?
**Child**: Yes
**Robot**: Nice, read the rules of the game on my tablet!

The robot shows the rule of the game on its tablet: the game randomly choose a color (red/blue) that will indicate the right or left limb. Moreover, a random shape (square/circle) is chosen to distinguish between knees and wrists. The combinations of shape and color is shown on a 3x3 grid on the tablet and the child has to replicate that position with his limbs. He also has to hold that position for a few seconds until the robot shot a photo and evaluate the position of the child with a pose estimation model.

**Robot**: First round… Second Round..  Third Round.
**Robot**: I’m calculating your score.

Finally the robot compares the positions of the child with the ones it has generated and give the child a score.

**Robot**: Nice, your score is … 

## Interaction modalities

*From human to robot*: talk to robot, hold a position to be evaluated.
*From robot to human*: speech recognition, pose estimation, talk to humans, gestures, contextual say.

## Software components and tools

*Robot sensing, speech, gestures, display*: Pepper Command Tools
*Pose Estimation*: PoseNet JS 
*Programming language*: Python, HTML, Javascript, CSS
*Server and Framework*: NodeJS and Express

## More Information
[Complete Report](acroBOT.pdf)