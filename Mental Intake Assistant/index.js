const Alexa = require('ask-sdk')

//Global Variables are declared
var lowerThanZero = "";
var higherThanZero = "";
var atZero = "";

//Variables for Friends Category
var anyFriendsNegative = false;

var timeWithFriendsNegative = false;
var timeWithFriendsPositive = false;

var socialGroupPositive = false;
var socialGroupPositiveTwo = false;

//Variables for Work Category
var WorkSociallySafeNegative = false;
var WorkSociallySafeNegativeTwo = false;

var WorkCurrentWorkNegative = false;
var WorkCurrentWorkNegativeTwo = false;
var WorkCurrentWorkPositive = false;

var WorkWorkInTeamNegative = false;
var WorkWorkInTeamPositive = false;
var WorkWorkInTeamPositiveTwo = false;

//Variables for Child Category
var ChildBulliedChildPositive = false;

//Variables for Conclusion Category
var conclusionFriends = false;
var conclusionWork = false;
var conclusionChild = false;
var ConclusionString = "";


//WelcomeHandler - Intent is called when the application is launced: "Open Mental Intake"
const WelcomeHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest' 
           || (request.type === 'IntentRequest' 
           && request.intent.name === 'WelcomeIntent');
    },

    handle(handlerInput) {
        const WELCOME_MESSAGE = 'Welcome to your mental intake. I am Mia, your Mental Intake Assistant. During this conversation, I am going to ask you questions about topics regarding your mental wellbeing, in order to see if you are doing well, have some setbacks in your life, or to see if you might need assistance from a professional. If you are ready, say start.';
        
        // FriendsBranches
        anyFriendsNegative = false;

        socialGroupPositive = false;
        socialGroupPositiveTwo = false;

        timeWithFriendsNegative = false;
        timeWithFriendsPositive = false;

        // WorkBranches
        WorkSociallySafeNegative = false;
        WorkSociallySafeNegativeTwo = false;

        WorkCurrentWorkNegative = false;
        WorkCurrentWorkNegativeTwo = false;
        WorkCurrentWorkPositive = false;
        
        WorkWorkInTeamNegative = false;
        WorkWorkInTeamPositive = false;
        WorkWorkInTeamPositiveTwo = false;

        // ChildBranches
        ChildBulliedChildPositive = false;

        // Conclusions
        conclusionFriends = false;
        conclusionWork = false;
        conclusionChild = false;
        ConclusionString = "";
            
        return handlerInput.responseBuilder
                .speak(WELCOME_MESSAGE)
                .reprompt(WELCOME_MESSAGE)
                .getResponse();
    },
};

//FallbackHandler - Intent is called when a command is not recognized outside of an intent
const FallbackHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },

    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("I'm sorry, something went wrong. Say continue to continue?")
            .reprompt('Could you please say your answer again?')
            .getResponse();
    },
};

//ErrorHandler - Displays the error in the console
const ErrorHandler = {
    canHandle() {
        return true;
    },

    handle(handlerInput, error) {
        console.log(`Error handled: ${handlerInput.requestEnvelope.request.type} ${handlerInput.requestEnvelope.request.type === 'IntentRequest' ? `intent: ${handlerInput.requestEnvelope.request.intent.name} ` : ''}${error.message}.`);
        return handlerInput.responseBuilder
            .speak('There was an error.')
            .reprompt('There was an error.')
            .getResponse();
    },
};

//QuestionsIntent - All questions are placed here

//Set all points to 0, otherwise they do not reset
var friendspoints = 0;
var workpoints = 0;
var childpoints = 0;

const QuestionsIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'QuestionsIntent'
            && request.dialogState === 'IN_PROGRESS';
    },

    handle(handlerInput) {
        const currentIntent = handlerInput.requestEnvelope.request.intent;
        const currentSlot = currentIntent.slots;
        
        //Check if the user sentences matches a word in a slot
        for (const slotName in currentIntent.slots) {

            if (Object.prototype.hasOwnProperty.call(currentIntent.slots, slotName)) {
                const currentSlot = currentIntent.slots[slotName];

                if (currentSlot.resolutions
                    && currentSlot.resolutions.resolutionsPerAuthority[0]
                    && currentSlot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_NO_MATCH') {
                    
                    return handlerInput.responseBuilder
                        .speak("I didn't quite get that. Could you please rephrase that?")
                        .reprompt("I didn't quite get that. Could you please rephrase that?")
                        .addElicitSlotDirective(currentSlot.name)
                        .getResponse();
                } 
            } 
        } 
       
        //FriendsQuestions
        var FriendsAnyFriends =  currentSlot.FriendsAnyFriends.resolutions;
        var FriendsTimeWithFriends = currentSlot.FriendsTimeWithFriends.resolutions;
        var FriendsSocialGroup = currentSlot.FriendsSocialGroup.resolutions;       
        
        //Branches for Friends are defined here
        if (typeof FriendsAnyFriends != "undefined") { 
            FriendsAnyFriends = FriendsAnyFriends.resolutionsPerAuthority[0].values[0].value.name;
            const FriendsAnyFriendsPositiveResponse = "How come?"

            if (FriendsAnyFriends == "Negative" && anyFriendsNegative == false) {
              anyFriendsNegative = true;
              return handlerInput.responseBuilder
                  .speak(FriendsAnyFriendsPositiveResponse)
                  .reprompt(FriendsAnyFriendsPositiveResponse)
                  .addElicitSlotDirective(currentSlot.FriendsAnyFriendsBrNegative.name)
                  .getResponse(); 
              } 
        }
        if (typeof FriendsTimeWithFriends!= "undefined") { 
            FriendsTimeWithFriends = FriendsTimeWithFriends.resolutionsPerAuthority[0].values[0].value.name;
            
            const FriendsTimeWithFriendsNegativeResponse = "Could you please tell me more about why that is the case?";
            const FriendsTimeWithFriendsPositiveResponse = "What do you usually do with your friends?";

            if (FriendsTimeWithFriends == "Negative" && timeWithFriendsNegative == false) {
              timeWithFriendsNegative = true;
              return handlerInput.responseBuilder
                  .speak(FriendsTimeWithFriendsNegativeResponse)
                  .reprompt(FriendsTimeWithFriendsNegativeResponse)
                  .addElicitSlotDirective(currentSlot.FriendsTimeWithFriendsBrNegative.name)
                  .getResponse(); 
              }
              
            else if (FriendsTimeWithFriends == "Positive" && timeWithFriendsPositive == false) {
              timeWithFriendsPositive = true;
              return handlerInput.responseBuilder
                  .speak(FriendsTimeWithFriendsPositiveResponse)
                  .reprompt(FriendsTimeWithFriendsPositiveResponse)
                  .addElicitSlotDirective(currentSlot.FriendsTimeWithFriendsBrPositive.name)
                  .getResponse(); 
              }
        }

        if (typeof FriendsSocialGroup!= "undefined") { 
            FriendsSocialGroup = FriendsSocialGroup.resolutionsPerAuthority[0].values[0].value.name; 
            const socialGroupPositiveResponse = "In what way do your friends have a negative influence on you?"
            const socialGroupPositiveResponseTwo = "Would you be able to resist their negative influences?"
            
            if (FriendsSocialGroup == "Positive" && socialGroupPositive == true && socialGroupPositiveTwo == false) {
              socialGroupPositiveTwo = true;
              return handlerInput.responseBuilder
                  .speak(socialGroupPositiveResponseTwo)
                  .reprompt(socialGroupPositiveResponseTwo)
                  .addElicitSlotDirective(currentSlot.FriendsSocialGroupBrPositiveTwo.name)
                  .getResponse(); 
              }             

            if (FriendsSocialGroup == "Positive" && socialGroupPositive == false) {
              socialGroupPositive = true;
              return handlerInput.responseBuilder
                  .speak(socialGroupPositiveResponse)
                  .reprompt(socialGroupPositiveResponse)
                  .addElicitSlotDirective(currentSlot.FriendsSocialGroupBrPositive.name)
                  .getResponse(); 
              } 
        }
        
        //If all Friends questions are answered: conclusion is given and points are calculated
        if (typeof FriendsAnyFriends != "undefined" && typeof FriendsTimeWithFriends != "undefined" && typeof FriendsSocialGroup != "undefined" && conclusionFriends == false) {
            conclusionFriends = true;
            var nextSlot = currentSlot.WorkSociallySafe.name;
            var lowerThanZero =  '<speak> It is a shame to hear that it isn\'t going well with your social life. We\'ll work on this together. <break time="0.75s"/> I’m now going to ask some questions about your work experiences. <break time="0.75s"/> On a scale of one to five, where one is bad and five is good, how socially safe do you feel at work?</speak>'
            var atZero =         '<speak> There are some good and bad sides. You seem to be in the middle. <break time="0.75s"/> I’m now going to ask some questions about your work experiences. <break time="0.75s"/> On a scale of one to five, where one is bad and five is good, how socially safe do you feel at work?</speak>'
            var higherThanZero = '<speak> Great to hear you’re doing well with your friends. I see no problems here. <break time="0.75s"/> I’m now going to ask some questions about your work experiences. <break time="0.75s"/> On a scale of one to five, where one is bad and five is good, how socially safe do you feel at work?</speak>'
                                
            friendspoints = CalculatePointsFriends(FriendsAnyFriends, FriendsTimeWithFriends, FriendsSocialGroup);

            return CheckResponse(handlerInput, friendspoints, lowerThanZero, higherThanZero, atZero, nextSlot);
        }

        //WorkQuestions
        var WorkSociallySafe =  currentSlot.WorkSociallySafe.resolutions;
        var WorkCurrentWork = currentSlot.WorkCurrentWork.resolutions;
        var WorkWorkInTeam = currentSlot.WorkWorkInTeam.resolutions;   
            
        //Branches for Work are defined here
        if (typeof WorkSociallySafe != "undefined"){
            WorkSociallySafe = WorkSociallySafe.resolutionsPerAuthority[0].values[0].value.name; 
            const WorkSociallySafeNegativeResponse = "In what way do you feel insecure at work?"
            const WorkSociallySafeNegativeResponseTwo = "Does anybody know about how you feel?"
            
            if ((WorkSociallySafe == "One" || WorkSociallySafe == "Two") && WorkSociallySafeNegative == false) {
                WorkSociallySafeNegative = true;
                return handlerInput.responseBuilder
                    .speak(WorkSociallySafeNegativeResponse)
                    .reprompt(WorkSociallySafeNegativeResponse)
                    .addElicitSlotDirective(currentSlot.WorkSociallySafeBrNegative.name)
                    .getResponse(); 
                }
                
            if ((WorkSociallySafe == "One" || WorkSociallySafe == "Two") && WorkSociallySafeNegative == true && WorkSociallySafeNegativeTwo == false ) {
                WorkSociallySafeNegativeTwo = true;
                return handlerInput.responseBuilder
                    .speak(WorkSociallySafeNegativeResponseTwo)
                    .reprompt(WorkSociallySafeNegativeResponseTwo)
                    .addElicitSlotDirective(currentSlot.WorkSociallySafeBrNegative.name)
                    .getResponse(); 
                }

        }
        if (typeof WorkCurrentWork != "undefined"){
            WorkCurrentWork = WorkCurrentWork.resolutionsPerAuthority[0].values[0].value.name; 
            const WorkCurrentWorkNegativeResponse = "Why don’t you like your job?"
            const WorkCurrentWorkNegativeResponseTwo = "Would switching jobs be an option?"
            const WorkCurrentWorkPositiveResponse = "Could you tell me more about your job?"

            if ((WorkCurrentWork == "One" || WorkCurrentWork == "Two") && WorkCurrentWorkNegative == false) {
                WorkCurrentWorkNegative = true;
                return handlerInput.responseBuilder
                    .speak(WorkCurrentWorkNegativeResponse)
                    .reprompt(WorkCurrentWorkNegativeResponse)
                    .addElicitSlotDirective(currentSlot.WorkCurrentWorkBrNegative.name)
                    .getResponse(); 
                }
                
            if ((WorkCurrentWork == "One" || WorkCurrentWork == "Two") && WorkCurrentWorkNegative == true && WorkCurrentWorkNegativeTwo == false) {
                WorkCurrentWorkNegativeTwo = true;
                return handlerInput.responseBuilder
                    .speak(WorkCurrentWorkNegativeResponseTwo)
                    .reprompt(WorkCurrentWorkNegativeResponseTwo)
                    .addElicitSlotDirective(currentSlot.WorkCurrentWorkBrNegativeTwo.name)
                    .getResponse(); 
                }

            if ((WorkCurrentWork == "Four" || WorkCurrentWork == "Five") && WorkCurrentWorkPositive == false) {
                WorkCurrentWorkPositive = true;
                return handlerInput.responseBuilder
                    .speak(WorkCurrentWorkPositiveResponse)
                    .reprompt(WorkCurrentWorkPositiveResponse)
                    .addElicitSlotDirective(currentSlot.WorkCurrentWorkBrPositive.name)
                    .getResponse(); 
                }

            
        }
        if (typeof WorkWorkInTeam != "undefined"){
            WorkWorkInTeam = WorkWorkInTeam.resolutionsPerAuthority[0].values[0].value.name;
            const WorkWorkInTeamNegativeResponse = "Why do you prefer working alone?"
            const WorkWorkInTeamPositiveResponse = "Do the other people support you in your work?"
            const WorkWorkInTeamPositiveResponseTwo = "Do you feel like you have to manage your entire team?"

            if (WorkWorkInTeam == "Negative" && WorkWorkInTeamNegative == false){
                WorkWorkInTeamNegative = true;
                return handlerInput.responseBuilder
                    .speak(WorkWorkInTeamNegativeResponse)
                    .reprompt(WorkWorkInTeamNegativeResponse)
                    .addElicitSlotDirective(currentSlot.WorkWorkInTeamBrNegative.name)
                    .getResponse(); 
            }

            if (WorkWorkInTeam == "Positive" && WorkWorkInTeamPositive == false){
                WorkWorkInTeamPositive = true;
                return handlerInput.responseBuilder
                    .speak(WorkWorkInTeamPositiveResponse)
                    .reprompt(WorkWorkInTeamPositiveResponse)
                    .addElicitSlotDirective(currentSlot.WorkWorkInTeamBrPositive.name)
                    .getResponse(); 
            }

            if (WorkWorkInTeam == "Positive" && WorkWorkInTeamPositive == true && WorkWorkInTeamPositiveTwo == false){
                WorkWorkInTeamPositiveTwo = true;
                return handlerInput.responseBuilder
                    .speak(WorkWorkInTeamPositiveResponseTwo)
                    .reprompt(WorkWorkInTeamPositiveResponseTwo)
                    .addElicitSlotDirective(currentSlot.WorkWorkInTeamBrPositiveTwo.name)
                    .getResponse(); 
            }
        }   
        
        //If all Work questions are answered: conclusion is given and points are calculated
        if (typeof WorkSociallySafe != "undefined" && typeof WorkCurrentWork != "undefined" && typeof WorkWorkInTeam != "undefined" && conclusionWork == false) {
            conclusionWork = true;
            var nextSlot = currentSlot.ChildBulliedChild.name;
            var lowerThanZero =  '<speak> Although you might have some problems with your work, I\'m sure it will turn out for the best. <break time="0.75s"/> I\'m now going to ask some questions about your childhood. <break time="0.75s"/> Did you get bullied during your childhood?</speak>'
            var atZero =         '<speak> You\'ve had some rough times, but also some enjoyable ones. Try to remember those. <break time="0.75s"/> I\'m now going to ask some questions about your childhood. <break time="0.75s"/> Did you get bullied during your childhood?</speak>'
            var higherThanZero = '<speak> You seem to be doing well with your work. Glad to hear so. <break time="0.75s"/> I\'m now going to ask some questions about your childhood. <break time="0.75s"/> Did you get bullied during your childhood?</speak>'
                                
            workpoints = CalculatePointsWork(WorkSociallySafe, WorkCurrentWork, WorkWorkInTeam);

            return CheckResponse(handlerInput, workpoints, lowerThanZero, higherThanZero, atZero, nextSlot);
        }


        //ChildhoodQuestions
        var ChildBulliedChild =  currentSlot.ChildBulliedChild.resolutions;
        var ChildHappinessSixToTwelve = currentSlot.ChildHappinessSixToTwelve.resolutions;
        var ChildHappinessTwelveToEighteen = currentSlot.ChildHappinessTwelveToEighteen.resolutions;   

        //Branches for Childhood are defined here
        if (typeof ChildBulliedChild != "undefined"){
            ChildBulliedChild = ChildBulliedChild.resolutionsPerAuthority[0].values[0].value.name; 
            const ChildBulliedChildPositiveResponse = "In what way did you get bullied?"

            if (ChildBulliedChild == "Positive" && ChildBulliedChildPositive == false) {
              ChildBulliedChildPositive = true;
              return handlerInput.responseBuilder
                  .speak(ChildBulliedChildPositiveResponse)
                  .reprompt(ChildBulliedChildPositiveResponse)
                  .addElicitSlotDirective(currentSlot.ChildBulliedChildBrPositive.name)
                  .getResponse(); 
              } 
        }
        if (typeof ChildHappinessSixToTwelve!= "undefined"){
            ChildHappinessSixToTwelve = ChildHappinessSixToTwelve.resolutionsPerAuthority[0].values[0].value.name; 
        }
        if (typeof ChildHappinessTwelveToEighteen!= "undefined"){
            ChildHappinessTwelveToEighteen = ChildHappinessTwelveToEighteen.resolutionsPerAuthority[0].values[0].value.name; 
        } 

        //If all Childhood questions are answered: conclusion is given and points are calculated
        if (typeof ChildBulliedChild != "undefined" && typeof ChildHappinessSixToTwelve != "undefined" && typeof ChildHappinessTwelveToEighteen != "undefined" && conclusionChild == false) {
            conclusionChild = true;
            var lowerThanZero =  '<speak> It seems you had a rough childhood. I\'m sorry to hear that. <break time="0.75s"/> We’re now done with the test, and I thank you a lot for sharing. If you\'d like to hear your conclusion, say "I want to hear my conclusion.".</speak>'
            var atZero =         '<speak> There are some good and bad sides. You seem to be in the middle. <break time="0.75s"/> We’re now done with the test, and I thank you a lot for sharing. If you\'d like to hear your conclusion, say "I want to hear my conclusion.".</speak>'
            var higherThanZero = '<speak> You had a good childhood. I\'m glad to hear so. <break time="0.75s"/> We’re now done with the test, and I thank you a lot for sharing. If you\'d like to hear your conclusion, say "I want to hear my conclusion.".</speak>'
                                  
                                
            childpoints = CalculatePointsChild(ChildBulliedChild, ChildHappinessSixToTwelve, ChildHappinessTwelveToEighteen);

            return CheckResponseEnd(handlerInput, childpoints, lowerThanZero, higherThanZero, atZero);
        }


        //Continues the conversation when the deverloper hasn't given a next question to ask, follows the dialog model
        return handlerInput.responseBuilder
            .addDelegateDirective(currentIntent)
            .getResponse();
        }
    };

