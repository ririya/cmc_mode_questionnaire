

const introductionContainer = document.getElementById('introduction');
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

let shuffledQuestions, currentQuestionIndex, selected_affordances


submitButton.addEventListener('click', calculate)

function calculate(){
  
  var all_checked = true

  for (aff_ind = 0; aff_ind < questions.length; aff_ind++) {

    selected_aff = parseFloat(selected_affordances[aff_ind])

    if (selected_aff == -1) {
      all_checked = false
    }
  }
    
  if (all_checked == false)
  {
    resultsContainer.innerHTML = "Error: Please make a selection for all affordances."
    resultsContainer.style.color = 'red'
  }
  else {
    var mode_ind, aff_ind, best_sum, best_ind;
    best_sum = 0

    var scores = new Float32Array(modes.length)

    for (mode_ind = 0; mode_ind < modes.length; mode_ind++) {

      mode = modes[mode_ind]
      affordances = mode.affordances
      sum = 0

      for (aff_ind = 0; aff_ind < affordances.length; aff_ind++) {

        mode_aff = affordances[aff_ind]
        selected_aff = parseFloat(selected_affordances[aff_ind])

        sum += mode_aff * selected_aff
      }

      if (sum > best_sum) {
        best_sum = sum
        best_ind = mode_ind
      }

      scores[mode_ind] = sum

    }

    best_mode_name = modes[best_ind].name

    var result_text = ''

    result_text = result_text.concat("Scores: ")

    for (mode_ind = 0; mode_ind < modes.length; mode_ind++)
    {
      result_text = result_text.concat(scores[mode_ind].toString())
      if (mode_ind < modes.length -1)
      {
        result_text = result_text.concat(', ')
      }
      else{
        result_text = result_text.concat('. ')
      }
    }

    result_text = result_text.concat("A suitable CMC mode is ")
    result_text = result_text.concat(best_mode_name)
    result_text = result_text.concat(" and possible media are ")

    media = modes[best_ind].media

    for (media_ind = 0; media_ind < media.length; media_ind++) {

      result_text = result_text.concat(media[media_ind])

      if (media_ind < media.length - 1) {
        result_text = result_text.concat(' , ')
      }

    }

    resultsContainer.innerHTML = result_text
    resultsContainer.style.color = 'green'


  }

}

function handleClick(myRadio) {

  // var scores = [0,1,3] /

  currentValue = parseInt(myRadio.value);
  questionNumber = parseInt(myRadio.name)
  if (myRadio.checked) {
    selected_affordances[questionNumber] = scores[currentValue]
  }
}

function buildQuestions(){

  introductionContainer.innerText = 'CMC Mode Questionnaire'

  selected_affordances = new Array(questions.length)

  // variable to store the HTML output
  const output = [];

  // for each question...
  questions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        selected_affordances[questionNumber] = -1

        // and for each available answer...
        possible_answers.forEach((answer, ansNumber) => {

          // ...add an HTML radio button
          answers.push(
              `<label>
            <input type="radio" name="${questionNumber}" onclick="handleClick(this);" value = ${ansNumber}>
            ${answer}
          </label>`
          );
        });

        // add this question and its answers to the output
        // output.push(
        //     `<div class="question"> ${currentQuestion.question} </div>
        // <div class="answers"> ${answers.join('')} </div>`
        //
        //
        // );

        output.push(
            `<div class="row" style="width: 100%; display: table;">
                <div style="display: table-row">
                  <div class="question" style="width: 15%; display: table-cell;">  ${currentQuestion.name}  </div>
                  <div class="description" style="width: 35%; display: table-cell;">  ${currentQuestion.description}  </div>
                  <div class="answers" style="display: table-cell;"> ${answers.join('')} </div>
                </div>
            </div>`
      );

      }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}


const modes = [

  {
    name: 'AT',
    affordances: [1,1,0,0,1,0,0,1,0,0,0.5,0,1],
    media: ['AT_media1', 'AT_media2']
  },

  {
    name: 'AV',
    affordances: [0.5,0.5,0,0,0.5,0.5,0.5,0.5,0.5,0.5,0,1,0],
    media: ['AV_media1', 'AV_media2']
  },

  {
    name: 'ST',
    affordances: [0,0,0.5,0.5,0, 0.5,0,0.5,0.5,0,1,0,0.5],
    media: ['ST_media1', 'ST_media2']
  },

  {
    name: 'SV',
    affordances: [0,0,1,1,0,1,1,0,1,1,0,0.5,0],
    media: ['SV_media1', 'SV_media2']
  },

]

const questions = [
  {name: 'Reflection', description: 'The task requires time to think through content or discussion to develop robust ideas before communicating.'},
  {name: 'Idea Organization', description: 'The task requires time to plan, compose, and edit to organize ideas and elaborate responses.'},
  {name: 'Immediate Interaction', description: 'The task requires immediate responses and simultaneous knowledge construction.'},
  {name: 'Time Flexibility', description: 'It is important that the task is concluded in a single discussion session.'},
  {name: 'Time Flexibility', description: 'The task allows students to contribute at their own time and pace.'},
  {name: 'Social Presence', description: 'The task requires that students acknowledge other group members presence or participation.'},
  {name: 'Social Cues', description: 'Social cues and non-verbal communication are important to the task.'},
  {name: 'Simultaneity', description: 'The task requires to share multiple ideas without interruption from others.'},
  {name: 'Effortless Expression', description: 'It is important to generate a high amount of conversation.'},
  {name: 'Cognitive Control', description: 'The task requires working on visualization (e.g., game, diagram, graph) at the same time as having a discussion.'},
  {name: 'Information Processing', description: 'The task requires discussions to be focused on details.'},
  {name: 'Information Processing', description: 'The task requires discussions to be focused on the big picture and overview.'},
  {name: 'Reference ', description: 'The task requires to keep track of the idea development and previous discussion for later references. '},
]

const possible_answers = ['Not important','Desired','Very important']

const scores = [0,1,3]

buildQuestions()