//QuestionsIntentStart - called when the intake is started, sets up the conversation
const QuestionsIntentStart = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'QuestionsIntent'
            && request.dialogState !== 'IN_PROGRESS'
            && request.dialogState !== 'COMPLETED';
    },

    handle(handlerInput) {
        const currentIntent = handlerInput.requestEnvelope.request.intent;
        const currentSlot = currentIntent.slots;
        


        return handlerInput.responseBuilder
            .addDelegateDirective(currentIntent)
            .getResponse();    
    },
};

//CalculatePointsFriends - used to calculate the points for the friends category
function CalculatePointsFriends(FriendsAnyFriends, FriendsTimeWithFriends, FriendsSocialGroup) {
    var points = 0;
        
    if (FriendsAnyFriends == "Negative"){
        points = points - 2;
    }
    else {
        points = points + 2;
    }
    
    if (FriendsTimeWithFriends == "Negative"){
        points = points - 1;
    }
    else {
        points = points + 1;
    }
    
    if (FriendsSocialGroup == "Negative"){
        points = points + 2;
    }
    else {
        points = points - 3;
    }
    
    return points;
}

//CalculatePointsWork - used to calculate the points for the work category
function CalculatePointsWork(WorkSociallySafe, WorkCurrentWork, WorkWorkInTeam) {
    var points = 0;
        
    if ( WorkSociallySafe == "One" || WorkSociallySafe == "Two"){
        points = points - 2;
    }
    else if (WorkSociallySafe == "Four" || WorkSociallySafe == "Five") {
        points = points + 2;
    }
    
    if (WorkCurrentWork == "One" || WorkCurrentWork == "Two"){
        points = points - 2;
    }
    else if (WorkCurrentWork == "Four" || WorkCurrentWork == "Five") {
        points = points + 2;
    }
    
    if (WorkWorkInTeam == "Negative"){
        points = points - 1;
    }
    else {
        points = points + 2;
    }
    
    return points;
}

//CalculatePointsChild - used to calculate the points for the child category
function CalculatePointsChild(ChildBulliedChild, ChildHappinessSixToTwelve, ChildHappinessTwelveToEighteen) {
    var points = 0;

    if (ChildBulliedChild == "Negative"){
        points = points + 1;
    }
    else {
        points = points - 3;
    }

    if ( ChildHappinessSixToTwelve == "One" || ChildHappinessSixToTwelve == "Two"){
        points = points - 2;
    }
    else if (ChildHappinessSixToTwelve == "Four" || ChildHappinessSixToTwelve == "Five") {
        points = points + 2;
    }
    
    if (ChildHappinessTwelveToEighteen == "One" || ChildHappinessTwelveToEighteen == "Two"){
        points = points - 2;
    }
    else if (ChildHappinessTwelveToEighteen == "Four" || ChildHappinessTwelveToEighteen == "Five") {
        points = points + 2;
    }
    
    return points;
}

//ConclusionIntent - used to calculate the final conclusion
var ConclusionString = "";
var conclusionpoints = 0;

const ConclusionIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
            return request.type === 'IntentRequest'
                && request.intent.name === 'ConclusionIntent';
    },

    handle(handlerInput) {
        // lowerThanZero = "This is a negative conclusion.";
        // higherThanZero = "This is a positive conclusion.";
        // atZero = "This is a balanced conclusion.";
        conclusionpoints = friendspoints + workpoints + childpoints;

        return CheckResponseConclusion(handlerInput, conclusionpoints, ConclusionString);
    },
};

//CheckResponse - used to check which response should be given
function CheckResponse(handlerInput, points, lowerThanZero, higherThanZero, atZero, nextSlot){
    
    if (points == 0){
        return handlerInput.responseBuilder
        .speak(atZero)
        .reprompt(atZero)
        .addElicitSlotDirective(nextSlot)
        .getResponse();
    }
    
    else if (points > 0){
        return handlerInput.responseBuilder
        .speak(higherThanZero)
        .reprompt(higherThanZero)
        .addElicitSlotDirective(nextSlot)
        .getResponse();
    }
    
    else if (points < 0 ){
        return handlerInput.responseBuilder
        .speak(lowerThanZero)
        .reprompt(lowerThanZero)
        .addElicitSlotDirective(nextSlot)
        .getResponse();
    }
}

//CheckResponseEnd - checks which response should be given at the end of the conversation, the final category
function CheckResponseEnd(handlerInput, points, lowerThanZero, higherThanZero, atZero){  
    
    if (points == 0){
        return handlerInput.responseBuilder
        .speak(atZero)
        .reprompt(atZero)
        .getResponse();
    }
    
    else if (points > 0){
        return handlerInput.responseBuilder
        .speak(higherThanZero)
        .reprompt(higherThanZero)
        .getResponse();
    }
    
    else if (points < 0 ){
        return handlerInput.responseBuilder
        .speak(lowerThanZero)
        .reprompt(lowerThanZero)
        .getResponse();
    }
}
    
//CheckResponseConclusion - checks which response should be given for the conclusion
function CheckResponseConclusion(handlerInput, points, conclusionstring){
    ConclusionString += '<speak>';

    if(friendspoints < -3){
        ConclusionString += ' Based on your answers it seems that there are problems with your social relationships. Try to expand your social group, and try to leave out the people that have a negative influence on you.'
    }
    else if(friendspoints >= -3 && friendspoints < 0 ){
        ConclusionString += ' Even though there seem to be problems with your social group, there are still some positive points. Try to emphasize those and let them bring you joy.'
    }
    else if(friendspoints > 0 && friendspoints <= 3){
        ConclusionString += ' While there are some things you need to be careful of, for the most part you are doing good with your friends and on the social front. This is good to hear.'
    }
    else if(friendspoints > 3){
        ConclusionString += ' Your social life seems to be in good order. You have dependable friends and also do activities with them. Socially you are doing great.'
    }
    else{
        ConclusionString += ' There are some good sides and bad sides. Work on the good sides of your friendships and keep those up. But beware of the bad sides. Don’t let them get you down too much.'
    }
    
    if(workpoints < -3){
        ConclusionString += '<break time="0.75s"/> You seem to have issues in the workplace. Consider changing the way you work or your workplace altogether.'
    }
    else if(workpoints >= -3 && workpoints < 0 ){
        ConclusionString += '<break time="0.75s"/> There seem to be some problems on the job. Try to take some steps toward improvement.'
    }
    else if(workpoints > 0 && workpoints <= 3){
        ConclusionString += '<break time="0.75s"/> It seems to be going well for the most part with your work, although you do have to watch out for those minor bad sides.'
    }
    else if(workpoints > 3){
        ConclusionString += '<break time="0.75s"/> You seem to be going great in your career. Keep this going and there will be a lot more opportunities waiting for you.'
    }
    else{
        ConclusionString += '<break time="0.75s"/> Your career seems to have some good and bad sides to it. Try to focus on the positive aspects.'
    }

    if(childpoints < -3){
        ConclusionString += '<break time="0.75s"/> It seems you’ve had a very rough childhood. Don’t let it get you down too much. Your past does not define who you are today, so look towards your future.'
    }
    else if(childpoints >= -3 && childpoints < 0 ){
        ConclusionString += '<break time="0.75s"/> You have had some troubles in the past, but it doesn’t need to have a huge impact on you nowadays. Try not to think about the past too much.'
    }
    else if(childpoints > 0 && childpoints <= 3){
        ConclusionString += '<break time="0.75s"/> Although you might have experienced some setbacks, overall you seemed to be doing well during your childhood.'
    }
    else if(childpoints > 3){
        ConclusionString += '<break time="0.75s"/> You had a great childhood! I don’t think you retained any problems from those times.'
    }
    else{
        ConclusionString += '<break time="0.75s"/> According to your answers you do not let your childhood affect how you are now.'
    }

    if (points >= -1 && points <= 1){
       ConclusionString += '<break time="0.75s"/> Finally, all things considered, there seem to be some things that could hold you back. Try to work on the positive side of things, and pay less attention to the negatives.'
    }
    
    else if (points >= 2){
        ConclusionString += '<break time="0.75s"/> Finally, overall you seem to be doing pretty well. I wouldn’t worry too much about it.'
    }
    
    else if (points <= -2 ){
        ConclusionString += '<break time="0.75s"/> Finally, there seem to be some problems on multiple aspects of your life. Maybe you should consider talking to a professional. He or she might be able to help you further.'
    }
    ConclusionString += '</speak>';
    return handlerInput.responseBuilder
    .speak(ConclusionString)
    .reprompt(ConclusionString)
    .getResponse();
}

//Declare all handlers
const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
  .addRequestHandlers(
    WelcomeHandler,
    QuestionsIntent,
    QuestionsIntentStart,
    ConclusionIntent,
    FallbackHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();